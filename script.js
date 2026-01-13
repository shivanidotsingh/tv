document.addEventListener('DOMContentLoaded', function () {
  // =========================
  // Required DOM
  // =========================
  const showsContainer = document.getElementById('shows-container');
  const regionFilter = document.getElementById('region-filter');
  const resetButton = document.getElementById('reset-filters');

  if (!showsContainer || !regionFilter || !resetButton) {
    console.error('Missing required DOM:', {
      showsContainer: !!showsContainer,
      regionFilter: !!regionFilter,
      resetButton: !!resetButton,
    });
    return;
  }

  // Optional DOM
  const searchInput = document.getElementById('search');
  const sortToggle = document.getElementById('sort-toggle'); // unchecked = chronological

  // Tag inputs (safe if missing)
  const tagInputs = {
    therapist: document.getElementById('therapist-filter'),
    gem: document.getElementById('gem-filter'),
    book: document.getElementById('book-filter'),
    supernatural: document.getElementById('supernatural-filter'),
    period: document.getElementById('period-filter'),
    scandi: document.getElementById('scandi-filter'),
    mini: document.getElementById('mini-filter'),
    animated: document.getElementById('animated-filter'),
    pwd: document.getElementById('pwd-filter'),
    essential: document.getElementById('essential-filter'),
    comedian: document.getElementById('comedian-filter'),
  };

  // Data check
  if (typeof tvShowsData === 'undefined') {
    console.error('tvShowsData is undefined. Ensure data.js loads before script.js.');
    showsContainer.innerHTML = '<div class="loading">Error: data.js did not load.</div>';
    return;
  }

  // =========================
  // Poster fetching: cache + throttle
  // =========================
  const posterCache = new Map(); // key: show.title -> url|null|Promise

  const MAX_CONCURRENT_POSTERS = 6;
  let activePosterFetches = 0;
  const posterQueue = [];

  function schedulePosterFetch(task) {
    return new Promise((resolve) => {
      posterQueue.push({ task, resolve });
      pumpPosterQueue();
    });
  }

  function pumpPosterQueue() {
    while (activePosterFetches < MAX_CONCURRENT_POSTERS && posterQueue.length) {
      const { task, resolve } = posterQueue.shift();
      activePosterFetches++;
      task()
        .then(resolve)
        .catch(() => resolve(null))
        .finally(() => {
          activePosterFetches--;
          pumpPosterQueue();
        });
    }
  }

  // =========================
  // TMDB + TVmaze (improved matching via TVmaze search + scoring)
  // =========================
  const TMDB_API_KEY = '2f31918e48b6998c0bb8439980c6aa7e';
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  let tmdbImageBaseUrl = null;
  const tmdbImageSize = 'w500';

  async function fetchTmdbConfigWithTimeout(ms = 2500) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), ms);
    try {
      const res = await fetch(`${TMDB_BASE_URL}/configuration?api_key=${TMDB_API_KEY}`, {
        signal: controller.signal,
      });
      const config = await res.json();
      tmdbImageBaseUrl = config?.images?.secure_base_url || null;
    } catch (e) {
      tmdbImageBaseUrl = null;
    } finally {
      clearTimeout(t);
    }
  }

  async function fetchTmdbPosterUrl(showTitle, showYear) {
    if (!tmdbImageBaseUrl) return null;

    let query = `${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
      showTitle
    )}`;

    const yearMatch = String(showYear || '').match(/^(\d{4})/);
    if (yearMatch?.[1]) query += `&first_air_date_year=${yearMatch[1]}`;

    try {
      const res = await fetch(query);
      if (!res.ok) return null;
      const data = await res.json();
      const first = data?.results?.[0];
      if (first?.poster_path) return tmdbImageBaseUrl + tmdbImageSize + first.poster_path;
      return null;
    } catch {
      return null;
    }
  }

  function getYearStart(y) {
    const m = String(y || '').match(/^(\d{4})/);
    return m ? parseInt(m[1], 10) : null;
  }

  function tvmazeCountryCode(item) {
    return (
      item?.show?.network?.country?.code ||
      item?.show?.webChannel?.country?.code ||
      null
    );
  }

  async function fetchTvmazePosterUrl(show) {
    // Use broader search results; pick best match based on title + year (+ slight region hint)
    const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(show.title)}`;

    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      const results = await res.json(); // [{score, show}, ...]

      if (!Array.isArray(results) || results.length === 0) return null;

      const targetTitle = String(show.title || '').trim().toLowerCase();
      const targetYear = getYearStart(show.year);
      const regionText = String(show.region || '').toLowerCase();

      const wantsIndia = regionText.includes('india');
      const wantsUK = regionText.includes('united kingdom') || regionText.includes('uk');

      const ranked = results
        .map((item) => {
          const candidate = item?.show;
          const name = String(candidate?.name || '').trim().toLowerCase();
          const premieredYear = getYearStart(candidate?.premiered);
          const cc = tvmazeCountryCode(item);

          let score = 0;

          // Strong signals
          if (name === targetTitle) score += 10;
          if (targetYear && premieredYear === targetYear) score += 8;

          // Light region hints (helps with ambiguous titles)
          if (wantsIndia && cc === 'IN') score += 3;
          if (wantsUK && cc === 'GB') score += 2;

          // Use TVmaze relevance too, but keep it weaker than the above
          score += (item?.score || 0);

          return { candidate, score };
        })
        .sort((a, b) => b.score - a.score);

      const best = ranked[0]?.candidate;
      return best?.image?.original || best?.image?.medium || null;
    } catch {
      return null;
    }
  }

  // TMDB -> TVmaze fallback with caching + throttling
  async function fetchPosterUrl(show) {
    const key = String(show.title || '').trim();
    if (!key) return null;

    if (posterCache.has(key)) {
      const cached = posterCache.get(key);
      if (cached && typeof cached.then === 'function') return await cached;
      return cached; // url or null
    }

    const inFlight = (async () => {
      const tmdb = await fetchTmdbPosterUrl(show.title, show.year);
      if (tmdb) return tmdb;

      const tvm = await fetchTvmazePosterUrl(show);
      return tvm || null;
    })();

    posterCache.set(key, inFlight);

    const result = await inFlight;
    posterCache.set(key, result);
    return result;
  }

  // =========================
  // Data prep
  // =========================
  const ALL_SHOWS = Object.entries(tvShowsData).flatMap(([region, shows]) =>
    (shows || []).map((show) => ({ ...show, region }))
  );

  // =========================
  // Sorting (toggle)
  // =========================
  function getSortBy() {
    if (!sortToggle) return 'year';
    return sortToggle.checked ? 'title' : 'year';
  }

  function setDefaultSort() {
    if (sortToggle) sortToggle.checked = false; // chronological ON by default
  }

  // =========================
  // UI functions
  // =========================
  function populateRegionFilter() {
    regionFilter.innerHTML = '<option value="all">All Regions</option>';
    Object.keys(tvShowsData).forEach((region) => {
      const option = document.createElement('option');
      option.value = region;
      option.textContent = region;
      regionFilter.appendChild(option);
    });
  }

  function resetFilters() {
    regionFilter.value = 'all';
    Object.values(tagInputs).forEach((input) => {
      if (input) input.checked = false;
    });
    if (searchInput) searchInput.value = '';
    setDefaultSort();
    renderShows();
  }

  function renderShows() {
    showsContainer.innerHTML = '<div class="loading">Previously on…</div>';

    const selectedRegion = regionFilter.value;
    const searchQuery = (searchInput?.value || '').toLowerCase().trim();
    const sortBy = getSortBy();

    const activeTags = Object.entries(tagInputs)
      .filter(([_, el]) => el && el.checked)
      .map(([tag]) => tag);

    let filtered = ALL_SHOWS;

    if (selectedRegion !== 'all') {
      filtered = filtered.filter((show) => show.region === selectedRegion);
    }

    if (activeTags.length > 0) {
      filtered = filtered.filter((show) => {
        const tags = show.tags || [];
        return activeTags.every((t) => tags.includes(t));
      });
    }

    if (searchQuery) {
      filtered = filtered.filter((show) =>
        (show.title || '').toLowerCase().includes(searchQuery)
      );
    }

    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'year') {
        const ay = getYearStart(a.year);
        const by = getYearStart(b.year);
        return (isNaN(by) ? -Infinity : by) - (isNaN(ay) ? -Infinity : ay);
      }
      return (a.title || '').localeCompare(b.title || '');
    });

    if (filtered.length === 0) {
      showsContainer.innerHTML =
        '<div class="loading">No shows found matching your filters.</div>';
      return;
    }

    const grid = document.createElement('div');
    grid.className = 'shows-grid';

    filtered.forEach((show) => grid.appendChild(createShowCard(show, show.region)));

    showsContainer.innerHTML = '';
    showsContainer.appendChild(grid);
  }

  function createShowCard(show, region) {
    const card = document.createElement('div');
    card.classList.add('show-card');

    const imgWrap = document.createElement('div');
    imgWrap.classList.add('show-image-container');
    imgWrap.innerHTML = '<div class="loading-poster">Loading poster...</div>';

    const info = document.createElement('div');
    info.classList.add('show-info');

    const title = document.createElement('h3');
    title.classList.add('show-title');
    title.textContent = show.title || '';
    info.appendChild(title);

    const year = document.createElement('p');
    year.classList.add('show-year');
    year.textContent = show.year || 'Year Unknown';
    info.appendChild(year);

    const reg = document.createElement('p');
    reg.classList.add('show-region');
    reg.textContent = region || 'Unknown Region';
    info.appendChild(reg);

    if (show.tags && show.tags.length > 0) {
      const tagsContainer = document.createElement('div');
      tagsContainer.classList.add('tags-container');

      show.tags.forEach((tag) => {
        const tagSpan = document.createElement('span');
        tagSpan.classList.add('tag', `tag-${tag}`);
        tagSpan.textContent = tag;
        tagsContainer.appendChild(tagSpan);
      });

      info.appendChild(tagsContainer);
    }

    card.appendChild(imgWrap);
    card.appendChild(info);

    schedulePosterFetch(() => fetchPosterUrl(show)).then((url) => {
      imgWrap.innerHTML = '';
      if (url) {
        const img = document.createElement('img');
        img.classList.add('show-image');
        img.alt = `${show.title} poster`;
        img.src = url;
        imgWrap.appendChild(img);
      } else {
        imgWrap.innerHTML = '<div class="poster-error">Poster not available</div>';
      }
    });

    return card;
  }

  // =========================
  // Listeners
  // =========================
  regionFilter.addEventListener('change', renderShows);
  resetButton.addEventListener('click', resetFilters);
  if (searchInput) searchInput.addEventListener('input', renderShows);
  if (sortToggle) sortToggle.addEventListener('change', renderShows);
  Object.values(tagInputs).forEach((input) => input && input.addEventListener('change', renderShows));

  // =========================
  // Boot (render immediately)
  // =========================
  setDefaultSort();
  populateRegionFilter();
  renderShows();
  fetchTmdbConfigWithTimeout(2500);
});

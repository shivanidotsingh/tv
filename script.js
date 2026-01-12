document.addEventListener('DOMContentLoaded', function () {
  // Required DOM
  const showsContainer = document.getElementById('shows-container');
  const regionFilter = document.getElementById('region-filter');
  const resetButton = document.getElementById('reset-filters');

  // Optional DOM (safe if moved/absent)
  const searchInput = document.getElementById('search');       // might be in content-controls now
  const sortToggle = document.getElementById('sort-toggle');   // toggle checkbox

  if (!showsContainer) {
    console.error('Missing #shows-container');
    return;
  }
  if (!regionFilter) {
    console.error('Missing #region-filter');
    showsContainer.innerHTML = '<div class="loading">Error: Region filter element not found.</div>';
    return;
  }
  if (!resetButton) {
    console.error('Missing #reset-filters');
    showsContainer.innerHTML = '<div class="loading">Error: Reset button element not found.</div>';
    return;
  }
  if (typeof tvShowsData === 'undefined') {
    console.error('tvShowsData is undefined. Ensure data.js loads before script.js.');
    showsContainer.innerHTML = '<div class="loading">Error: data.js did not load.</div>';
    return;
  }

  // Tag checkbox inputs (safe: only attach listeners if present)
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
  };

  // TMDB API
  const TMDB_API_KEY = '2f31918e48b6998c0bb8439980c6aa7e';
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  let tmdbImageBaseUrl = null;
  const tmdbImageSize = 'w500';

  // Flatten shows once; region = top-level key (your original logic)
  const ALL_SHOWS = Object.entries(tvShowsData).flatMap(([region, shows]) =>
    (shows || []).map((show) => ({ ...show, region }))
  );

  function getSortBy() {
    // unchecked = chronological
    if (!sortToggle) return 'year';
    return sortToggle.checked ? 'title' : 'year';
  }

  function setDefaultSort() {
    // Chronological ON by default
    if (sortToggle) sortToggle.checked = false;
  }

  async function fetchTmdbConfig() {
    try {
      const res = await fetch(`${TMDB_BASE_URL}/configuration?api_key=${TMDB_API_KEY}`);
      const config = await res.json();
      tmdbImageBaseUrl = config?.images?.secure_base_url || null;
    } catch (e) {
      console.warn('TMDB config failed (posters may be missing).', e);
      tmdbImageBaseUrl = null;
    }
  }

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
    showsContainer.innerHTML = '<div class="loading">Loading shows...</div>';

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
        const ay = parseInt((a.year || '').slice(0, 4), 10);
        const by = parseInt((b.year || '').slice(0, 4), 10);
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

async function fetchPosterUrl(showTitle, showYear) {
  // ---- 1) Try TMDB first ----
  const tmdbUrl = await fetchTmdbPosterUrl(showTitle, showYear);
  if (tmdbUrl) return tmdbUrl;

  // ---- 2) Fallback to TVmaze ----
  return await fetchTvmazePosterUrl(showTitle);
}

async function fetchTvmazePosterUrl(showTitle) {
  const url = `https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(showTitle)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return data?.image?.original || data?.image?.medium || null;
  } catch (e) {
    console.warn('TVmaze poster fetch failed:', showTitle, e);
    return null;
  }
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

    fetchPosterUrl(show.title, show.year).then((posterUrl) => {
  showImageContainer.innerHTML = '';
  if (posterUrl) {
    const img = document.createElement('img');
    img.classList.add('show-image');
    img.alt = `${show.title} poster`;
    img.src = posterUrl;
    showImageContainer.appendChild(img);
  } else {
    showImageContainer.innerHTML = '<div class="poster-error">Poster not available</div>';
  }
});


    return card;
  }

  // Wire listeners (safe)
  regionFilter.addEventListener('change', renderShows);
  resetButton.addEventListener('click', resetFilters);
  if (searchInput) searchInput.addEventListener('input', renderShows);
  if (sortToggle) sortToggle.addEventListener('change', renderShows);
  Object.values(tagInputs).forEach((input) => input && input.addEventListener('change', renderShows));

  // Boot
  setDefaultSort();
  populateRegionFilter();
  fetchTmdbConfig().finally(renderShows);
});

document.addEventListener('DOMContentLoaded', function () {
  // DOM elements
  const showsContainer = document.getElementById('shows-container');
  const regionFilter = document.getElementById('region-filter');
  const searchInput = document.getElementById('search');
  const resetButton = document.getElementById('reset-filters');

  // Sort toggle: unchecked = chronological (year), checked = alphabetical (title)
  const sortToggle = document.getElementById('sort-toggle');

  // Tag checkbox inputs (keep your HTML ids)
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

  // TMDB API Configuration
  const TMDB_API_KEY = '2f31918e48b6998c0bb8439980c6aa7e';
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  let tmdbImageBaseUrl = null;
  let tmdbImageSize = 'w500';

  // Flatten shows once; keep region from tvShowsData keys (this is your "original logic", but fast)
  const ALL_SHOWS = Object.entries(tvShowsData).flatMap(([region, shows]) =>
    (shows || []).map((show) => ({ ...show, region }))
  );

  function getSortBy() {
    // default chronological if toggle missing
    if (!sortToggle) return 'year';
    return sortToggle.checked ? 'title' : 'year';
  }

  function setDefaultSort() {
    // Chronological ON by default
    if (sortToggle) sortToggle.checked = false;
  }

  async function fetchTmdbConfig() {
    try {
      const response = await fetch(`${TMDB_BASE_URL}/configuration?api_key=${TMDB_API_KEY}`);
      const config = await response.json();
      tmdbImageBaseUrl = config?.images?.secure_base_url || null;
    } catch (error) {
      console.error('Error fetching TMDB configuration:', error);
      tmdbImageBaseUrl = null;
    }
  }

  // Init
  setDefaultSort();

  fetchTmdbConfig().then(() => {
    populateRegionFilter();
    renderShows();
  });

  // Event listeners
  regionFilter.addEventListener('change', renderShows);
  searchInput.addEventListener('input', renderShows);
  resetButton.addEventListener('click', resetFilters);

  if (sortToggle) sortToggle.addEventListener('change', renderShows);

  Object.values(tagInputs).forEach((input) => {
    if (input) input.addEventListener('change', renderShows);
  });

  function populateRegionFilter() {
    // ✅ This is the original behavior you want:
    // region options = Object.keys(tvShowsData), i.e. "America — East", "Europe", etc.
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

    searchInput.value = '';

    // Reset sort to chronological ON
    setDefaultSort();

    renderShows();
  }

  function renderShows() {
    showsContainer.innerHTML = '<div class="loading">Loading shows...</div>';

    const selectedRegion = regionFilter.value;
    const searchQuery = searchInput.value.toLowerCase().trim();
    const sortBy = getSortBy();

    const activeTags = Object.entries(tagInputs)
      .filter(([_, el]) => el && el.checked)
      .map(([tag]) => tag);

    let filtered = ALL_SHOWS;

    // Region filter (exact match against region key)
    if (selectedRegion !== 'all') {
      filtered = filtered.filter((show) => show.region === selectedRegion);
    }

    // Tags (AND logic)
    if (activeTags.length > 0) {
      filtered = filtered.filter((show) => {
        const tags = show.tags || [];
        return activeTags.every((t) => tags.includes(t));
      });
    }

    // Search
    if (searchQuery) {
      filtered = filtered.filter((show) =>
        (show.title || '').toLowerCase().includes(searchQuery)
      );
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'year') {
        const ay = parseInt((a.year || '').slice(0, 4), 10);
        const by = parseInt((b.year || '').slice(0, 4), 10);
        return (isNaN(by) ? -Infinity : by) - (isNaN(ay) ? -Infinity : ay);
      }
      // title
      return (a.title || '').localeCompare(b.title || '');
    });

    if (filtered.length === 0) {
      showsContainer.innerHTML =
        '<div class="loading">No shows found matching your filters.</div>';
      return;
    }

    const showsGrid = document.createElement('div');
    showsGrid.className = 'shows-grid';

    filtered.forEach((show) => {
      showsGrid.appendChild(createShowCard(show, show.region));
    });

    showsContainer.innerHTML = '';
    showsContainer.appendChild(showsGrid);
  }

  async function fetchTmdbPosterUrl(showTitle, showYear) {
    if (!tmdbImageBaseUrl) return null;

    let query = `${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
      showTitle
    )}`;

    if (showYear) {
      const yearMatch = String(showYear).match(/^(\d{4})/);
      if (yearMatch && yearMatch[1]) {
        query += `&first_air_date_year=${yearMatch[1]}`;
      }
    }

    try {
      const searchResponse = await fetch(query);
      const searchData = await searchResponse.json();
      const tmdbShow = searchData?.results?.[0];
      if (tmdbShow?.poster_path) {
        return tmdbImageBaseUrl + tmdbImageSize + tmdbShow.poster_path;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching TMDB poster for ${showTitle}:`, error);
      return null;
    }
  }

  function createShowCard(show, region) {
    const showCard = document.createElement('div');
    showCard.classList.add('show-card');

    const showImageContainer = document.createElement('div');
    showImageContainer.classList.add('show-image-container');
    showImageContainer.innerHTML = '<div class="loading-poster">Loading poster...</div>';

    const showInfo = document.createElement('div');
    showInfo.classList.add('show-info');

    const showTitle = document.createElement('h3');
    showTitle.classList.add('show-title');
    showTitle.textContent = show.title;
    showInfo.appendChild(showTitle);

    const showYear = document.createElement('p');
    showYear.classList.add('show-year');
    showYear.textContent = show.year || 'Year Unknown';
    showInfo.appendChild(showYear);

    const showRegion = document.createElement('p');
    showRegion.classList.add('show-region');
    showRegion.textContent = region || 'Unknown Region';
    showInfo.appendChild(showRegion);

    if (show.tags && show.tags.length > 0) {
      const tagsContainer = document.createElement('div');
      tagsContainer.classList.add('tags-container');

      show.tags.forEach((tag) => {
        const tagSpan = document.createElement('span');
        tagSpan.classList.add('tag', `tag-${tag}`);
        tagSpan.textContent = tag;
        tagsContainer.appendChild(tagSpan);
      });

      showInfo.appendChild(tagsContainer);
    }

    showCard.appendChild(showImageContainer);
    showCard.appendChild(showInfo);

    fetchTmdbPosterUrl(show.title, show.year).then((tmdbPosterUrl) => {
      showImageContainer.innerHTML = '';
      if (tmdbPosterUrl) {
        const img = document.createElement('img');
        img.classList.add('show-image');
        img.alt = `${show.title} poster`;
        img.src = tmdbPosterUrl;
        showImageContainer.appendChild(img);
      } else {
        showImageContainer.innerHTML = '<div class="poster-error">Poster not available</div>';
      }
    });

    return showCard;
  }
});

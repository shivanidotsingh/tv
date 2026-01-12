document.addEventListener('DOMContentLoaded', function () {
  // DOM elements
  const showsContainer = document.getElementById('shows-container');
  const regionFilter = document.getElementById('region-filter');
  const searchInput = document.getElementById('search');
  const resetButton = document.getElementById('reset-filters');

  // Hidden select still exists (used by renderShows)
  const sortSelect = document.getElementById('sort-select');

  // NEW: toggle switch checkbox (unchecked = chronological)
  const sortToggle = document.getElementById('sort-toggle');

  // Tag checkbox inputs (by id; keep your HTML ids the same)
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

  // Precompute shows with region baked in
  const ALL_SHOWS = Object.entries(tvShowsData).flatMap(([region, shows]) =>
    (shows || []).map((show) => ({ ...show, region }))
  );

  // Sync sort toggle -> select
  function syncSortFromToggle() {
    // unchecked = chronological (year), checked = alphabetical (title)
    sortSelect.value = sortToggle && sortToggle.checked ? 'title' : 'year';
    renderShows();
  }

  // Ensure default = chronological ON
  function setDefaultSort() {
    if (sortToggle) sortToggle.checked = false; // chronological
    sortSelect.value = 'year';
  }

  // Fetch TMDB configuration for image base URL
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

  // Toggle listener (this replaces the sort dropdown UI)
  if (sortToggle) sortToggle.addEventListener('change', syncSortFromToggle);

  // If anything else changes sortSelect (rare), keep toggle synced too
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      if (!sortToggle) return;
      sortToggle.checked = sortSelect.value === 'title';
      renderShows();
    });
  }

  // One listener for all tag checkboxes
  Object.values(tagInputs).forEach((input) => {
    if (input) input.addEventListener('change', renderShows);
  });

  function populateRegionFilter() {
    const existing = new Set(Array.from(regionFilter.options).map((o) => o.value));
    Object.keys(tvShowsData).forEach((region) => {
      if (existing.has(region)) return;
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
    const sortBy = sortSelect.value; // 'year' or 'title'

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
      if (sortBy === 'title') {
        return (a.title || '').localeCompare(b.title || '');
      }
      return 0;
    });

    if (filtered.length === 0) {
      showsContainer.innerHTML =
        '<div class="loading">No shows found matching your filters.</div>';
      return;
    }

    const showsGrid = document.createElement('div');
    showsGrid.className = 'shows-grid';

    filtered.forEach((show) => {
      const showCard = createShowCard(show, show.region);
      showsGrid.appendChild(showCard);
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
      if (tmdbShow?.p

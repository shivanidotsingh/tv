document.addEventListener('DOMContentLoaded', function () {
  // DOM elements
  const showsContainer = document.getElementById('shows-container');
  const regionFilter = document.getElementById('region-filter');
  const searchInput = document.getElementById('search');
  const resetButton = document.getElementById('reset-filters');
  const sortSelect = document.getElementById('sort-select');

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

  // Precompute shows with region baked in (fast + no title-matching hacks)
  const ALL_SHOWS = Object.entries(tvShowsData).flatMap(([region, shows]) =>
    (shows || []).map((show) => ({ ...show, region }))
  );

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
  fetchTmdbConfig().then(() => {
    populateRegionFilter();
    renderShows();
  });

  // Event listeners
  regionFilter.addEventListener('change', renderShows);
  sortSelect.addEventListener('change', renderShows);
  searchInput.addEventListener('input', renderShows);
  resetButton.addEventListener('click', resetFilters);

  // One listener for all tag checkboxes
  Object.values(tagInputs).forEach((input) => {
    if (input) input.addEventListener('change', renderShows);
  });

  function populateRegionFilter() {
    // Clear existing (keep "all")
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
    sortSelect.value = 'year';
    renderShows();
  }

  function renderShows() {
    showsContainer.innerHTML = '<div class="loading">Loading shows...</div>';

    const selectedRegion = regionFilter.value;
    const searchQuery = searchInput.value.toLowerCase().trim();
    const sortBy = sortSelect.value;

    // Active tag filters = only the checked ones
    const activeTags = Object.entries(tagInputs)
      .filter(([_, el]) => el && el.checked)
      .map(([tag]) => tag);

    let filtered = ALL_SHOWS;

    // Region
    if (selectedRegion !== 'all') {
      filtered = filtered.filter((show) => show.region === selectedRegion);
    }

    // Tags (AND logic: show must include all selected tags)
    if (activeTags.length > 0) {
      filtered = filtered.filter((show) => {
        const tags = show.tags || [];
        return activeTags.every((t) => tags.includes(t));
      });
    }

    // Search (title)
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
      if (sortBy === 'title') {
        return (a.title || '').localeCompare(b.title || '');
      }
      return 0;
    });

    if (filtered.length === 0) {
      showsContainer.innerHTML = '<div class="loading">No shows found matching your filters.</div>';
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

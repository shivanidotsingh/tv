document.addEventListener('DOMContentLoaded', function () {
    const showsContainer = document.getElementById('shows-container');
    const regionFilter = document.getElementById('region-filter');
    const therapistFilter = document.getElementById('therapist-filter');
    const gemFilter = document.getElementById('gem-filter');
    const bookFilter = document.getElementById('book-filter');
    const supernaturalFilter = document.getElementById('supernatural-filter');
    const periodFilter = document.getElementById('period-filter');
    const scandiFilter = document.getElementById('scandi-filter');
    const miniFilter = document.getElementById('mini-filter');
    const animatedFilter = document.getElementById('animated-filter');
    const pwdFilter = document.getElementById('pwd-filter');
    const searchInput = document.getElementById('search');
    const resetButton = document.getElementById('reset-filters');
    const sortSelect = document.getElementById('sort-select');

    const TMDB_API_KEY = '2f31918e48b6998c0bb8439980c6aa7e';
    const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
    let tmdbImageBaseUrl = null;
    let tmdbImageSize = 'w500';

    async function fetchTmdbConfig() {
        try {
            const response = await fetch(`${TMDB_BASE_URL}/configuration?api_key=${TMDB_API_KEY}`);
            const config = await response.json();
            tmdbImageBaseUrl = config.images.secure_base_url;
        } catch (error) {
            console.error('Error fetching TMDB configuration:', error);
        }
    }

    fetchTmdbConfig();
    populateRegionFilter();
    renderShows();

    regionFilter.addEventListener('change', renderShows);
    therapistFilter.addEventListener('change', renderShows);
    gemFilter.addEventListener('change', renderShows);
    bookFilter.addEventListener('change', renderShows);
    supernaturalFilter.addEventListener('change', renderShows);
    periodFilter.addEventListener('change', renderShows);
    scandiFilter.addEventListener('change', renderShows);
    miniFilter.addEventListener('change', renderShows);
    animatedFilter.addEventListener('change', renderShows);
    pwdFilter.addEventListener('change', renderShows);
    searchInput.addEventListener('input', renderShows);
    resetButton.addEventListener('click', resetFilters);
    sortSelect.addEventListener('change', renderShows);

    function populateRegionFilter() {
        const regions = Object.keys(tvShowsData);
        regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            regionFilter.appendChild(option);
        });
    }

    function resetFilters() {
        regionFilter.value = 'all';
        therapistFilter.checked = false;
        gemFilter.checked = false;
        bookFilter.checked = false;
        supernaturalFilter.checked = false;
        periodFilter.checked = false;
        scandiFilter.checked = false;
        miniFilter.checked = false;
        animatedFilter.checked = false;
        pwdFilter.checked = false;
        searchInput.value = '';
        sortSelect.value = 'year';
        renderShows();
    }

    function renderShows() {
        const selectedRegion = regionFilter.value;
        const hasTherapist = therapistFilter.checked;
        const isGem = gemFilter.checked;
        const isBook = bookFilter.checked;
        const isSupernatural = supernaturalFilter.checked;
        const isPeriod = periodFilter.checked;
        const isScandi = scandiFilter.checked;
        const isMini = miniFilter.checked;
        const isAnimated = animatedFilter.checked;
        const isPwd = pwdFilter.checked;
        const searchQuery = searchInput.value.toLowerCase().trim();
        const sortBy = sortSelect.value;

        showsContainer.innerHTML = '';

        const showsGrid = document.createElement('div');
        showsGrid.className = 'shows-grid';
        showsContainer.appendChild(showsGrid);

        let filteredShows = selectedRegion === 'all'
            ? Object.values(tvShowsData).flat()
            : tvShowsData[selectedRegion] || [];

        filteredShows = filteredShows.filter(show => {
            let showActualRegion = null;
            for (const region in tvShowsData) {
                if (tvShowsData[region].some(s => s.title === show.title)) {
                    showActualRegion = region;
                    break;
                }
            }
            const matchesRegion = selectedRegion === 'all' || selectedRegion === showActualRegion;
            const matchesTags = (!hasTherapist || show.tags?.includes('therapist')) &&
                                (!isGem || show.tags?.includes('gem')) &&
                                (!isBook || show.tags?.includes('book')) &&
                                (!isSupernatural || show.tags?.includes('supernatural')) &&
                                (!isPeriod || show.tags?.includes('period')) &&
                                (!isScandi || show.tags?.includes('scandi')) &&
                                (!isMini || show.tags?.includes('mini')) &&
                                (!isAnimated || show.tags?.includes('animated')) &&
                                (!isPwd || show.tags?.includes('pwd'));
            const matchesSearch = !searchQuery || show.title.toLowerCase().includes(searchQuery);
            return matchesRegion && matchesTags && matchesSearch;
        });

        function getStartYear(yearString) {
            if (!yearString) return -Infinity;
            const match = yearString.match(/^(\d{4})/);
            return match ? parseInt(match[1]) : -Infinity;
        }

        if (sortBy === 'year') {
            filteredShows.sort((a, b) => getStartYear(b.year) - getStartYear(a.year));
        } else if (sortBy === 'title') {
            filteredShows.sort((a, b) => a.title.localeCompare(b.title));
        }

        filteredShows.forEach(show => {
            createShowCard(show).then(showCard => {
                showsGrid.appendChild(showCard);
            });
        });

        if (filteredShows.length === 0) {
            showsContainer.innerHTML = 'No shows found matching your filters.';
        }
    }

    async function fetchTmdbPosterUrl(showTitle, showYear) {
        if (!tmdbImageBaseUrl) return null;
        let searchQuery = `${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(showTitle)}`;
        if (showYear) {
            const yearMatch = showYear.match(/^(\d{4})/);
            if (yearMatch) {
                searchQuery += `&first_air_date_year=${yearMatch[1]}`;
            }
        }
        try {
            const response = await fetch(searchQuery);
            const data = await response.json();
            if (data.results?.[0]?.poster_path) {
                return tmdbImageBaseUrl + tmdbImageSize + data.results[0].poster_path;
            }
            return null;
        } catch (error) {
            console.error(`Error fetching TMDB poster for ${showTitle}:`, error);
            return null;
        }
    }

    async function createShowCard(show) {
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
        showRegion.textContent = findRegion(show.title) || 'Unknown Region';
        showInfo.appendChild(showRegion);

        if (show.tags?.length) {
            const tagsContainer = document.createElement('div');
            tagsContainer.classList.add('tags-container');
            show.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.classList.add('tag', `tag-${tag}`);
                tagSpan.textContent = tag;
                tagsContainer.appendChild(tagSpan);
            });
            showInfo.appendChild(tagsContainer);
        }

        showCard.appendChild(showInfo);
        showCard.insertBefore(showImageContainer, showInfo);

        const posterUrl = await fetchTmdbPosterUrl(show.title, show.year);

        if (posterUrl) {
            const img = document.createElement('img');
            img.classList.add('show-image');
            img.src = posterUrl;
            img.alt = `${show.title} poster`;
            img.loading = "lazy"; // ← lazy load images
            img.onerror = () => {
                showImageContainer.innerHTML = `<div class="poster-error">Poster not available</div>`;
            };
            showImageContainer.innerHTML = '';
            showImageContainer.appendChild(img);
        } else {
            showImageContainer.innerHTML = `<div class="poster-error">Poster not available</div>`;
        }

        return showCard;
    }

    function findRegion(title) {
        for (const region in tvShowsData) {
            if (tvShowsData[region].some(show => show.title === title)) {
                return region;
            }
        }
        return null;
    }
});

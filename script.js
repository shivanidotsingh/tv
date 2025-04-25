document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const showsContainer = document.getElementById('shows-container');
    const regionFilter = document.getElementById('region-filter');
    const therapistFilter = document.getElementById('therapist-filter');
    const gemFilter = document.getElementById('gem-filter');
    const bookFilter = document.getElementById('book-filter');
    const supernaturalFilter = document.getElementById('supernatural-filter');
    const periodFilter = document.getElementById('period-filter');
    const scandiFilter = document.getElementById('scandi-filter');
    const searchInput = document.getElementById('search');
    const resetButton = document.getElementById('reset-filters');
    const sortSelect = document.getElementById('sort-select');
    
    // Populate region filter first
    populateRegionFilter();
    
    // Then initial render
    renderShows();

    // Event listeners
    regionFilter.addEventListener('change', renderShows);
    therapistFilter.addEventListener('change', renderShows);
    gemFilter.addEventListener('change', renderShows);
    bookFilter.addEventListener('change', renderShows);
    supernaturalFilter.addEventListener('change', renderShows);
    periodFilter.addEventListener('change', renderShows);
    scandiFilter.addEventListener('change', renderShows);
    searchInput.addEventListener('input', renderShows);
    resetButton.addEventListener('click', resetFilters);
    sortSelect.addEventListener('change', renderShows);

    // Functions
    function populateRegionFilter() {
        console.log("populateRegionFilter() called");
        const regions = Object.keys(tvShowsData);
        regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            regionFilter.appendChild(option);
        });
        console.log("populateRegionFilter() finished");
    }

    function resetFilters() {
        console.log("resetFilters() called");
        regionFilter.value = 'all';
        therapistFilter.checked = false;
        gemFilter.checked = false;
        bookFilter.checked = false;
        supernaturalFilter.checked = false;
        periodFilter.checked = false;
        scandiFilter.checked = false;
        searchInput.value = '';
        sortSelect.value = 'year';
        renderShows();
        console.log("resetFilters() finished");
    }

    function renderShows() {
        console.log("renderShows() called");
        const selectedRegion = regionFilter.value;
        const hasTherapist = therapistFilter.checked;
        const isGem = gemFilter.checked;
        const isBook = bookFilter.checked;
        const isSupernatural = supernaturalFilter.checked;
        const isPeriod = periodFilter.checked;
        const isScandi = scandiFilter.checked;
        const searchQuery = searchInput.value.toLowerCase().trim();
        const sortBy = sortSelect.value;

        showsContainer.innerHTML = '<div class="loading">Loading shows...</div>';

        setTimeout(() => {
            showsContainer.innerHTML = '';

            // Create filtered shows array with region information
            let filteredShows = [];
            if (selectedRegion === 'all') {
                for (const region in tvShowsData) {
                    tvShowsData[region].forEach(show => {
                        filteredShows.push({ ...show, region });
                    });
                }
            } else if (tvShowsData[selectedRegion]) {
                tvShowsData[selectedRegion].forEach(show => {
                    filteredShows.push({ ...show, region: selectedRegion });
                });
            }

            // Apply search filter
            if (searchQuery) {
                filteredShows = filteredShows.filter(show => 
                    show.title.toLowerCase().includes(searchQuery)
                );
            }

            // Apply tag filters - only apply if any tags are selected
            const anyTagSelected = hasTherapist || isGem || isBook || isSupernatural || isPeriod || isScandi;
            if (anyTagSelected) {
                filteredShows = filteredShows.filter(show => {
                    const tags = show.tags || [];
                    return (hasTherapist && tags.includes('therapist')) ||
                           (isGem && tags.includes('gem')) ||
                           (isBook && tags.includes('book')) ||
                           (isSupernatural && tags.includes('supernatural')) ||
                           (isPeriod && tags.includes('period')) ||
                           (isScandi && tags.includes('scandi'));
                });
            }

            // Function to extract the starting year for sorting
            function getStartYear(yearString) {
                if (!yearString) return -Infinity; // Handle missing year data
                const match = yearString.match(/^(\d{4})/);
                return match ? parseInt(match[1]) : -Infinity;
            }

            // Sort the filtered shows
            if (sortBy === 'year') {
                filteredShows.sort((a, b) => getStartYear(b.year) - getStartYear(a.year));
            } else if (sortBy === 'title') {
                filteredShows.sort((a, b) => a.title.localeCompare(b.title));
            }

            console.log("filteredShows count:", filteredShows.length);

            if (filteredShows.length > 0) {
                const showsGrid = document.createElement('div');
                showsGrid.className = 'shows-grid';
                filteredShows.forEach(show => {
                    const showCard = createShowCard(show);
                    showsGrid.appendChild(showCard);
                });
                showsContainer.appendChild(showsGrid);
            } else {
                showsContainer.innerHTML = '<div class="loading">No shows found matching your filters.</div>';
            }
            console.log("renderShows() finished");
        }, 100);
    }

    function createShowCard(show) {
        console.log("Creating card for:", show.title);
        const showCard = document.createElement('div');
        showCard.classList.add('show-card');

        const showImageContainer = document.createElement('div');
        showImageContainer.classList.add('show-image-container');

        // Handle poster image or show placeholder with title
        if (show.poster_path) {
            const img = document.createElement('img');
            img.classList.add('show-image');
            img.src = `https://image.tmdb.org/t/p/w500/${show.poster_path}`;
            img.alt = show.title;
            img.onerror = () => {
                showImageContainer.innerHTML = `<div class="poster-error">${show.title}</div>`;
            };
            showImageContainer.appendChild(img);
        } else {
            showImageContainer.innerHTML = `<div class="poster-error">${show.title}</div>`;
        }

        showCard.appendChild(showImageContainer);

        const showInfo = document.createElement('div');
        showInfo.classList.add('show-info');

        const showTitle = document.createElement('h3');
        showTitle.classList.add('show-title');
        showTitle.textContent = show.title;
        if (show.tags && show.tags.includes('book')) {
            showTitle.classList.add('book-based');
        }
        showInfo.appendChild(showTitle);

        // Add year info if available
        if (show.year) {
            const showYear = document.createElement('p');
            showYear.classList.add('show-year');
            showYear.textContent = show.year;
            showInfo.appendChild(showYear);
        }

        // Add region info
        const showRegion = document.createElement('p');
        showRegion.classList.add('show-region');
        showRegion.textContent = show.region || 'Unknown Region';
        showInfo.appendChild(showRegion);

        // Add tags if available
        if (show.tags && show.tags.length > 0) {
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
        return showCard;
    }
});

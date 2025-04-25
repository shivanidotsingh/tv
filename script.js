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

    // Populate region filter
    populateRegionFilter();

    // Initial render
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

    // Functions
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
        searchInput.value = '';
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
        const searchQuery = searchInput.value.toLowerCase().trim();

        showsContainer.innerHTML = '<div class="loading">Loading shows...</div>';

        setTimeout(() => {
            showsContainer.innerHTML = '';
            let filteredShows = tvShowsData[selectedRegion] || Object.values(tvShowsData).flat();

            filteredShows = filteredShows.filter(show => {
                const matchesRegion = !selectedRegion || (tvShowsData[selectedRegion] && tvShowsData[selectedRegion].includes(show));
                const matchesTags = [
                    hasTherapist && show.tags.includes('therapist'),
                    isGem && show.tags.includes('gem'),
                    isBook && show.tags.includes('book'),
                    isSupernatural && show.tags.includes('supernatural'),
                    isPeriod && show.tags.includes('period'),
                    isScandi && show.tags.includes('scandi')
                ].every(Boolean);  // Check that ALL conditions in the array are true
                const matchesSearch = !searchQuery || show.title.toLowerCase().includes(searchQuery);
                return matchesRegion && matchesTags && matchesSearch;
            });

            // Function to extract the starting year for sorting
            function getStartYear(yearString) {
                const match = yearString.match(/^(\d{4})/);
                return match ? parseInt(match[1]) : -Infinity;
            }

            // Sort the filtered shows chronologically (descending)
            filteredShows.sort((a, b) => getStartYear(b.year) - getStartYear(a.year));

            if (filteredShows.length > 0) {
                const showsGrid = document.createElement('div');
                showsGrid.className = 'shows-grid';
                filteredShows.forEach(show => {
                    // Removed the extra fetch here
                    showsGrid.appendChild(createShowCard(show, selectedRegion));
                });
                showsContainer.appendChild(showsGrid);
            } else {
                const noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.textContent = 'No shows found matching your filters.';
                showsContainer.appendChild(noResults);
            }
        }, 100);
    }

    function createShowCard(show, region) { // Added region parameter
        const showCard = document.createElement('div');
        showCard.classList.add('show-card');

        const showImageContainer = document.createElement('div');
        showImageContainer.classList.add('show-image-container');

        const img = document.createElement('img');
        img.classList.add('show-image');
        img.src = `https://image.tmdb.org/t/p/w500/${show.poster_path}`;
        img.alt = show.title;
        img.onerror = () => {
            showImageContainer.innerHTML = `<div class="poster-error">${show.title}</div>`;
        };

        showImageContainer.appendChild(img);
        showCard.appendChild(showImageContainer);

        const showInfo = document.createElement('div');
        showInfo.classList.add('show-info');

        const showTitle = document.createElement('h3');
        showTitle.classList.add('show-title');
        showTitle.textContent = show.title;
        if (show.tags.includes('book')) {
            showTitle.classList.add('book-based');
        }
        showInfo.appendChild(showTitle);

        // Add the year display here
        const showYear = document.createElement('p');
        showYear.classList.add('show-year');
        showYear.textContent = show.year;
        showInfo.appendChild(showYear);

        const showRegion = document.createElement('p');
        showRegion.classList.add('show-region');
        showRegion.textContent = region; // Use the region parameter
        showInfo.appendChild(showRegion);

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
    
    // Utility function to generate colors based on string input
    function stringToColor(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        // Generate hue between 0 and 360
        const hue = hash % 360;
        
        // Use HSL to ensure good contrast with white text
        return `hsl(${hue}, 70%, 40%)`;
    }
});

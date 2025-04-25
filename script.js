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

    showsContainer.innerHTML = '<div class="loading">Loading shows...</div>'; // Initial loading message

    setTimeout(() => {
        showsContainer.innerHTML = ''; // Clear the loading message *before* rendering

        let filteredShows = selectedRegion && selectedRegion !== 'all' ? tvShowsData[selectedRegion] : Object.values(tvShowsData).flat();

        filteredShows = filteredShows.filter(show => {
            const matchesRegion = selectedRegion === 'all' || (tvShowsData[selectedRegion] && tvShowsData[selectedRegion].includes(show));
            const matchesTags = [
                hasTherapist && show.tags.includes('therapist'),
                isGem && show.tags.includes('gem'),
                isBook && show.tags.includes('book'),
                isSupernatural && show.tags.includes('supernatural'),
                isPeriod && show.tags.includes('period'),
                isScandi && show.tags.includes('scandi')
            ].every(Boolean);
            const matchesSearch = !searchQuery || show.title.toLowerCase().includes(searchQuery);
            return matchesRegion && matchesTags && matchesSearch;
        });

        // Function to extract the starting year for sorting
        function getStartYear(yearString) {
            const match = yearString.match(/^(\d{4})/);
            return match ? parseInt(match[1]) : -Infinity;
        }

        // Sort the filtered shows
        if (sortBy === 'year') {
            filteredShows.sort((a, b) => getStartYear(b.year) - getStartYear(a.year));
        } else if (sortBy === 'title') {
            filteredShows.sort((a, b) => a.title.localeCompare(b.title));
        }

        console.log("filteredShows:", filteredShows);

        if (filteredShows.length > 0) {
            const showsGrid = document.createElement('div');
            showsGrid.className = 'shows-grid';
            filteredShows.forEach(show => {
                const showCard = createShowCard(show, selectedRegion);
                showsGrid.appendChild(showCard);
            });
            showsContainer.appendChild(showsGrid);
        } else {
            showsContainer.innerHTML = 'No shows found matching your filters.'; // *Now* it's inside the setTimeout
        }
        console.log("renderShows() finished");
    }, 100);
}


    function createShowCard(show, region) {
        console.log("createShowCard() called with show:", show, "and region:", region);
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
        showRegion.textContent = region;
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
        console.log("createShowCard() returning:", showCard);
        return showCard;
    }
});

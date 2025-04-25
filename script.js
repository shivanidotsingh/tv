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
        
        // Clear container
        showsContainer.innerHTML = '';
        
        // Get filtered shows
        let filteredShows = [];
        
        if (selectedRegion === 'all') {
            // Get all shows from all regions
            Object.keys(tvShowsData).forEach(region => {
                filteredShows = [...filteredShows, ...tvShowsData[region].map(show => ({
                    ...show,
                    region: region
                }))];
            });
        } else {
            // Get shows from selected region
            filteredShows = tvShowsData[selectedRegion].map(show => ({
                ...show,
                region: selectedRegion
            }));
        }
        
        // Apply tag filters
        if (hasTherapist) {
            filteredShows = filteredShows.filter(show => 
                show.tags.includes('therapist'));
        }
        
        if (isGem) {
            filteredShows = filteredShows.filter(show => 
                show.tags.includes('gem'));
        }
        
        if (isBook) {
            filteredShows = filteredShows.filter(show => 
                show.tags.includes('book'));
        }

         if (isSupernatural) {
            filteredShows = filteredShows.filter(show => 
                show.tags.includes('supernatural'));
        }

        if (isPeriod) {
            filteredShows = filteredShows.filter(show => 
                show.tags.includes('period'));
        }

        if (isScandi) {
            filteredShows = filteredShows.filter(show => 
                show.tags.includes('scandi'));
        }
        
        // Apply search filter
        if (searchQuery) {
            filteredShows = filteredShows.filter(show => 
                show.title.toLowerCase().includes(searchQuery));
        }
        
        // Display filtered shows
        if (filteredShows.length > 0) {
            const showsGrid = document.createElement('div');
            showsGrid.className = 'shows-grid';
            
            filteredShows.forEach(show => {
                const showCard = createShowCard(show);
                showsGrid.appendChild(showCard);
            });
            
            showsContainer.appendChild(showsGrid);
        } else {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No shows found matching your filters.';
            showsContainer.appendChild(noResults);
        }
    }
    
   function createShowCard(show, region) {
    const showCard = document.createElement('div');
    showCard.classList.add('show-card');

    const showImageContainer = document.createElement('div');
    showImageContainer.classList.add('show-image-container');

    const img = document.createElement('img');
    img.classList.add('show-image');
    img.src = `https://image.tmdb.org/t/p/w500/${show.poster_path}`; // Assuming you fetched poster_path
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

    // --- ADDED THIS SECTION ---
    const showYear = document.createElement('p');
    showYear.classList.add('show-year');
    showYear.textContent = show.year;
    showInfo.appendChild(showYear);
    // --- END ADDED SECTION ---

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

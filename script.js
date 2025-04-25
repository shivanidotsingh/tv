document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const showsContainer = document.getElementById('shows-container');
    const regionFilter = document.getElementById('region-filter');
    const therapistFilter = document.getElementById('therapist-filter');
    const gemFilter = document.getElementById('gem-filter');
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
        searchInput.value = '';
        renderShows();
    }

    function renderShows() {
        const selectedRegion = regionFilter.value;
        const hasTherapist = therapistFilter.checked;
        const isGem = gemFilter.checked;
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
    
    function createShowCard(show) {
        const card = document.createElement('div');
        card.className = 'show-card';
        
        // Get poster URL (using a placeholder service)
        const posterUrl = getPosterUrl(show.title);
        
        card.innerHTML = `
            <img class="show-image" src="${posterUrl}" alt="${show.title} Poster">
            <div class="show-info">
                <h3 class="show-title">${show.title}</h3>
                <div class="show-region">${show.region}</div>
                <div class="show-tags">
                    ${show.tags.includes('therapist') ? '<span class="tag tag-therapist">Therapist 💊</span>' : ''}
                    ${show.tags.includes('gem') ? '<span class="tag tag-gem">Hidden Gem 💎</span>' : ''}
                </div>
            </div>
        `;
        
        return card;
    }
    
    function getPosterUrl(title) {
        // In a real implementation, you would have a database of poster URLs
        // For now, we'll use a placeholder image service and encode the title
        const encodedTitle = encodeURIComponent(title);
        
        // Use a placeholder image with the show name
        return `https://via.placeholder.com/300x450/2575fc/ffffff?text=${encodedTitle}`;
        
        // In a real implementation, you might use a TV show API like:
        // return `https://api.themoviedb.org/3/search/tv?api_key=YOUR_API_KEY&query=${encodedTitle}`;
    }
});

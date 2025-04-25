document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const showsContainer = document.getElementById('shows-container');
    const regionFilter = document.getElementById('region-filter');
    const therapistFilter = document.getElementById('therapist-filter');
    const gemFilter = document.getElementById('gem-filter');
    const bookFilter = document.getElementById('book-filter');
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
    
    function createShowCard(show) {
        const card = document.createElement('div');
        card.className = 'show-card';
        
        // Image container with handling for loading errors
        const imageContainer = document.createElement('div');
        imageContainer.className = 'show-image-container';
        
        const image = document.createElement('img');
        image.className = 'show-image';
        image.alt = `${show.title} Poster`;
        
        // Try to fetch real poster using the OMDB API (no API key needed for images)
        const encodedTitle = encodeURIComponent(show.title);
        image.src = `https://img.omdbapi.com/?t=${encodedTitle}&apikey=poster`;
        
        // Handle image loading error - fall back to a colored placeholder with text
        image.onerror = function() {
            // Create a color based on the show title
            const color = stringToColor(show.title);
            
            // Create a fallback placeholder
            const placeholder = document.createElement('div');
            placeholder.className = 'poster-error';
            placeholder.style.backgroundColor = color;
            placeholder.textContent = show.title;
            
            // Replace the image with our placeholder
            imageContainer.appendChild(placeholder);
            
            // Remove the image
            image.remove();
        };
        
        imageContainer.appendChild(image);
        card.appendChild(imageContainer);
        
        // Show info section
        const infoDiv = document.createElement('div');
        infoDiv.className = 'show-info';
        
        // Title element with "book-based" class if it's based on a book
        const titleEl = document.createElement('h3');
        titleEl.className = show.tags.includes('book') ? 'show-title book-based' : 'show-title';
        titleEl.textContent = show.title;
        
        const regionEl = document.createElement('div');
        regionEl.className = 'show-region';
        regionEl.textContent = show.region;
        
        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'show-tags';
        
        // Add tags
        if (show.tags.includes('therapist')) {
            const therapistTag = document.createElement('span');
            therapistTag.className = 'tag tag-therapist';
            therapistTag.textContent = 'Therapist 💊';
            tagsDiv.appendChild(therapistTag);
        }
        
        if (show.tags.includes('gem')) {
            const gemTag = document.createElement('span');
            gemTag.className = 'tag tag-gem';
            gemTag.textContent = 'Hidden Gem 💎';
            tagsDiv.appendChild(gemTag);
        }
        
        if (show.tags.includes('book')) {
            const bookTag = document.createElement('span');
            bookTag.className = 'tag tag-book';
            bookTag.textContent = 'Book 📚';
            tagsDiv.appendChild(bookTag);
        }

        if (show.tags.includes('scandi')) {
            const scandiTag = document.createElement('span');
            scandiTag.className = 'tag tag-scandi';
            scandiTag.textContent = 'Scandinavian ❄️';
            tagsDiv.appendChild(scandiTag);
        }

        if (show.tags.includes('supernatural')) {
            const supernaturalTag = document.createElement('span');
            supernaturalTag.className = 'tag tag-supernatural';
            supernaturalTag.textContent = 'supernatural 🧙🏽';
            tagsDiv.appendChild(supernaturalTag);
        }

        if (show.tags.includes('period')) {
            const periodTag = document.createElement('span');
            periodTag.className = 'tag tag-supernatural';
            periodTag.textContent = 'period 📼';
            tagsDiv.appendChild(periodTag);
        }
        
        // Append elements to info div
        infoDiv.appendChild(titleEl);
        infoDiv.appendChild(regionEl);
        infoDiv.appendChild(tagsDiv);
        
        // Append info div to card
        card.appendChild(infoDiv);
        
        return card;
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

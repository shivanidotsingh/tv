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

    // TMDB API Configuration
    const TMDB_API_KEY = '2f31918e48b6998c0bb8439980c6aa7e';
    const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
    let tmdbImageBaseUrl = null; // Variable to store the image base URL
    let tmdbImageSize = 'w500'; // Default size, you can change this (e.g., 'w342', 'original')

    // Function to fetch TMDB configuration, including image base URL and sizes
    async function fetchTmdbConfig() {
        try {
            const response = await fetch(`${TMDB_BASE_URL}/configuration?api_key=${TMDB_API_KEY}`);
            const config = await response.json();
            tmdbImageBaseUrl = config.images.secure_base_url;
            console.log('TMDB Image Base URL:', tmdbImageBaseUrl);
            // You can also inspect config.images.poster_sizes to choose a different size
            // console.log('Available Poster Sizes:', config.images.poster_sizes);
        } catch (error) {
            console.error('Error fetching TMDB configuration:', error);
        }
    }

    // Call this function when the script loads
    fetchTmdbConfig();


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

         // Added a slight delay to allow config to fetch if not already
        setTimeout(() => {
            showsContainer.innerHTML = '';

            let filteredShows = selectedRegion === 'all' ? Object.values(tvShowsData).flat() : tvShowsData[selectedRegion] || [];

            filteredShows = filteredShows.filter(show => {
                 // Find the actual region of the show from tvShowsData
                let showActualRegion = null;
                 for (const region in tvShowsData) {
                     if (tvShowsData[region].some(regionalShow => regionalShow.title === show.title)) {
                        showActualRegion = region;
                        break;
                    }
                }


                 const matchesRegion = selectedRegion === 'all' || selectedRegion === showActualRegion;

                 const matchesTags = (!hasTherapist || (show.tags && show.tags.includes('therapist'))) &&
                                   (!isGem || (show.tags && show.tags.includes('gem'))) &&
                                   (!isBook || (show.tags && show.tags.includes('book'))) &&
                                   (!isSupernatural || (show.tags && show.tags.includes('supernatural'))) &&
                                   (!isPeriod || (show.tags && show.tags.includes('period'))) &&
                                   (!isScandi || (show.tags && show.tags.includes('scandi')));


                const matchesSearch = !searchQuery || show.title.toLowerCase().includes(searchQuery);
                return matchesRegion && matchesTags && matchesSearch;
            });

            // Function to extract the starting year for sorting
            function getStartYear(yearString) {
                if (!yearString) return -Infinity; // Handle undefined or null years
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
                    // Pass the actual region to createShowCard for display
                    let showActualRegion = null;
                    for (const region in tvShowsData) {
                        if (tvShowsData[region].some(regionalShow => regionalShow.title === show.title)) {
                           showActualRegion = region;
                           break;
                        }
                    }
                    const showCard = createShowCard(show, showActualRegion);
                    showsGrid.appendChild(showCard);
                });
                showsContainer.appendChild(showsGrid);
            } else {
                showsContainer.innerHTML = 'No shows found matching your filters.';
            }
            console.log("renderShows() finished");
        }, 200); // Increased delay slightly
    }

     // Function to fetch TMDB poster URL
     async function fetchTmdbPosterUrl(showTitle, showYear) {
        if (!tmdbImageBaseUrl) {
            console.warn("TMDB image base URL not available yet.");
            // Return a placeholder or indicate that fetching is in progress
             return null;
        }

        // Construct the search query, including the year if available
        let searchQuery = `${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(showTitle)}`;
        if (showYear) {
             // Extract the starting year if the format is like "YYYY–YYYY"
             const yearMatch = showYear.match(/^(\d{4})/);
             if (yearMatch && yearMatch[1]) {
                 searchQuery += `&first_air_date_year=${yearMatch[1]}`;
             }
        }


        try {
            const searchResponse = await fetch(searchQuery);
            const searchData = await searchResponse.json();

            if (searchData.results && searchData.results.length > 0) {
                const tmdbShow = searchData.results[0]; // Get the first result
                if (tmdbShow.poster_path) {
                    return tmdbImageBaseUrl + tmdbImageSize + tmdbShow.poster_path;
                }
            }
            return null; // No poster found on TMDB
        } catch (error) {
            console.error(`Error fetching TMDB poster for ${showTitle}:`, error);
            return null;
        }
    }


    function createShowCard(show, region) {
        console.log("createShowCard() called with show:", show, "and region:", region);
        const showCard = document.createElement('div');
        showCard.classList.add('show-card');

        const showImageContainer = document.createElement('div');
        showImageContainer.classList.add('show-image-container');
         // Add a placeholder or loading indicator while fetching
        showImageContainer.innerHTML = '<div class="loading-poster">Loading poster...</div>';


        const showInfo = document.createElement('div');
        showInfo.classList.add('show-info');

        const showTitle = document.createElement('h3');
        showTitle.classList.add('show-title');
        showTitle.textContent = show.title;
        if (show.tags && show.tags.includes('book')) {
            showTitle.classList.add('book-based');
        }
        showInfo.appendChild(showTitle);

        // Add the year display here
        const showYear = document.createElement('p');
        showYear.classList.add('show-year');
        showYear.textContent = show.year || 'Year Unknown';
        showInfo.appendChild(showYear);

        const showRegion = document.createElement('p');
        showRegion.classList.add('show-region');
        showRegion.textContent = region || 'Unknown Region'; // Use the passed region
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
        // Append showInfo first, then handle image asynchronously

        // --- TMDB Fetching Logic ---
        // Pass the show.year to the fetchTmdbPosterUrl function
        fetchTmdbPosterUrl(show.title, show.year).then(tmdbPosterUrl => {
            // Clear loading indicator
             showImageContainer.innerHTML = '';

            const img = document.createElement('img');
            img.classList.add('show-image');
            img.alt = `${show.title} poster`;

            if (tmdbPosterUrl) {
                img.src = tmdbPosterUrl;
            } else if (show.poster_path && show.poster_path !== '/coJVIUEOToAEGViuhHPQg1prXHf.jpg' && show.poster_path !== '/7Q8RCLcCGd4hY23JzkD6aXU6QQ5.jpg' && !show.poster_path.startsWith('http')) {
                 // Fallback to existing relative path in data.js (assuming a 'posters' directory)
                 img.src = './posters/' + show.poster_path; // Adjust path if necessary
            } else if (show.poster_path && show.poster_path.startsWith('http')) {
                 // Fallback to existing absolute URL in data.js
                 img.src = show.poster_path;
            }
            else {
                // If no TMDB poster and no valid poster_path in data.js
                showImageContainer.innerHTML = '<div class="poster-error">Poster not available</div>';
                console.warn(`No poster found for ${show.title}`);
                return; // Stop here if no image source is found
            }

             img.onerror = () => {
                 console.error(`Error loading image for ${show.title} from ${img.src}.`);
                 showImageContainer.innerHTML = `<div class="poster-error">Poster not available</div>`;
             };

            showImageContainer.appendChild(img); // Append the created image
        });
        // --- End of TMDB Fetching Logic ---

         // Append the image container to the card
         showCard.insertBefore(showImageContainer, showInfo);


        console.log("createShowCard() returning:", showCard);
        return showCard;
    }
});

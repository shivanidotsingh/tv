// Sample data structure with TV shows
// In production, you would replace this with data from your spreadsheet
const tvShows = [
    // United Kingdom
    { title: "Fleabag", region: "United Kingdom", creator: "Phoebe Waller-Bridge", 
      tags: [], posterColor: "#2d3436", posterPath: "/api/placeholder/400/320", 
      description: "" },
    { title: "The Crown", region: "United Kingdom", creator: "Peter Morgan", 
      tags: [], posterColor: "#7f8c8d", posterPath: "/api/placeholder/400/320", 
      description: "" },
    { title: "Black Mirror", region: "United Kingdom", creator: "Charlie Brooker", 
      tags: [], posterColor: "#2c3e50", posterPath: "/api/placeholder/400/320", 
      description: "" },
    { title: "Humans", region: "United Kingdom", creator: "Sam Vincent, Jonathan Brackley", 
      tags: [], posterColor: "#34495e", posterPath: "/api/placeholder/400/320", 
      description: "" },
    { title: "Orphan Black", region: "United Kingdom", creator: "Graeme Manson, John Fawcett", 
      tags: [], posterColor: "#2d3436", posterPath: "/api/placeholder/400/320", 
      description: "" },
    
    // America
    { title: "Brooklyn Nine Nine", region: "America", creator: "Dan Goor, Michael Schur", 
      tags: [], posterColor: "#e67e22", posterPath: "/api/placeholder/400/320", 
      description: "" },
    { title: "Broad City", region: "America", creator: "Ilana Glazer, Abbi Jacobson", 
      tags: [], posterColor: "#e84393", posterPath: "/api/placeholder/400/320", 
      description: "" },
    { title: "High Maintenance", region: "America", creator: "Ben Sinclair, Katja Blichfeld", 
      tags: [], posterColor: "#27ae60", posterPath: "/api/placeholder/400/320", 
      description: "" },
    { title: "Girls", region: "America", creator: "Lena Dunham", 
      tags: [], posterColor: "#bdc3c7", posterPath: "/api/placeholder/400/320", 
      description: "" },
    { title: "Community", region: "America", creator: "Dan Harmon", 
      tags: [], posterColor: "#3498db", posterPath: "/api/placeholder/400/320", 
      description: "" },
    
    // World
    { title: "Call my Agent", region: "World", creator: "Fanny Herrero", 
      tags: ["French"], posterColor: "#2980b9", posterPath: "/api/placeholder/400/320", 
      description: "" },
    { title: "Elite", region: "World", creator: "Carlos Montero, Darío Madrona", 
      tags: ["Spanish"], posterColor: "#c0392b", posterPath: "/api/placeholder/400/320", 
      description: "" },
    { title: "Rita", region: "World", creator: "Christian Torpe", 
      tags: ["Scandinavian"], posterColor: "#f39c12", posterPath: "/api/placeholder/400/320", 
      description: "" },
    
    // Indian
    { title: "Made in Heaven", region: "Indian", creator: "Zoya Akhtar, Reema Kagti", 
      tags: [], posterColor: "#8e44ad", posterPath: "/api/placeholder/400/320", 
      description: "" },
    { title: "Family Man", region: "Indian", creator: "Raj & DK", 
      tags: [], posterColor: "#16a085", posterPath: "/api/placeholder/400/320", 
      description: "" },
    { title: "Panchayat", region: "Indian", creator: "TVF", 
      tags: ["Hidden Gem"], posterColor: "#27ae60", posterPath: "/api/placeholder/400/320", 
      description: "" },
    { title: "Sacred Games", region: "Indian", creator: "Vikramaditya Motwane, Anurag Kashyap", 
      tags: [], posterColor: "#d35400", posterPath: "/api/placeholder/400/320", 
      description: "" },
    { title: "Scam 1992", region: "Indian", creator: "Hansal Mehta", 
      tags: [], posterColor: "#f1c40f", posterPath: "/api/placeholder/400/320", 
      description: "" }
];

// Parse the CSV data
function parseCSVShowData(rawCSVData) {
    // This function would parse your CSV data and convert it to the above format
    // For now, we'll use the sample data above
    return tvShows;
}

// Group shows by region
function groupShowsByRegion(shows) {
    const regions = {};
    
    shows.forEach(show => {
        if (!regions[show.region]) {
            regions[show.region] = [];
        }
        regions[show.region].push(show);
    });
    
    return regions;
}

// Display shows grouped by region
function displayShowsByRegion(shows) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';
    
    const regions = groupShowsByRegion(shows);
    
    // Sort regions alphabetically
    const sortedRegions = Object.keys(regions).sort();
    
    sortedRegions.forEach(region => {
        const regionSection = document.createElement('section');
        const regionTitle = document.createElement('h2');
        regionTitle.className = 'region-title';
        regionTitle.textContent = region;
        regionSection.appendChild(regionTitle);
        
        const showGrid = document.createElement('div');
        showGrid.className = 'show-grid';
        
        // Sort shows alphabetically within each region
        regions[region].sort((a, b) => a.title.localeCompare(b.title)).forEach(show => {
            const showCard = createShowCard(show);
            showGrid.appendChild(showCard);
        });
        
        regionSection.appendChild(showGrid);
        mainContent.appendChild(regionSection);
    });
}

// Display shows alphabetically
function displayShowsAlphabetically(shows) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';
    
    const section = document.createElement('section');
    const showGrid = document.createElement('div');
    showGrid.className = 'show-grid';
    
    // Sort all shows alphabetically
    shows.sort((a, b) => a.title.localeCompare(b.title)).forEach(show => {
        const showCard = createShowCard(show);
        showGrid.appendChild(showCard);
    });
    
    section.appendChild(showGrid);
    mainContent.appendChild(section);
}

// Display shows by color
function displayShowsByColor(shows) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';
    
    const section = document.createElement('section');
    const showGrid = document.createElement('div');
    showGrid.className = 'show-grid';
    
    // Sort by color (using the posterColor property)
    shows.sort((a, b) => {
        // This is a simple sorting by hex code - in a real app you might use HSL values
        return a.posterColor.localeCompare(b.posterColor);
    }).forEach(show => {
        const showCard = createShowCard(show);
        showGrid.appendChild(showCard);
    });
    
    section.appendChild(showGrid);
    mainContent.appendChild(section);
}

// Create a show card element
function createShowCard(show) {
    const card = document.createElement('div');
    card.className = 'show-card';
    card.dataset.title = show.title;
    card.dataset.region = show.region;
    card.style.backgroundColor = show.posterColor;
    
    const img = document.createElement('img');
    img.src = show.posterPath;
    img.alt = show.title;
    card.appendChild(img);
    
    const info = document.createElement('div');
    info.className = 'show-info';
    
    const title = document.createElement('div');
    title.className = 'show-title';
    title.textContent = show.title;
    info.appendChild(title);
    
    const details = document.createElement('div');
    details.className = 'show-details';
    details.textContent = show.region;
    info.appendChild(details);
    
    if (show.tags && show.tags.length > 0) {
        const tags = document.createElement('div');
        tags.className = 'show-tags';
        
        show.tags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.className = 'show-tag';
            tagEl.textContent = tag;
            tags.appendChild(tagEl);
        });
        
        info.appendChild(tags);
    }
    
    card.appendChild(info);
    
    // Add click event to open modal
    card.addEventListener('click', () => openShowModal(show));
    
    return card;
}

// Open show details modal
function openShowModal(show) {
    const modal = document.getElementById('show-modal');
    const modalPoster = document.getElementById('modal-poster');
    const modalTitle = document.getElementById('modal-title');
    const modalCreator = document.getElementById('modal-creator');
    const modalRegion = document.getElementById('modal-region');
    const modalTags = document.getElementById('modal-tags');
    
    modalPoster.src = show.posterPath;
    modalTitle.textContent = show.title;
    modalCreator.textContent = show.creator || 'Unknown';
    modalRegion.textContent = show.region;
    
    modalTags.innerHTML = '';
    if (show.tags && show.tags.length > 0) {
        show.tags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.className = 'modal-tag';
            tagEl.textContent = tag;
            modalTags.appendChild(tagEl);
        });
    }
    
    modal.style.display = 'block';
}

// Close show details modal
function closeShowModal() {
    const modal = document.getElementById('show-modal');
    modal.style.display = 'none';
}

// Filter shows by search term
function filterShowsBySearch(shows, searchTerm) {
    if (!searchTerm) return shows;
    
    searchTerm = searchTerm.toLowerCase();
    return shows.filter(show => {
        return show.title.toLowerCase().includes(searchTerm) || 
               show.region.toLowerCase().includes(searchTerm) ||
               (show.creator && show.creator.toLowerCase().includes(searchTerm)) ||
               (show.tags && show.tags.some(tag => tag.toLowerCase().includes(searchTerm)));
    });
}

// Filter shows by region
function filterShowsByRegion(shows, region) {
    if (region === 'all') return shows;
    return shows.filter(show => show.region === region);
}

// Initialize the application
function initApp() {
    const shows = parseCSVShowData();
    displayShowsByRegion(shows);
    
    // Hide loader
    document.getElementById('loader').style.display = 'none';
    
    // Set up event listeners
    document.getElementById('view-region').addEventListener('click', () => {
        setActiveButton('view-region');
        const searchTerm = document.getElementById('search-input').value;
        const region = document.getElementById('region-filter').value;
        const filteredShows = filterShowsByRegion(filterShowsBySearch(shows, searchTerm), region);
        displayShowsByRegion(filteredShows);
    });
    
    document.getElementById('view-alphabetical').addEventListener('click', () => {
        setActiveButton('view-alphabetical');
        const searchTerm = document.getElementById('search-input').value;
        const region = document.getElementById('region-filter').value;
        const filteredShows = filterShowsByRegion(filterShowsBySearch(shows, searchTerm), region);
        displayShowsAlphabetically(filteredShows);
    });
    
    document.getElementById('view-color').addEventListener('click', () => {
        setActiveButton('view-color');
        const searchTerm = document.getElementById('search-input').value;
        const region = document.getElementById('region-filter').value;
        const filteredShows = filterShowsByRegion(filterShowsBySearch(shows, searchTerm), region);
        displayShowsByColor(filteredShows);
    });
    
    document.getElementById('search-input').addEventListener('input', (e) => {
        const searchTerm = e.target.value;
        const region = document.getElementById('region-filter').value;
        const filteredShows = filterShowsByRegion(filterShowsBySearch(shows, searchTerm), region);
        
        // Determine which view to use based on active button
        const activeViewButton = document.querySelector('.view-options button.active').id;
        if (activeViewButton === 'view-region') {
            displayShowsByRegion(filteredShows);
        } else if (activeViewButton === 'view-alphabetical') {
            displayShowsAlphabetically(filteredShows);
        } else if (activeViewButton === 'view-color') {
            displayShowsByColor(filteredShows);
        }
    });
    
    document.getElementById('region-filter').addEventListener('change', (e) => {
        const region = e.target.value;
        const searchTerm = document.getElementById('search-input').value;
        const filteredShows = filterShowsByRegion(filterShowsBySearch(shows, searchTerm), region);
        
        // Determine which view to use based on active button
        const activeViewButton = document.querySelector('.view-options button.active').id;
        if (activeViewButton === 'view-region') {
            displayShowsByRegion(filteredShows);
        } else if (activeViewButton === 'view-alphabetical') {
            displayShowsAlphabetically(filteredShows);
        } else if (activeViewButton === 'view-color') {
            displayShowsByColor(filteredShows);
        }
    });
    
    document.getElementById('close-modal').addEventListener('click', closeShowModal);
    
    // Close modal when clicking outside of modal content
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('show-modal');
        if (e.target === modal) {
            closeShowModal();
        }
    });
}

// Set active button state
function setActiveButton(buttonId) {
    document.querySelectorAll('.view-options button').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(buttonId).classList.add('active');
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

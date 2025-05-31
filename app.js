// Main App JavaScript - Frontend Functionality

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');
const authButtons = document.querySelector('.auth-buttons');
const searchBar = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-bar button');
const filterTags = document.querySelectorAll('.filter-tag');
const languageSelector = document.querySelector('.language-selector select');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    // Toggle navigation menu
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    
    // Toggle auth buttons
    authButtons.style.display = authButtons.style.display === 'flex' ? 'none' : 'flex';
    
    // Change icon
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Handle window resize (for mobile menu state reset)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.style.display = 'flex';
        authButtons.style.display = 'flex';
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    } else if (window.innerWidth <= 768 && !mobileMenuBtn.querySelector('i').classList.contains('fa-times')) {
        navMenu.style.display = 'none';
        authButtons.style.display = 'none';
    }
});

// Search functionality
searchBtn.addEventListener('click', () => {
    const searchQuery = searchBar.value.trim();
    if (searchQuery) {
        // In a real app, redirect to search results page with query
        console.log(`Searching for: ${searchQuery}`);
        alert(`Searching for: ${searchQuery}`);
        // window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
});

// Enable search on Enter key press
searchBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// Filter tags
filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
        // Toggle active state
        tag.classList.toggle('active');
        
        // In a real app, apply filter and refresh results
        const category = tag.textContent;
        console.log(`Toggled filter: ${category}`);
    });
});

// Language selection
languageSelector.addEventListener('change', () => {
    const selectedLanguage = languageSelector.value;
    console.log(`Language changed to: ${selectedLanguage}`);
    // In a real app, change language and reload content
    // setCookie('preferred_language', selectedLanguage);
    // window.location.reload();
});

// Simulated data for events
const eventData = [
    {
        id: 1,
        title: "Global AI Research Symposium",
        university: "Harvard University",
        location: "Cambridge, MA",
        date: "May 15, 2025",
        category: "Academic",
        description: "Join leading AI researchers for a day of presentations and discussions on cutting-edge developments in artificial intelligence.",
        attendees: 143,
        coordinates: {lat: 42.3770, lng: -71.1167},
        image: "/api/placeholder/600/400"
    },
    {
        id: 2,
        title: "International Tech Career Fair",
        university: "Stanford University",
        location: "Palo Alto, CA",
        date: "May 18, 2025",
        category: "Career",
        description: "Connect with top tech companies from around the world and explore job opportunities for recent graduates and experienced professionals.",
        attendees: 246,
        coordinates: {lat: 37.4275, lng: -122.1697},
        image: "/api/placeholder/601/401"
    },
    // More event data would be populated here from API
];

// Function to load Google Maps (would be called when API is ready)
function initMap() {
    // Check if Google Maps API is loaded
    if (typeof google === 'undefined') {
        console.log('Google Maps not loaded yet');
        return;
    }
    
    // Get map container
    const mapContainer = document.querySelector('.map-container');
    const mapPlaceholder = document.querySelector('.map-placeholder');
    
    if (mapContainer && mapPlaceholder) {
        // Remove placeholder
        mapPlaceholder.remove();
        
        // Create map
        const map = new google.maps.Map(mapContainer, {
            center: {lat: 20, lng: 0}, // Center at world view
            zoom: 2,
            styles: [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                }
            ]
        });
        
        // Add event markers from data
        eventData.forEach(event => {
            const marker = new google.maps.Marker({
                position: event.coordinates,
                map: map,
                title: event.title,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: getColorForCategory(event.category),
                    fillOpacity: 0.8,
                    strokeWeight: 0,
                    scale: 10
                }
            });
            
            // Add info window
            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div class="map-info-window">
                        <h3>${event.title}</h3>
                        <p>${event.university}</p>
                        <p>${event.date}</p>
                        <a href="/events/${event.id}">View Details</a>
                    </div>
                `
            });
            
            // Add click listener
            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });
        });
    }
}

// Helper function to get color for event category
function getColorForCategory(category) {
    const categoryColors = {
        'Academic': '#4a6fdc',
        'Career': '#37b9f1',
        'Social': '#ff6b6b',
        'Arts': '#ffc107',
        'Sports': '#28a745',
        'Research': '#6f42c1',
        'Virtual': '#20c997'
    };
    
    return categoryColors[category] || '#6c757d';
}

// Function to handle the loading of events data
function loadEvents(filters = {}) {
    // In a real app, this would fetch from an API
    console.log('Loading events with filters:', filters);
    
    // Example API call (commented out for demo)
    /*
    fetch('/api/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filters)
    })
    .then(response => response.json())
    .then(data => {
        // Process and display events
        renderEvents(data.events);
    })
    .catch(error => {
        console.error('Error fetching events:', error);
    });
    */
}

// Function to render events to the DOM
function renderEvents(events) {
    const eventsGrid = document.querySelector('.events-grid');
    
    if (!eventsGrid || !events.length) return;
    
    // Clear existing events
    eventsGrid.innerHTML = '';
    
    // Add events to grid
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        
        eventCard.innerHTML = `
            <div class="event-img" style="background-image: url('${event.image}')">
                <div class="event-date">${formatDate(event.date)}</div>
                <div class="event-category">${event.category}</div>
            </div>
            <div class="event-content">
                <h3>${event.title}</h3>
                <div class="event-meta">
                    <span><i class="fas fa-university"></i> ${event.university}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                </div>
                <p class="event-description">${event.description}</p>
                <div class="event-footer">
                    <div class="attendees">
                        <div class="attendees-avatars">
                            <span style="background-image: url('/api/placeholder/50/50')"></span>
                            <span style="background-image: url('/api/placeholder/51/51')"></span>
                            <span style="background-image: url('/api/placeholder/52/52')"></span>
                        </div>
                        <div class="attendees-count">+${event.attendees} going</div>
                    </div>
                    <a href="/events/${event.id}" class="view-event">View Event</a>
                </div>
            </div>
        `;
        
        eventsGrid.appendChild(eventCard);
    });
}

// Helper function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
}

// Initialize events loading on page load
document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    
    // Add Google Maps API script if it doesn't exist
    // In a real implementation, replace YOUR_API_KEY with an actual Google Maps API key
    /*
    if (!document.getElementById('google-maps-api')) {
        const script = document.createElement('script');
        script.id = 'google-maps-api';
        script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    } else {
        initMap();
    }
    */
});

// Add event listeners for all "View Event" buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-event')) {
        e.preventDefault();
        const eventId = e.target.getAttribute('href').split('/').pop();
        console.log(`View event clicked for ID: ${eventId}`);
        // In a real app, redirect to event page
        // window.location.href = `/events/${eventId}`;
        alert(`Viewing event: ${eventId}`);
    }
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', () => {
    // Add proper ARIA attributes to elements
    const searchBarInput = document.querySelector('.search-bar input');
    if (searchBarInput) {
        searchBarInput.setAttribute('aria-label', 'Search for events');
    }
    
    // Ensure all interactive elements are keyboard accessible
    const interactiveElements = document.querySelectorAll('a, button, input, select');
    interactiveElements.forEach(el => {
        if (!el.getAttribute('tabindex')) {
            el.setAttribute('tabindex', '0');
        }
    });
});
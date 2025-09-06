// Wait for the HTML document to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', () => {
    // --- Staggered Row Animation ---
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach((row, index) => {
        // Apply a smooth animation with a staggered delay.
        row.style.animation = `fadeInUp 0.5s ease-out ${index * 0.07}s forwards`;
    });

    // --- Search Functionality ---
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const tableRows = document.querySelectorAll('tbody tr');

    const filterTable = () => {
        const query = searchInput.value.toLowerCase();
        
        tableRows.forEach(row => {
            const doctorName = row.querySelector('.doctor-name').textContent.toLowerCase();
            const specialty = row.querySelector('.doctor-specialty').textContent.toLowerCase();

            if (doctorName.includes(query) || specialty.includes(query)) {
                row.style.display = ''; // Show the row
            } else {
                row.style.display = 'none'; // Hide the row
            }
        });
    };

    // Trigger search on button click
    searchButton.addEventListener('click', filterTable);

    // Trigger search on keyup in the input field
    searchInput.addEventListener('keyup', filterTable);
});

// Function to get the current week range
function getCurrentWeekRange() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const startDate = new Date(today);
    const endDate = new Date(today);
    
    // Calculate start of week (Monday)
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startDate.setDate(today.getDate() + diffToMonday);
    
    // Calculate end of week (Sunday)
    endDate.setDate(startDate.getDate() + 6);
    
    // Format dates
    const options = { month: 'long', day: 'numeric' };
    const startFormatted = startDate.toLocaleDateString('en-US', options);
    const endFormatted = endDate.toLocaleDateString('en-US', options);
    const year = startDate.getFullYear();
    
    return `${startFormatted} - ${endFormatted}, ${year}`;
}

// Update the subtitle with the current week
function updateWeekDisplay() {
    const subtitleElement = document.querySelector('.subtitle');
    if (subtitleElement) {
        subtitleElement.textContent = `Current week: ${getCurrentWeekRange()}`;
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', updateWeekDisplay);


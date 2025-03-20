 // Function to toggle sections visibility
  // Function to toggle sections visibility
// Function to toggle sections visibility
function showSection(sectionId) {
  console.log("Switching to section:", sectionId); // Debugging line

  // Hide all sections
  document.querySelectorAll('.section').forEach(section => {
    section.style.display = 'none';
  });

  // Show the selected section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.style.display = 'block';  // Show the selected section
  }
}

// Hide both sections initially on page load
document.addEventListener("DOMContentLoaded", function() {
  // Hide sections on page load
  document.getElementById("incident").style.display = 'none';
  document.getElementById("dashboard").style.display = 'none';
});

  

    // Chart setup
    document.addEventListener('DOMContentLoaded', function () {
      const data = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
          label: 'Incident Trends',
          data: [65, 59, 80, 81, 56],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        }]
      };

      const options = {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Incident Trends' },
          legend: { display: true }
        },
        scales: { x: { beginAtZero: true }, y: { beginAtZero: true } }
      };

      const ctx = document.getElementById('lineChart').getContext('2d');
      new Chart(ctx, { type: 'line', data: data, options: options });

      const tenDayChart = new Chart(document.getElementById('tenDayChart'), {
        type: 'line',
        data: {
          labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10'],
          datasets: [
            { label: 'New Cases', data: [5, 10, 7, 15, 12, 8, 10, 14, 16, 20], borderColor: '#3b82f6', fill: false },
            { label: 'Resolved', data: [3, 9, 6, 14, 10, 6, 9, 13, 15, 18], borderColor: '#34D399', fill: false }
          ]
        },
        options: options
      });
    });

    const barChart = new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
          labels: ['Machine', 'Privacy', 'Server', 'DDoS', 'Compromise'],
          datasets: [
            {
              label: 'Incidents',
              data: [20, 15, 30, 10, 5],
              backgroundColor: 'rgba(75, 192, 192, 0.5)'
            }
          ]
        },
        options: {
          responsive: true
        }
      });
  
      // Donut Chart
      const donutChart = new Chart(document.getElementById('donutChart'), {
        type: 'doughnut',
        data: {
          labels: ['In Progress', 'New', 'Closed'],
          datasets: [
            {
              label: 'Status',
              data: [50, 30, 20],
              backgroundColor: [
                'rgba(75, 192, 192, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 99, 132, 0.5)'
              ]
            }
          ]
        },
        options: {
          responsive: true
        }
      });
      function filterTable() {
        const category = document.getElementById("category").value.toLowerCase();
        const severity = document.getElementById("severity").value.toLowerCase();
        const status = document.getElementById("status").value.toLowerCase();
        const priority = document.getElementById("priority").value.toLowerCase();
        const date = document.getElementById("date").value;
    
        const rows = document.querySelectorAll("#incidentTable tbody tr");
    
        rows.forEach(row => {
            const cells = row.getElementsByTagName("td");
            const rowCategory = cells[3].textContent.toLowerCase(); // Category in 4th column
            const rowSeverity = cells[4].textContent.toLowerCase(); // Severity in 5th column
            const rowPriority = cells[5].textContent.toLowerCase(); // Priority in 6th column
            const rowStatus = cells[6].textContent.toLowerCase(); // Status in 7th column
            const rowDate = cells[7].textContent; // Date in 8th column
    
            // Check all filters
            const matchCategory = !category || rowCategory === category;
            const matchSeverity = !severity || rowSeverity === severity;
            const matchPriority = !priority || rowPriority === priority;
            const matchStatus = !status || rowStatus === status;
            const matchDate = !date || rowDate === date;  // Date should not be lowercase
    
            // Show/hide row based on match
            if (matchCategory && matchSeverity && matchPriority && matchStatus && matchDate) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    }
    
    // Attach event listeners to all filters
    document.getElementById("category").addEventListener("change", filterTable);
    document.getElementById("severity").addEventListener("change", filterTable);
    document.getElementById("status").addEventListener("change", filterTable);
    document.getElementById("priority").addEventListener("change", filterTable);
    document.getElementById("date").addEventListener("change", filterTable);
    



  
  // Function to close the side panel
  function closeSidePanel() {
    document.getElementById("sidePanel").style.display = "none";
  }
  
  // Add event listener to each row
  document.querySelectorAll("#incidentTable tbody tr").forEach(row => {
    row.addEventListener("click", function() {
      const incidentId = this.cells[1].textContent; // Get the incident ID from the row
      openSidePanel(incidentId);
    });
  });
  
 
// Variables to handle row hover and popup
let currentRow = null;
const popupMenu = document.getElementById('rowPopup');

// Show popup when mouse enters the row
document.querySelectorAll("#incidentTable tbody tr").forEach(row => {
  row.addEventListener('mouseenter', function(event) {
    currentRow = row;
    const rect = row.getBoundingClientRect();
    popupMenu.style.top = `${rect.top + window.scrollY}px`;  // Position based on row's position
    popupMenu.style.left = `${rect.right + window.scrollX + 5}px`;  // Right of the row

    // Show popup menu
    popupMenu.style.display = 'block';
  });

  // Hide popup when mouse leaves the row
  row.addEventListener('mouseleave', function() {
    popupMenu.style.display = 'none';  // Hide the popup
    currentRow = null;
  });
});

// Functions for View, Edit, and Dashboard actions
function viewIncident() {
  const incidentId = currentRow.getAttribute("data-incident-id");
  openSidePanel(incidentId);  // Open side panel with incident details (assuming openSidePanel is defined)
  popupMenu.style.display = 'none';  // Hide popup
}

function goToDashboard() {
  window.location.href = '/dashboard';  // Redirect to dashboard
  popupMenu.style.display = 'none';  // Hide popup
}

function editIncident() {
  const incidentId = currentRow.getAttribute("data-incident-id");
  alert(`Editing incident with ID: ${incidentId}`);  // Placeholder for edit functionality
  popupMenu.style.display = 'none';  // Hide popup
}

// Toggle side panel visibility
document.getElementById('closeBtn').onclick = function() {
    document.getElementById('sidePanel').classList.remove('open');
  };
  
  // To open the side panel (from your existing code)
  function openSidePanel() {
    document.getElementById('sidePanel').classList.add('open');
  }
  
  function openSidebar(incident) {
    console.log("Incident data:", incident);  // Log the full incident object

    document.getElementById("incidentNo").textContent = incident.id;
    document.getElementById("incidentTitle").textContent = incident.title;
    document.getElementById("incidentCategory").textContent = incident.category;
    document.getElementById("incidentSeve").textContent = incident.severity;
    document.getElementById("incidentPriority").textContent = incident.priority;
    document.getElementById("incidentStatus").textContent = incident.status;
    document.getElementById("incidentDate").textContent = incident.date;

    // Fetch description from the incident or show default message
    const description = incident.description || "No description available.";
    console.log("Fetching description for Incident ID:", incident.id, " Description:", description);  // Log description

    // Set the description in the HTML element
    document.getElementById("incidentDesc").textContent = description;

    // Show the sidebar
    document.getElementById("incidentSidebar").classList.add("active");
  }

  // Function to close sidebar
  function closeSidebar() {
    document.getElementById("incidentSidebar").classList.remove("active");
  }

  // Add event listener to each row
  document.querySelectorAll("#incidentTable tbody tr").forEach(row => {
    row.addEventListener("click", function () {
      const incidentData = this.getAttribute("data-incident"); // Get the JSON data from the data-incident attribute
      if (incidentData) {
        const incident = JSON.parse(incidentData); // Parse the incident data
        openSidebar(incident); // Pass the incident object to the openSidebar function
      }
    });
  });

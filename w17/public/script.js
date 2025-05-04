// DOM Elements
const employeeGrid = document.getElementById('employeeGrid');
const searchInput = document.getElementById('searchInput');
const departmentFilter = document.getElementById('departmentFilter');

let employees = [];

// Fetch employees data
async function fetchEmployees() {
    try {
        const response = await fetch('/api/employees');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        employees = await response.json();
        displayEmployees(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        employeeGrid.innerHTML = '<div class="error">Error loading employees. Please try again.</div>';
    }
}

// Display employees in cards
function displayEmployees(employeesToShow) {
    employeeGrid.innerHTML = '';
    
    if (employeesToShow.length === 0) {
        employeeGrid.innerHTML = '<div class="error">No employees found.</div>';
        return;
    }

    employeesToShow.forEach(employee => {
        const card = document.createElement('div');
        card.className = 'employee-card';
        card.innerHTML = `
            <img src="${employee.profileImage}" alt="${employee.name}" class="profile-image">
            <div class="employee-info">
                <h2 class="employee-name">${employee.name}</h2>
                <p class="employee-designation">${employee.designation}</p>
                <p class="employee-department">${employee.department}</p>
                <p class="employee-salary">$${employee.salary.toLocaleString()}</p>
            </div>
        `;
        employeeGrid.appendChild(card);
    });
}

// Filter employees based on search and department
function filterEmployees() {
    const searchTerm = searchInput.value.toLowerCase();
    const department = departmentFilter.value;

    const filteredEmployees = employees.filter(employee => {
        const matchesSearch = employee.name.toLowerCase().includes(searchTerm) ||
                            employee.designation.toLowerCase().includes(searchTerm) ||
                            employee.department.toLowerCase().includes(searchTerm);
        
        const matchesDepartment = !department || employee.department === department;

        return matchesSearch && matchesDepartment;
    });

    displayEmployees(filteredEmployees);
}

// Event Listeners
searchInput.addEventListener('input', filterEmployees);
departmentFilter.addEventListener('change', filterEmployees);

// Initial load
fetchEmployees(); 
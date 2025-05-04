// DOM Elements
const addEmployeeForm = document.getElementById('addEmployeeForm');
const employeesList = document.getElementById('employeesList');

// Fetch all employees
async function fetchEmployees() {
    try {
        const response = await fetch('/api/employees');
        const employees = await response.json();
        displayEmployees(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
    }
}

// Display employees in the list
function displayEmployees(employees) {
    employeesList.innerHTML = '';
    employees.forEach(employee => {
        const employeeElement = createEmployeeElement(employee);
        employeesList.appendChild(employeeElement);
    });
}

// Create employee element
function createEmployeeElement(employee) {
    const div = document.createElement('div');
    div.className = 'employee-item';
    div.innerHTML = `
        <div class="employee-info">
            <h3>${employee.name}</h3>
            <p>Department: ${employee.department}</p>
            <p>Designation: ${employee.designation}</p>
            <p>Salary: $${employee.salary}</p>
            <p>Joining Date: ${new Date(employee.joiningDate).toLocaleDateString()}</p>
        </div>
        <div class="employee-actions">
            <button class="edit-btn" onclick="showEditForm('${employee._id}')">Edit</button>
            <button class="delete-btn" onclick="deleteEmployee('${employee._id}')">Delete</button>
        </div>
        <div id="edit-form-${employee._id}" class="edit-form">
            <input type="text" id="edit-name-${employee._id}" value="${employee.name}" placeholder="Full Name">
            <input type="text" id="edit-department-${employee._id}" value="${employee.department}" placeholder="Department">
            <input type="text" id="edit-designation-${employee._id}" value="${employee.designation}" placeholder="Designation">
            <input type="number" id="edit-salary-${employee._id}" value="${employee.salary}" placeholder="Salary">
            <input type="date" id="edit-joiningDate-${employee._id}" value="${new Date(employee.joiningDate).toISOString().split('T')[0]}">
            <button onclick="updateEmployee('${employee._id}')">Save Changes</button>
            <button onclick="hideEditForm('${employee._id}')">Cancel</button>
        </div>
    `;
    return div;
}

// Add new employee
addEmployeeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const employeeData = {
        name: document.getElementById('name').value,
        department: document.getElementById('department').value,
        designation: document.getElementById('designation').value,
        salary: parseFloat(document.getElementById('salary').value),
        joiningDate: document.getElementById('joiningDate').value
    };

    try {
        const response = await fetch('/api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeeData)
        });

        if (response.ok) {
            addEmployeeForm.reset();
            fetchEmployees();
        }
    } catch (error) {
        console.error('Error adding employee:', error);
    }
});

// Show edit form
function showEditForm(employeeId) {
    const editForm = document.getElementById(`edit-form-${employeeId}`);
    editForm.classList.add('active');
}

// Hide edit form
function hideEditForm(employeeId) {
    const editForm = document.getElementById(`edit-form-${employeeId}`);
    editForm.classList.remove('active');
}

// Update employee
async function updateEmployee(employeeId) {
    const employeeData = {
        name: document.getElementById(`edit-name-${employeeId}`).value,
        department: document.getElementById(`edit-department-${employeeId}`).value,
        designation: document.getElementById(`edit-designation-${employeeId}`).value,
        salary: parseFloat(document.getElementById(`edit-salary-${employeeId}`).value),
        joiningDate: document.getElementById(`edit-joiningDate-${employeeId}`).value
    };

    try {
        const response = await fetch(`/api/employees/${employeeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeeData)
        });

        if (response.ok) {
            hideEditForm(employeeId);
            fetchEmployees();
        }
    } catch (error) {
        console.error('Error updating employee:', error);
    }
}

// Delete employee
async function deleteEmployee(employeeId) {
    if (confirm('Are you sure you want to delete this employee?')) {
        try {
            const response = await fetch(`/api/employees/${employeeId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchEmployees();
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    }
}

// Initial load
fetchEmployees(); 
// DOM Elements
const usersGrid = document.getElementById('usersGrid');
const searchInput = document.getElementById('searchInput');
const departmentFilter = document.getElementById('departmentFilter');
const statusFilter = document.getElementById('statusFilter');
const modal = document.getElementById('userModal');
const modalBody = modal.querySelector('.modal-body');
const closeButton = modal.querySelector('.close-button');

// State
let users = [];

// Fetch users from API
async function fetchUsers() {
    try {
        const response = await fetch('/api/users');
        users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        usersGrid.innerHTML = '<p class="error">Error loading users. Please try again later.</p>';
    }
}

// Display users in grid
function displayUsers(usersToShow) {
    usersGrid.innerHTML = usersToShow.map(user => `
        <div class="user-card" onclick="showUserDetails(${user.id})">
            <img src="${user.image}" alt="${user.name}" class="user-image">
            <div class="user-info">
                <h3 class="user-name">${user.name}</h3>
                <p class="user-role">${user.role}</p>
                <span class="user-department">${user.department}</span>
                <span class="user-status ${user.status === 'Active' ? 'status-active' : 'status-leave'}">
                    ${user.status}
                </span>
            </div>
        </div>
    `).join('');
}

// Show user details in modal
function showUserDetails(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    modalBody.innerHTML = `
        <img src="${user.image}" alt="${user.name}" class="modal-image">
        <div class="modal-info">
            <h2>${user.name}</h2>
            <p class="role">${user.role}</p>
            <p class="email">${user.email}</p>
            <span class="department">${user.department}</span>
            <span class="status ${user.status === 'Active' ? 'status-active' : 'status-leave'}">
                ${user.status}
            </span>
        </div>
    `;
    modal.style.display = 'block';
}

// Filter users
function filterUsers() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedDepartment = departmentFilter.value;
    const selectedStatus = statusFilter.value;

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm) ||
                            user.role.toLowerCase().includes(searchTerm) ||
                            user.email.toLowerCase().includes(searchTerm);
        const matchesDepartment = !selectedDepartment || user.department === selectedDepartment;
        const matchesStatus = !selectedStatus || user.status === selectedStatus;
        return matchesSearch && matchesDepartment && matchesStatus;
    });

    displayUsers(filteredUsers);
}

// Event Listeners
searchInput.addEventListener('input', filterUsers);
departmentFilter.addEventListener('change', filterUsers);
statusFilter.addEventListener('change', filterUsers);

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', fetchUsers); 
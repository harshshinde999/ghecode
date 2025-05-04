// DOM Elements
const addStudentForm = document.getElementById('addStudentForm');
const studentsList = document.getElementById('studentsList');

// Add new student
addStudentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const studentData = {
        name: document.getElementById('name').value,
        rollNo: parseInt(document.getElementById('rollNo').value),
        WAD_Marks: parseInt(document.getElementById('WAD_Marks').value),
        CC_Marks: parseInt(document.getElementById('CC_Marks').value),
        DSBDA_Marks: parseInt(document.getElementById('DSBDA_Marks').value),
        CNS_Marks: parseInt(document.getElementById('CNS_Marks').value),
        AI_marks: parseInt(document.getElementById('AI_marks').value)
    };

    try {
        const response = await fetch('/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            addStudentForm.reset();
            showAllStudents();
        }
    } catch (error) {
        console.error('Error adding student:', error);
    }
});

// Display students in table
function displayStudents(students) {
    studentsList.innerHTML = '';
    if (!Array.isArray(students)) {
        console.error('Expected array of students but got:', students);
        return;
    }
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.rollNo}</td>
            <td>${student.WAD_Marks}</td>
            <td>${student.CC_Marks}</td>
            <td>${student.DSBDA_Marks}</td>
            <td>${student.CNS_Marks}</td>
            <td>${student.AI_marks}</td>
            <td>
                <button class="action-btn update-btn" onclick="updateMarks('${student._id}')">Update Marks</button>
                <button class="action-btn delete-btn" onclick="deleteStudent('${student._id}')">Delete</button>
            </td>
        `;
        studentsList.appendChild(row);
    });
}

// Show all students
async function showAllStudents() {
    try {
        const response = await fetch('/api/students');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const students = await response.json();
        displayStudents(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        studentsList.innerHTML = '<tr><td colspan="8" class="error">Error loading students. Please try again.</td></tr>';
    }
}

// Show students with DSBDA marks > 20
async function showDSBDAStudents() {
    try {
        const response = await fetch('/api/students/dsbda');
        const students = await response.json();
        displayStudents(students);
    } catch (error) {
        console.error('Error fetching DSBDA students:', error);
    }
}

// Show students with marks > 25 in all subjects
async function showExcellentStudents() {
    try {
        const response = await fetch('/api/students/excellent');
        const students = await response.json();
        displayStudents(students);
    } catch (error) {
        console.error('Error fetching excellent students:', error);
    }
}

// Show students with marks < 40 in WAD and CC
async function showPoorStudents() {
    try {
        const response = await fetch('/api/students/poor');
        const students = await response.json();
        displayStudents(students);
    } catch (error) {
        console.error('Error fetching poor students:', error);
    }
}

// Show total count of students
async function showTotalCount() {
    try {
        const response = await fetch('/api/students/count');
        const data = await response.json();
        alert(`Total number of students: ${data.count}`);
    } catch (error) {
        console.error('Error fetching student count:', error);
    }
}

// Update marks by 10
async function updateMarks(studentId) {
    try {
        const response = await fetch(`/api/students/update/${studentId}`, {
            method: 'PUT'
        });

        if (response.ok) {
            showAllStudents();
        }
    } catch (error) {
        console.error('Error updating marks:', error);
    }
}

// Delete student
async function deleteStudent(studentId) {
    if (confirm('Are you sure you want to delete this student?')) {
        try {
            const response = await fetch(`/api/students/${studentId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                showAllStudents();
            }
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    }
}

// Initial load
showAllStudents(); 
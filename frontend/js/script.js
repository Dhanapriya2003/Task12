document.addEventListener("DOMContentLoaded", () => {
    loadEmployees();  // Ensure this runs after the page is loaded
});

async function loadEmployees() {
    try {
        const response = await fetch(`${API_BASE_URL}`);
        if (!response.ok) throw new Error("Failed to fetch employees");

        const employees = await response.json();
        const tbody = document.querySelector('#employeesTable tbody');

        if (!tbody) {
            console.error("Error: #employeesTable tbody not found!");
            return; // Stop execution if tbody is missing
        }

        tbody.innerHTML = employees.map(emp => `
            <tr>
                <td>${emp.firstName}</td>
                <td>${emp.lastName}</td>
                <td>${emp.email}</td>
                <td>
                    <button class="edit-btn" onclick="editEmployee('${emp.id}')">Edit</button>
                    <button class="delete-btn" onclick="deleteEmployee('${emp.id}')">Delete</button>
                    <button class="view-btn" onclick="viewEmployee('${emp.id}')">View</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error("Error loading employees:", error);
    }
}

function viewEmployee(id) {
    window.location.href = `view-employee.html?id=${id}`;
}

function editEmployee(id) {
    window.location.href = `edit-employee.html?id=${id}`;
}

// document.addEventListener("DOMContentLoaded", () => {
//     const form = document.getElementById("employeeForm");
//     if (form) {
//         form.addEventListener("submit", handleSubmit);
//     } else {
//         console.error("Form element not found!");
//     }
// });
document.addEventListener("DOMContentLoaded", () => {
    loadEmployees();
});


async function deleteEmployee(id) {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error("Failed to delete employee");
        
        loadEmployees();
        alert("Employee deleted successfully!");
    } catch (error) {
        console.error("Error deleting employee:", error);
    }
}
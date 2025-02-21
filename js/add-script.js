document.addEventListener('DOMContentLoaded', () => {
    loadEmployees();
    document.getElementById('employeeForm').addEventListener('submit', handleSubmit);
});

async function loadEmployees() {
    try {
        const response = await fetch(`${API_BASE_URL}`);
        if (!response.ok) throw new Error("Failed to fetch employees");

        const employees = await response.json();
        const tbody = document.querySelector('#employeesTable tbody');
        tbody.innerHTML = employees.map(emp => `
            <tr>
                <td>${emp.firstName}</td>
                <td>${emp.lastName}</td>
                <td>${emp.email}</td>
                <td>
                    <button onclick="editEmployee('${emp.id}')">Edit</button>
                    <button onclick="deleteEmployee('${emp.id}')">Delete</button>
                </td>
            </tr>
        `).join('');
        alert("Employee updated successfully!");
    } catch (error) {
        console.error("Error loading employees:", error);
    }
}

async function handleSubmit(event) {
    event.preventDefault();

    const employeeId = document.getElementById('employeeId').value.trim();

    const employee = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value
    };

    let url = `${API_BASE_URL}`;
    let method = 'POST';

    if (employeeId) {
        url += `/${employeeId}`;
        method = 'PUT';
        employee.id = employeeId; // Ensure ID is included for updates
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employee)
        });

        if (!response.ok) throw new Error(`Failed to ${method === 'POST' ? 'create' : 'update'} employee`);

        resetForm();
        loadEmployees();
    } catch (error) {
        console.error("Error saving employee:", error);
    }
}

async function editEmployee(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'GET', // Ensure method is GET
            headers: { 'Accept': 'application/json' }
        });
        if (!response.ok) throw new Error("Failed to fetch employee details");

        const employee = await response.json();

        document.getElementById('employeeId').value = employee.id;
        document.getElementById('firstName').value = employee.firstName;
        document.getElementById('lastName').value = employee.lastName;
        document.getElementById('email').value = employee.email;
    } catch (error) {
        console.error("Error fetching employee details:", error);
    }
}

async function deleteEmployee(id) {
    if (!confirm('Are you sure you want to delete this employee?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error("Failed to delete employee");

        loadEmployees();
    } catch (error) {
        console.error("Error deleting employee:", error);
    }
}

function resetForm() {
    document.getElementById('employeeForm').reset();
    alert("Employee added successfully!");
    document.getElementById('employeeId').value = ''; // Clear the hidden ID field
}

// document.addEventListener("DOMContentLoaded", function () {
//     const form = document.getElementById("employeeForm");

//     form.addEventListener("submit", async function (event) {
//         event.preventDefault(); // Prevent form from reloading the page

//         const firstName = document.getElementById("firstName").value;
//         const lastName = document.getElementById("lastName").value;
//         const email = document.getElementById("email").value;

//         const employeeData = { firstName, lastName, email };

//         try {
//             const response = await fetch("http://localhost:8080/api/employees", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(employeeData),
//             });

//             if (response.ok) {
//                 showSuccessMessage("Employee added successfully!");

//                 // Clear the form
//                 form.reset();
//             } else {
//                 showErrorMessage("Failed to add employee. Try again.");
//             }
//         } catch (error) {
//             showErrorMessage("Error occurred while saving employee.");
//         }
//     });

//     function showSuccessMessage(message) {
//         const msgBox = document.getElementById("successMessage");
//         msgBox.innerText = message;
//         msgBox.style.display = "block";

//         // Hide message after 3 seconds
//         setTimeout(() => {
//             msgBox.style.display = "none";
//         }, 3000);
//     }

//     function showErrorMessage(message) {
//         const msgBox = document.getElementById("errorMessage");
//         msgBox.innerText = message;
//         msgBox.style.display = "block";

//         // Hide message after 3 seconds
//         setTimeout(() => {
//             msgBox.style.display = "none";
//         }, 3000);
//     }
// });

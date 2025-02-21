document.addEventListener('DOMContentLoaded', () => {
    loadEmployees();
    document.getElementById('employeeForm').addEventListener('submit', handleSubmit);
});

async function loadEmployees() {
    const response = await fetch('http://localhost:8080/api/employees');
    const employees = await response.json();
    const tbody = document.querySelector('#employeesTable tbody');
    tbody.innerHTML = employees.map(emp => `
        <tr>
            <td>${emp.id}</td>
            <td>${emp.firstName}</td>
            <td>${emp.lastName}</td>
            <td>${emp.email}</td>
            <td>
                <button onclick="editEmployee('${emp.id}')">Edit</button>
                <button onclick="deleteEmployee('${emp.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

async function handleSubmit(event) {
    event.preventDefault();
    const employee = {
        id: document.getElementById('employeeId').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value
    };

    const url = employee.id
        ? `http://localhost:8080/api/employees/${employee.id}`
        : 'http://localhost:8080/api/employees';

    const method = employee.id ? 'PUT' : 'POST';

    await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
    });

    resetForm();
    loadEmployees();
}

async function editEmployee(id) {
    const response = await fetch(`http://localhost:8080/api/employees/${id}`);
    const employee = await response.json();
    document.getElementById('employeeId').value = employee.id;
    document.getElementById('firstName').value = employee.firstName;
    document.getElementById('lastName').value = employee.lastName;
    document.getElementById('email').value = employee.email;
}

async function deleteEmployee(id) {
    if (confirm('Delete this employee?')) {
        await fetch(`http://localhost:8080/api/employees/${id}`, { method: 'DELETE' });
        loadEmployees();
    }
}

function resetForm() {
    document.getElementById('employeeForm').reset();
    document.getElementById('employeeId').value = '';
}
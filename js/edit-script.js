document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const employeeId = urlParams.get('id');
    if (employeeId) {
        try {
            const response = await fetch(`${API_BASE_URL}/${employeeId}`);
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
});

document.getElementById('employeeForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const employeeId = document.getElementById('employeeId').value;
    const employee = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value
    };
    try {
        const response = await fetch(`${API_BASE_URL}/${employeeId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employee)
        });
        if (!response.ok) throw new Error("Failed to update employee");
        alert("Employee updated successfully!");
        window.location.href = "/Task12/index.html";
    } catch (error) {
        console.error("Error updating employee:", error);
    }
});
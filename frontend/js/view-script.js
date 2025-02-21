document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const employeeId = params.get("id");

    if (employeeId) {
        try {
            const response = await fetch(`http://localhost:8081/api/employees/${employeeId}`);
            if (!response.ok) throw new Error("Failed to fetch employee details");

            const employee = await response.json();
            document.getElementById("firstName").textContent = employee.firstName;
            document.getElementById("lastName").textContent = employee.lastName;
            document.getElementById("email").textContent = employee.email;
        } catch (error) {
            console.error("Error fetching employee details:", error);
        }
    } else {
        alert("Invalid employee ID");
        window.location.href = "index.html";
    }
});

function goBack() {
    window.history.back();
}

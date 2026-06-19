const form = document.getElementById("userForm");
const usersList = document.getElementById("usersList");

loadUsers();

form.addEventListener("submit", addUser);

async function addUser(e) {

    e.preventDefault();

    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        age: document.getElementById("age").value
    };

    try {

        const response = await fetch("/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error("Failed to add user");
        }

        form.reset();

        loadUsers();

    }
    catch (error) {
        alert(error.message);
    }
}

async function loadUsers() {

    try {

        const response = await fetch("/users");

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await response.json();

        usersList.innerHTML = "";

        users.forEach(user => {

            usersList.innerHTML += `
                <div class="user">
                    <p><b>Name:</b> ${user.name}</p>
                    <p><b>Email:</b> ${user.email}</p>
                    <p><b>Age:</b> ${user.age}</p>

                    <button
                        class="deleteBtn"
                        onclick="deleteUser(${user.id})">
                        Delete
                    </button>
                </div>
            `;
        });
    }
    catch (error) {
        alert(error.message);
    }
}

async function deleteUser(id) {

    try {

        const response = await fetch(`/users/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete user");
        }

        loadUsers();

    }
    catch (error) {
        alert(error.message);
    }
}
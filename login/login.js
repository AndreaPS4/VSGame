document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formulario-login");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    function createErrorMessage(input) {
        let msg = document.createElement("p");
        msg.classList.add("error-message");
        msg.innerText = "";
        input.insertAdjacentElement("afterend", msg);
        return msg;
    }

    const usernameMsg = createErrorMessage(usernameInput);
    const passwordMsg = createErrorMessage(passwordInput);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/;

    usernameInput.addEventListener("blur", () => {
        if (usernameInput.value.trim() === "") {
            usernameInput.classList.add("input-error");
            usernameMsg.innerText = "✧ El nombre de usuario es obligatorio.";
        } else {
            usernameInput.classList.remove("input-error");
            usernameMsg.innerText = "";
        }
    });

    passwordInput.addEventListener("blur", () => {
        if (!passwordRegex.test(passwordInput.value)) {
            passwordInput.classList.add("input-error");
            passwordMsg.innerText =
                "✧ La contraseña debe tener mínimo 6 caracteres, 1 mayúscula, 1 minúscula y 1 número.";
        } else {
            passwordInput.classList.remove("input-error");
            passwordMsg.innerText = "";
        }
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        let valid = true;

        if (usernameInput.value.trim() === "") {
            usernameInput.classList.add("input-error");
            usernameMsg.innerText = "✧ El nombre de usuario es obligatorio.";
            valid = false;
        }

        if (!passwordRegex.test(passwordInput.value)) {
            passwordInput.classList.add("input-error");
            passwordMsg.innerText =
                "✧ La contraseña debe tener mínimo 6 caracteres, 1 mayúscula, 1 minúscula y 1 número.";
            valid = false;
        }

        if (!valid) return;

        try {
            const response = await fetch("/PROYECTO_2EV/api/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: usernameInput.value.trim(),
                    password: passwordInput.value.trim()
                })
            });

            const data = await response.json();

            if (data.success) {
                window.location.href = "../admin/index.php";
            } else {
                alert("Error: " + data.message);
            }

        } catch (error) {
            console.error("Error en la petición:", error);
            alert("Error al conectar con el servidor.");
        }
    });
});
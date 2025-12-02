document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formulario-register");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    function createErrorMessage(inputElem) {
        let msg = document.createElement("p");
        msg.classList.add("error-message");
        msg.innerText = "";
        inputElem.insertAdjacentElement("afterend", msg);
        return msg;
    }

    const usernameMsg = createErrorMessage(usernameInput);
    const emailMsg = createErrorMessage(emailInput);
    const passMsg = createErrorMessage(passwordInput);
    const confirmMsg = createErrorMessage(confirmPasswordInput);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

    emailInput.addEventListener("blur", () => {
        if (!emailRegex.test(emailInput.value)) {
            emailInput.classList.add("input-error");
            emailMsg.innerText = "✧ El formato del email no es válido.";
        } else {
            emailInput.classList.remove("input-error");
            emailMsg.innerText = "";
        }
    });

    passwordInput.addEventListener("blur", () => {
        if (!passwordRegex.test(passwordInput.value)) {
            passwordInput.classList.add("input-error");
            passMsg.innerText =
                "✧ La contraseña debe tener mínimo 6 caracteres, 1 mayúscula, 1 minúscula y 1 número.";
        } else {
            passwordInput.classList.remove("input-error");
            passMsg.innerText = "";
        }
    });

    confirmPasswordInput.addEventListener("blur", () => {
        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordInput.classList.add("input-error");
            confirmMsg.innerText = "✧ Las contraseñas no coinciden.";
        } else {
            confirmPasswordInput.classList.remove("input-error");
            confirmMsg.innerText = "";
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

        if (!emailRegex.test(emailInput.value)) {
            emailInput.classList.add("input-error");
            emailMsg.innerText = "✧ El formato del email no es válido.";
            valid = false;
        }

        if (!passwordRegex.test(passwordInput.value)) {
            passwordInput.classList.add("input-error");
            passMsg.innerText =
                "✧ La contraseña debe tener mínimo 6 caracteres, 1 mayúscula, 1 minúscula y 1 número.";
            valid = false;
        }

        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordInput.classList.add("input-error");
            confirmMsg.innerText = "✧ Las contraseñas no coinciden.";
            valid = false;
        }

        if (!valid) return;

        try {
            const response = await fetch("/PROYECTO_2EV/api/register.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: usernameInput.value.trim(),
                    email: emailInput.value.trim(),
                    password: passwordInput.value.trim()
                })
            });

            const data = await response.json();

            if (data.success) {
                alert("✔ Registro completado con éxito");
                window.location.href = "../login/login.html";
            } else {
                alert("Error: " + data.message);
            }

        } catch (error) {
            console.error("Error en la petición:", error);
            alert("Error al conectar con el servidor.");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formulario-login");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    function createErrorMessage(input) {
        let msg = document.createElement("p");
        msg.classList.add("error-message");
        msg.innerText = "";
        input.insertAdjacentElement("afterend", msg);
        return msg;
    }

    const emailMsg = createErrorMessage(emailInput);
    const passwordMsg = createErrorMessage(passwordInput);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/;

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

        if (!emailRegex.test(emailInput.value)) {
            emailInput.classList.add("input-error");
            emailMsg.innerText = "✧ El formato del email no es válido.";
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
            const response = await fetch("/api/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: emailInput.value.trim(),
                    password: passwordInput.value.trim()
                })
            });

            const data = await response.json();

            if (data.success) {
                window.location.href = "/login/login.html";
            } else {
                alert("Error: " + data.message);
            }

        } catch (error) {
            console.error("Error en la petición:", error);
            alert("Error al conectar con el servidor.");
        }
    });
});
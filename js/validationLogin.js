document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;

        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');

        emailError.textContent = '';
        passwordError.textContent = '';

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value) {
            emailError.textContent = 'El correo electrónico es obligatorio.';
            isValid = false;
        } else if (!emailPattern.test(email.value)) {
            emailError.textContent = 'Por favor, ingrese un correo electrónico válido.';
            isValid = false;
        }

        console.log(password)
          if (!password || !password.value) {
            if (!password) {
                console.log("El campo de contraseña no se encuentra");
            }
            passwordError.textContent = 'La contraseña es obligatoria.';
            isValid = false;
        } else if (password.value.length < 4) {
            passwordError.textContent = 'La contraseña debe tener al menos 4 caracteres.';
            isValid = false;
        } 

        if (isValid) {
            alert("Sesión iniciada. ¡Bienvenido! (Esto es un simulacro, falta backend)");

            window.location.href = "../index.html";
        }
    });
});

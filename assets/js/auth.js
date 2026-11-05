
/*--- Login Page ---*/
(function () {
    const loginForm = document.getElementById("ttLoginForm");
    if (!loginForm) return;

    const emailInput = document.getElementById("ttLoginEmail");
    const passwordInput = document.getElementById("ttLoginPassword");
    const passwordToggle = document.getElementById("ttLoginPasswordToggle");
    const rememberInput = document.getElementById("ttLoginRemember");
    const roleCards = document.querySelectorAll(".tt-login-role-card");


    /*--- Account Type Selection ---*/
    function updateRoleSelection() {
        roleCards.forEach(function (card) {
            const radio = card.querySelector('input[type="radio"]');
            card.classList.toggle("active", radio.checked);
        });
    }

    roleCards.forEach(function (card) {
        const radio = card.querySelector('input[type="radio"]');

        radio.addEventListener("change", updateRoleSelection);

        card.addEventListener("click", function () {
            requestAnimationFrame(updateRoleSelection);
        });
    });

    /*--- Set Initial Selected Role ---*/
    updateRoleSelection();



    /*--- Password Visibility ---*/
    const passwordEye = document.querySelector("#ttLoginPasswordToggle");
    const passwordField = document.querySelector("#ttLoginPassword");

    if (passwordEye && passwordField) {
        passwordEye.addEventListener("click", function () {
            const visible = passwordField.type === "password";

            passwordField.type = visible ? "text" : "password";

            passwordEye.innerHTML = visible
                ? '<i class="bi bi-eye-slash"></i>'
                : '<i class="bi bi-eye"></i>';

            passwordEye.setAttribute("aria-label", visible ? "Hide password" : "Show password");
        });
    }


    /*--- Clear Previous Errors ---*/
    function clearErrors() {
        document.querySelectorAll(".tt-login-field").forEach(function (field) {
            field.classList.remove("has-error");
        });
        document.querySelectorAll(".tt-login-error").forEach(function (error) {
            error.textContent = "";
        });
    }

    /*--- Login Validation and Submission ---*/
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        clearErrors();

        if (!loginForm.checkValidity()) {
            loginForm.reportValidity();
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const selectedRole = loginForm.querySelector('input[name="accountType"]:checked');

        if (!selectedRole || !email || !password) {
            loginForm.reportValidity();
            return;
        }

        const role = selectedRole.value;
        const rememberMe = rememberInput.checked;

        /*--- Store Account Information ---*/
        const accountData = {
            email: email,
            role: role
        };

        /*--- Clear Old Session Data ---*/
        localStorage.removeItem("ttUserEmail");
        localStorage.removeItem("ttUserRole");
        sessionStorage.removeItem("ttUserEmail");
        sessionStorage.removeItem("ttUserRole");

        /*--- Save Based on Remember Me ---*/
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("ttUserEmail", accountData.email);
        storage.setItem("ttUserRole", accountData.role);

        /*--- Redirect Based on Account Type ---*/
        if (role === "admin") {
            window.location.href = "admin-dashboard.html";
        } else {
            window.location.href = "client-dashboard.html";
        }
    });

    /*--- Email Input Cleanup ---*/
    emailInput.addEventListener("input", function () {
        emailInput.value = emailInput.value.trimStart();
    });
})();



/*--- Register Page ---*/
(function() {
    const registerForm = document.getElementById("ttRegisterForm");
    if (!registerForm) return;

    const nameInput = document.getElementById("ttRegisterName");
    const phoneInput = document.getElementById("ttRegisterPhone");
    const emailInput = document.getElementById("ttRegisterEmail");
    const passwordInput = document.getElementById("ttRegisterPassword");
    const confirmInput = document.getElementById("ttRegisterConfirmPassword");

    const roleCards = registerForm.querySelectorAll(".tt-login-role-card");

    /*--- Account Type Selection ---*/
    function updateRoleSelection() {
        roleCards.forEach(function(card) {
            const radio = card.querySelector('input[type="radio"]');
            card.classList.toggle("active", radio.checked);
        });
    }

    roleCards.forEach(function(card) {
        const radio = card.querySelector('input[type="radio"]');
        radio.addEventListener("change", updateRoleSelection);
        card.addEventListener("click", function() {
            requestAnimationFrame(updateRoleSelection);
        });
    });

    updateRoleSelection();

    /*--- Full Name Validation ---*/
    nameInput.addEventListener("input", function() {
        this.value = this.value.replace(/[^A-Za-z ]/g, "").replace(/\s{2,}/g, " ");
    });

    /*--- Phone Number Validation ---*/
    phoneInput.addEventListener("input", function() {
        this.value = this.value.replace(/\D/g, "").slice(0, 10);
    });

    /*--- Email Input Cleanup ---*/
    emailInput.addEventListener("input", function() {
        this.value = this.value.trimStart();
    });

    /*--- Password Eye Toggle ---*/
    function setupPasswordToggle(inputId, buttonId, showLabel, hideLabel) {
        const input = document.getElementById(inputId);
        const button = document.getElementById(buttonId);

        if (!input || !button) return;

        button.addEventListener("click", function() {
            const showPassword = input.type === "password";
            input.type = showPassword ? "text" : "password";

            button.innerHTML = showPassword
                ? '<i class="bi bi-eye-slash"></i>'
                : '<i class="bi bi-eye"></i>';

            button.setAttribute("aria-label", showPassword ? hideLabel : showLabel);
            button.setAttribute("aria-pressed", String(showPassword));
        });
    }

    setupPasswordToggle("ttRegisterPassword", "ttRegisterPasswordToggle", "Show password", "Hide password");
    setupPasswordToggle("ttRegisterConfirmPassword", "ttRegisterConfirmToggle", "Show confirm password", "Hide confirm password");

    /*--- Confirm Password Validation ---*/
    function validateConfirmPassword() {
        if (confirmInput.value && confirmInput.value !== passwordInput.value) {
            confirmInput.setCustomValidity("Passwords do not match.");
        } else {
            confirmInput.setCustomValidity("");
        }
    }

    passwordInput.addEventListener("input", validateConfirmPassword);
    confirmInput.addEventListener("input", validateConfirmPassword);

    /*--- Registration Submission ---*/
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        validateConfirmPassword();

        if (!registerForm.checkValidity()) {
            registerForm.reportValidity();
            return;
        }

        const selectedRole = registerForm.querySelector('input[name="accountType"]:checked');

        if (!selectedRole) {
            registerForm.reportValidity();
            return;
        }

        const profileData = {
            name: nameInput.value.trim(),
            phone: phoneInput.value,
            email: emailInput.value.trim(),
            role: selectedRole.value
        };

        /*--- Store Profile Information ---*/
        localStorage.setItem("ttProfileName", profileData.name);
        localStorage.setItem("ttProfilePhone", profileData.phone);
        localStorage.setItem("ttProfileEmail", profileData.email);
        localStorage.setItem("ttProfileRole", profileData.role);

        /*--- Clear Old Login Session ---*/
        localStorage.removeItem("ttUserEmail");
        localStorage.removeItem("ttUserRole");
        sessionStorage.removeItem("ttUserEmail");
        sessionStorage.removeItem("ttUserRole");

        /*--- Redirect to Login ---*/
        window.location.href = "login.html";
    });
})();

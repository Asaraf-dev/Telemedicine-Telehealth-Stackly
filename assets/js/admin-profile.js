
/*--- Admin Profile ---*/
(function () {
    const profileName = document.getElementById("ttAdminProfileName");
    if (!profileName) return;

    /*--- Read Stored Data ---*/
    function getStoredValue(key) {
        return localStorage.getItem(key) || sessionStorage.getItem(key) || "";
    }

    const registeredName = getStoredValue("ttProfileName");
    const registeredPhone = getStoredValue("ttProfilePhone");
    const registeredEmail = getStoredValue("ttProfileEmail");
    const registeredRole = getStoredValue("ttProfileRole");

    /*--- Read Current Login Data ---*/
    const loginEmail = getStoredValue("ttUserEmail");
    const loginRole = getStoredValue("ttUserRole");

    /*--- Display Profile Information ---*/
    profileName.textContent = registeredName || "Admin User";
    document.getElementById("ttAdminProfileLoginEmail").textContent = loginEmail || "Not available";
    document.getElementById("ttAdminProfileFullName").textContent = registeredName || "Not available";
    document.getElementById("ttAdminProfilePhone").textContent = registeredPhone || "Not available";
    document.getElementById("ttAdminProfileRegisteredEmail").textContent = registeredEmail || "Not available";
    document.getElementById("ttAdminProfileAccountEmail").textContent = loginEmail || "Not available";

    /*--- Display Account Role ---*/
    const role = loginRole || registeredRole || "admin";
    const formattedRole = role.charAt(0).toUpperCase() + role.slice(1);

    document.getElementById("ttAdminProfileRole").textContent = formattedRole;
    document.getElementById("ttAdminProfileAccountRole").textContent = formattedRole;

    /*--- Profile Fallback ---*/
    if (!registeredName) {
        profileName.textContent = "Admin User";
    }
})();

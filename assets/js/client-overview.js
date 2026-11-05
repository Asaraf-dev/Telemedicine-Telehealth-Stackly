
/*--- Client Overview ---*/
(function () {
    const overviewName = document.getElementById("ttClientOverviewName");
    if (!overviewName) return;

    /*--- Read Stored Data ---*/
    function getStoredValue(key) {
        return localStorage.getItem(key) || sessionStorage.getItem(key) || "";
    }

    /*--- Profile Information ---*/
    const profileName = getStoredValue("ttProfileName");
    const profilePhone = getStoredValue("ttProfilePhone");
    const profileRole = getStoredValue("ttProfileRole");

    /*--- Current Login Information ---*/
    const loginEmail = getStoredValue("ttUserEmail");
    const loginRole = getStoredValue("ttUserRole");

    /*--- Display Client Information ---*/
    overviewName.textContent = profileName || "Client User";
    document.getElementById("ttClientOverviewEmail").textContent = loginEmail || "Not available";
    document.getElementById("ttClientOverviewPhone").textContent = profilePhone || "Not available";

    /*--- Display Account Role ---*/
    const role = loginRole || profileRole || "client";
    const formattedRole = role.charAt(0).toUpperCase() + role.slice(1);

    document.getElementById("ttClientOverviewRole").textContent = formattedRole;
})();


/*--- Dashboard Layout ---*/
(function() {
    const layout = document.getElementById("ttDashboardLayout");
    if (!layout) return;

    const sidebar = document.getElementById("ttDashboardSidebar");
    const overlay = document.getElementById("ttDashboardOverlay");
    const menuToggle = document.getElementById("ttDashboardMenuToggle");
    const closeButton = document.getElementById("ttDashboardSidebarClose");
    const logoutButton = document.getElementById("ttDashboardLogout");

    /*--- Read Stored User Information ---*/
    function getStoredValue(key) {
        return localStorage.getItem(key) || sessionStorage.getItem(key) || "";
    }

    const email = getStoredValue("ttUserEmail");
    const loginRole = getStoredValue("ttUserRole");
    const profileName = getStoredValue("ttProfileName");
    const profileEmail = getStoredValue("ttProfileEmail");
    const profilePhone = getStoredValue("ttProfilePhone");

    const dashboardRole = layout.dataset.dashboardRole || "admin";
    const dashboardTitle = layout.dataset.dashboardTitle || "Dashboard";

    /*--- Verify Login ---*/
    if (!email || !loginRole) {
        window.location.replace("login.html");
        return;
    }

    /*--- Verify Dashboard Role ---*/
    if (loginRole !== dashboardRole) {
        window.location.replace(loginRole === "admin" ? "admin-dashboard.html" : "client-dashboard.html");
        return;
    }

    /*--- Display Dashboard Information ---*/
    const pageTitle = document.getElementById("ttDashboardPageTitle");
    const topbarEmail = document.getElementById("ttTopbarUserEmail");
    const sidebarEmail = document.getElementById("ttSidebarUserEmail");
    const sidebarName = document.getElementById("ttSidebarUserName");
    const welcomeName = document.getElementById("ttDashboardWelcomeName");
    const dateElement = document.getElementById("ttDashboardDate");

    if (pageTitle) pageTitle.textContent = dashboardTitle;
    if (topbarEmail) topbarEmail.textContent = email;
    if (sidebarEmail) sidebarEmail.textContent = email;
    if (sidebarName) sidebarName.textContent = profileName || "Stackly User";
    if (welcomeName) welcomeName.textContent = profileName || "User";

    /*--- Display Current Date ---*/
    if (dateElement) {
        dateElement.textContent = new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    }

    /*--- Open Sidebar ---*/
    function openSidebar() {
        layout.classList.add("sidebar-open");
        menuToggle.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
        closeButton.focus();
    }

    /*--- Close Sidebar ---*/
    function closeSidebar() {
        layout.classList.remove("sidebar-open");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", function() {
            if (layout.classList.contains("sidebar-open")) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (closeButton) closeButton.addEventListener("click", closeSidebar);
    if (overlay) overlay.addEventListener("click", closeSidebar);

    /*--- Close Sidebar With Escape ---*/
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") closeSidebar();
    });

    /*--- Close Sidebar After Navigation ---*/
    sidebar.querySelectorAll(".tt-dashboard-nav-link").forEach(function(link) {
        link.addEventListener("click", closeSidebar);
    });

    /*--- Active Navigation Link ---*/
    const currentPage = window.location.pathname.split("/").pop().toLowerCase();

    sidebar.querySelectorAll(".tt-dashboard-nav-link").forEach(function(link) {
        const linkPage = link.getAttribute("href").split("/").pop().toLowerCase();
        const isCurrent = linkPage === currentPage;

        link.classList.toggle("active", isCurrent);

        if (isCurrent) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    /*--- Logout ---*/
    if (logoutButton) {
        logoutButton.addEventListener("click", function() {
            localStorage.removeItem("ttUserEmail");
            localStorage.removeItem("ttUserRole");
            sessionStorage.removeItem("ttUserEmail");
            sessionStorage.removeItem("ttUserRole");
            window.location.replace("login.html");
        });
    }

    /*--- Reset Sidebar When Returning To Desktop ---*/
    window.addEventListener("resize", function() {
        if (window.innerWidth > 1050) closeSidebar();
    });
})();

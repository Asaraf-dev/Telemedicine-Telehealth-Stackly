
/*--- Navbar ---*/
(function() {
    /*--- Navbar Elements ---*/
    const navbar = document.querySelector(".tt-com-navbar");
    const mobileOffcanvas = document.getElementById("ttNavbarOffcanvas");
    if (!navbar) return;

    /*--- Active Navigation ---*/
    const navLinks = document.querySelectorAll(".tt-com-navbar-link, .tt-com-navbar-mobile-link");
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    navLinks.forEach(function(link) {
        const linkPage = link.getAttribute("href").split("/").pop();
        const isActive = linkPage === currentPage;
        link.classList.toggle("active", isActive);
        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    /*--- Navbar Scroll Effect ---*/
    function updateNavbar() {
        navbar.classList.toggle("tt-com-navbar-scrolled", window.scrollY > 30);
    }
    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    /*--- Mobile Offcanvas Handling ---*/
    if (mobileOffcanvas) {
        const mobileLinks = mobileOffcanvas.querySelectorAll("a");
        mobileLinks.forEach(function(link) {
            link.addEventListener("click", function() {
                if (window.bootstrap && window.bootstrap.Offcanvas) {
                    const instance = window.bootstrap.Offcanvas.getInstance(mobileOffcanvas);
                    if (instance) instance.hide();
                }
            });
        });

        mobileOffcanvas.addEventListener("hidden.bs.offcanvas", function() {
            const toggle = document.querySelector('[data-bs-target="#ttNavbarOffcanvas"]');
            if (toggle) toggle.focus();
        });
    }

    /*--- Navbar Resize Handling ---*/
    window.addEventListener("resize", function() {
        if (window.innerWidth > 991 && mobileOffcanvas && window.bootstrap && window.bootstrap.Offcanvas) {
            const instance = window.bootstrap.Offcanvas.getInstance(mobileOffcanvas);
            if (instance) instance.hide();
        }
    });
})();

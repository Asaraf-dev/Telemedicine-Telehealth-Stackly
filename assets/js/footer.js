
/*--- Footer ---*/
(function() {
    /*--- Dynamic Copyright Year ---*/
    const footerYear = document.getElementById("ttFooterYear");
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    /*--- Back To Top ---*/
    const backTopBtn = document.getElementById("ttFooterBackTop");
    if (backTopBtn) {
        backTopBtn.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /*--- Footer Scroll Animation ---*/
    const footerElements = document.querySelectorAll(".tt-com-footer-brand, .tt-com-footer-column, .tt-com-footer-highlight");
    if ("IntersectionObserver" in window) {
        const footerObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("tt-com-footer-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });
        footerElements.forEach(function(element) {
            footerObserver.observe(element);
        });
    } else {
        footerElements.forEach(function(element) {
            element.classList.add("tt-com-footer-visible");
        });
    }
})();

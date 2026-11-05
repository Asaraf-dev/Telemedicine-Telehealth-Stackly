/*--- Hero Section Start ---*/
(function() {
    const heroElements = document.querySelectorAll(".tt-home-hero-content,.tt-home-hero-visual,.tt-home-hero-features");
    if (!("IntersectionObserver" in window)) {
        heroElements.forEach(function(element) {
            element.classList.add("tt-home-hero-visible");
        });
        return;
    }
    const heroObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("tt-home-hero-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    heroElements.forEach(function(element) {
        heroObserver.observe(element);
    });
})();
/*--- Hero Section End ---*/

/*--- Specialties Section Start ---*/
const ssIndBlogReadButtons = document.querySelectorAll(".tt-home-specialty-link");
    if (ssIndBlogReadButtons.length) {
        ssIndBlogReadButtons.forEach(function (ssButton) {
            ssButton.addEventListener("click", function (ssEvent) {
                ssEvent.preventDefault();
                ssEvent.stopPropagation();
                window.location.href = "404.html";
            });
        });
    }
/*--- Specialties Section End ---*/

/*--- Patient Testimonials Section Start ---*/
/*--- Patient Testimonials Section End ---*/
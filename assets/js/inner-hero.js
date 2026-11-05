
/*--- Inner Page Hero Configuration ---*/
(function() {
    const hero = document.getElementById("ttInnerHero");
    if (!hero) return;

    /*--- Page Configuration ---*/
    const heroPages = {
        about: {
            eyebrow: "GET TO KNOW STACKLY",
            title: "Healthcare With a More <span>Human Touch.</span>",
            description: "Discover Stackly and our vision for making digital healthcare experiences simpler, more accessible and patient-focused.",
            breadcrumb: "About Us",
            button: "Explore Our Services",
            buttonLink: "404.html",
            visualIcon: "bi bi-heart-pulse",
            visualLabel: "OUR VISION",
            visualTitle: "Care Without Complexity",
            floatIconOne: "bi bi-heart",
            floatLabelOne: "OUR APPROACH",
            floatTextOne: "Patient Focused",
            floatIconTwo: "bi bi-lightbulb",
            floatLabelTwo: "OUR MISSION",
            floatTextTwo: "Simpler Healthcare"
        },
        services: {
            eyebrow: "EXPLORE WHAT WE OFFER",
            title: "Digital Healthcare <span>Made Simpler.</span>",
            description: "Explore digital healthcare features designed to help you discover professionals, navigate services and manage your healthcare journey.",
            breadcrumb: "Our Services",
            button: "Explore Services",
            buttonLink: "404.html",
            visualIcon: "bi bi-grid",
            visualLabel: "OUR SERVICES",
            visualTitle: "Healthcare Solutions",
            floatIconOne: "bi bi-laptop",
            floatLabelOne: "DIGITAL EXPERIENCE",
            floatTextOne: "Simple & Accessible",
            floatIconTwo: "bi bi-person-check",
            floatLabelTwo: "CARE DISCOVERY",
            floatTextTwo: "Explore Professionals"
        },
        doctors: {
            eyebrow: "MEET THE PROFESSIONALS",
            title: "Discover the Right <span>Healthcare Experts.</span>",
            description: "Explore healthcare professional profiles, discover medical specialties and find information to help guide your next step.",
            breadcrumb: "Our Doctors",
            button: "Explore Doctors",
            buttonLink: "404.html",
            visualIcon: "bi bi-person-heart",
            visualLabel: "DOCTOR DISCOVERY",
            visualTitle: "Healthcare Professionals",
            floatIconOne: "bi bi-clipboard2-pulse",
            floatLabelOne: "SPECIALTIES",
            floatTextOne: "Explore Expertise",
            floatIconTwo: "bi bi-search",
            floatLabelTwo: "FIND A PROFESSIONAL",
            floatTextTwo: "Discover Doctors"
        },
        contact: {
            eyebrow: "WE ARE HERE TO HELP",
            title: "Let's Start a <span>Conversation.</span>",
            description: "Have a question or need assistance? Get in touch with the Stackly team. We'd be happy to hear from you.",
            breadcrumb: "Contact Us",
            button: "Send an Enquiry",
            buttonLink: "404.html",
            visualIcon: "bi bi-chat-heart",
            visualLabel: "LET'S CONNECT",
            visualTitle: "We're Listening",
            floatIconOne: "bi bi-envelope",
            floatLabelOne: "GET IN TOUCH",
            floatTextOne: "Send Us a Message",
            floatIconTwo: "bi bi-headset",
            floatLabelTwo: "NEED ASSISTANCE",
            floatTextTwo: "We're Here to Help"
        }
    };

    /*--- Detect Current Page ---*/
    function getCurrentPage() {
        const requestedPage = hero.dataset.page;
        if (requestedPage && requestedPage !== "auto") return requestedPage;

        const pageName = window.location.pathname.split("/").pop().toLowerCase();
        const pageKey = pageName.replace(".html", "").replace(/[^a-z0-9-]/g, "");

        return pageKey;
    }

    /*--- Set Hero Content ---*/
    function setText(id, value) {
        const element = document.getElementById(id);
        if (element && value !== undefined) element.textContent = value;
    }

    function setIcon(id, value) {
        const element = document.getElementById(id);
        if (element && value) element.className = value;
    }

    function renderHero(page) {
        const content = heroPages[page] || heroPages.about;

        setText("ttInnerHeroEyebrow", content.eyebrow);

        const title = document.getElementById("ttInnerHeroTitle");
        if (title) title.innerHTML = content.title;

        setText("ttInnerHeroDescription", content.description);
        setText("ttInnerHeroBreadcrumb", content.breadcrumb);
        setText("ttInnerHeroButtonText", content.button);

        const button = document.getElementById("ttInnerHeroButton");
        if (button) button.href = content.buttonLink;

        setIcon("ttInnerHeroVisualIcon", content.visualIcon);
        setText("ttInnerHeroVisualLabel", content.visualLabel);
        setText("ttInnerHeroVisualTitle", content.visualTitle);

        setIcon("ttInnerHeroFloatIconOne", content.floatIconOne);
        setText("ttInnerHeroFloatLabelOne", content.floatLabelOne);
        setText("ttInnerHeroFloatTextOne", content.floatTextOne);

        setIcon("ttInnerHeroFloatIconTwo", content.floatIconTwo);
        setText("ttInnerHeroFloatLabelTwo", content.floatLabelTwo);
        setText("ttInnerHeroFloatTextTwo", content.floatTextTwo);

        /*--- Contact Page Secondary Button ---*/
        const secondaryButton = hero.querySelector(".tt-com-inner-hero-secondary");
        if (secondaryButton && page === "contact") {
            secondaryButton.href = "index.html";
            secondaryButton.querySelector("span").textContent = "Back to Home";
            secondaryButton.querySelector("i").className = "bi bi-house-door";
        }

        hero.dataset.activePage = page;
        hero.classList.add("tt-com-inner-hero-ready");
    }

    /*--- Initialize Hero ---*/
    renderHero(getCurrentPage());
})();

/*--- Stackly Page Loader ---*/
(function() {
    /*--- Loader Elements ---*/
    const ttLdrLoader = document.getElementById("ttLdrLoader");
    const ttLdrMessage = document.getElementById("ttLdrMessage");
    if (!ttLdrLoader) return;

    let ttLdrMessageInterval = null;
    let ttLdrHideTimeout = null;
    let ttLdrExitTimeout = null;
    let ttLdrMessageIndex = 0;
    let ttLdrStartTime = Date.now();

    /*--- Loader Messages ---*/
    const ttLdrMessages = [
        "Preparing your healthcare experience...",
        "Getting everything ready for you...",
        "Connecting care with convenience...",
        "Making your experience seamless...",
        "Your healthcare journey starts here..."
    ];

    /*--- Show Loader ---*/
    function ttLdrShowLoader() {
        clearTimeout(ttLdrHideTimeout);
        clearTimeout(ttLdrExitTimeout);
        clearInterval(ttLdrMessageInterval);

        ttLdrStartTime = Date.now();
        ttLdrMessageIndex = 0;
        ttLdrLoader.classList.remove("tt-ldr-hidden");
        ttLdrLoader.style.display = "flex";

        if (ttLdrMessage) {
            ttLdrMessage.textContent = ttLdrMessages[0];
            ttLdrMessage.style.opacity = "1";
            ttLdrMessage.style.transform = "translateY(0)";
        }

        /*--- Rotate Messages ---*/
        ttLdrMessageInterval = setInterval(function() {
            ttLdrMessageIndex = (ttLdrMessageIndex + 1) % ttLdrMessages.length;

            if (!ttLdrMessage) return;

            ttLdrMessage.style.opacity = "0";
            ttLdrMessage.style.transform = "translateY(5px)";

            setTimeout(function() {
                if (!ttLdrMessage) return;
                ttLdrMessage.textContent = ttLdrMessages[ttLdrMessageIndex];
                ttLdrMessage.style.opacity = "1";
                ttLdrMessage.style.transform = "translateY(0)";
            }, 250);
        }, 1500);
    }

    /*--- Hide Loader ---*/
    function ttLdrHideLoader() {
        clearTimeout(ttLdrHideTimeout);

        const ttLdrMinimumTime = 900;
        const ttLdrElapsedTime = Date.now() - ttLdrStartTime;
        const ttLdrRemainingTime = Math.max(0, ttLdrMinimumTime - ttLdrElapsedTime);

        ttLdrHideTimeout = setTimeout(function() {
            clearInterval(ttLdrMessageInterval);
            ttLdrLoader.classList.add("tt-ldr-hidden");

            ttLdrExitTimeout = setTimeout(function() {
                ttLdrLoader.style.display = "none";
            }, 700);
        }, ttLdrRemainingTime);
    }

    /*--- Initial Loader ---*/
    ttLdrShowLoader();

    /*--- Page Loaded ---*/
    if (document.readyState === "complete") {
        ttLdrHideLoader();
    } else {
        window.addEventListener("load", ttLdrHideLoader, { once: true });
    }

    /*--- Browser Back And Forward ---*/
    window.addEventListener("pageshow", function(event) {
        if (event.persisted) {
            ttLdrShowLoader();
            ttLdrHideLoader();
        }
    });
})();
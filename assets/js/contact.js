/*--- Send Us a Message Section Start ---*/
(function() {
    const form = document.getElementById("ttContactForm");
    const popup = document.getElementById("ttContactPopup");

    if (!form || !popup) return;

    const nameInput = document.getElementById("ttContactName");
    const phoneInput = document.getElementById("ttContactPhone");
    const closeButton = document.getElementById("ttContactPopupClose");
    const okButton = document.getElementById("ttContactPopupOk");
    const overlay = popup.querySelector(".tt-contact-popup-overlay");

    /*--- Name: Allow Alphabets and Spaces Only ---*/
    nameInput.addEventListener("input", function() {
        this.value = this.value.replace(/[^a-zA-Z ]/g, "");
    });

    /*--- Phone: Allow Exactly 10 Digits ---*/
    phoneInput.addEventListener("input", function() {
        this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
    });

    /*--- Open Success Popup ---*/
    function openPopup() {
        popup.classList.add("is-active");
        popup.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        okButton.focus();
    }

    /*--- Close Success Popup ---*/
    function closePopup() {
        popup.classList.remove("is-active");
        popup.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        form.reset();
        form.querySelector("input").focus();
    }

    /*--- Form Submission ---*/
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        /*--- Browser Native Validation ---*/
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        openPopup();
    });

    /*--- Popup Events ---*/
    closeButton.addEventListener("click", closePopup);
    okButton.addEventListener("click", closePopup);
    overlay.addEventListener("click", closePopup);

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && popup.classList.contains("is-active")) {
            closePopup();
        }
    });
})();
/*--- Send Us a Message Section End ---*/
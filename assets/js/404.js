/*--- 404 Page ---*/
(function() {
    /*--- Current Year ---*/
    const tt404Year = document.getElementById("tt404Year");
    if (tt404Year) {
        tt404Year.textContent = new Date().getFullYear();
    }

    /*--- Go Back Button ---*/
    const tt404GoBack = document.getElementById("tt404GoBack");
    if (tt404GoBack) {
        tt404GoBack.addEventListener("click", function() {
            if (window.history.length > 1 && document.referrer) {
                window.history.back();
            } else {
                window.location.href = "index.html";
            }
        });
    }
})();

/*--- Components Loader ---*/
document.addEventListener("DOMContentLoaded", async function () {
    /*--- Component Configuration ---*/
    const components = [
        {
            selector: "#navbar",
            file: "assets/components/navbar.html",
            script: "assets/js/navbar.js"
        },
        {
            selector: "#footer",
            file: "assets/components/footer.html",
            script: "assets/js/footer.js"
        },
        { 
            selector: "#innerHeroContainer",
             file: "assets/components/inner-hero.html",
              script: "assets/js/inner-hero.js" 
            }
    ];
    /*--- Load Component Script ---*/
    function loadScript(src) {
        return new Promise(function (resolve, reject) {
            const existingScript = document.querySelector('script[data-component-script="' + src + '"]');
            if (existingScript) {
                resolve();
                return;
            }
            const script = document.createElement("script");
            script.src = src;
            script.dataset.componentScript = src;
            script.onload = resolve;
            script.onerror = function () {
                reject(new Error("Failed to load script: " + src));
            };
            document.body.appendChild(script);
        });
    }
    /*--- Load HTML Component ---*/
    async function loadComponent(component) {
        const container = document.querySelector(component.selector);
        if (!container) {
            return;
        }
        try {
            const response = await fetch(component.file);
            if (!response.ok) {
                throw new Error("HTTP Error: " + response.status);
            }
            const html = await response.text();
            container.innerHTML = html;
            container.dispatchEvent(new CustomEvent("componentLoaded", {
                bubbles: true,
                detail: {
                    component: component.selector
                }
            }));
            /*--- Initialize Component Script ---*/
            if (component.script) {
                await loadScript(component.script);
            }
        } catch (error) {
            console.error("Component loading error:", component.file, error);
        }
    }
    /*--- Load All Components ---*/
    await Promise.all(components.map(function (component) {
        return loadComponent(component);
    }));
    /*--- Components Loaded Event ---*/
    document.dispatchEvent(new CustomEvent("componentsLoaded"));
});

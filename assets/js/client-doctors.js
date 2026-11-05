
/*--- Client Doctors Directory ---*/
(function () {
    const grid = document.getElementById("ttClientDoctorsGrid");
    if (!grid) return;

    const searchInput = document.getElementById("ttClientDoctorSearch");
    const specialtyFilter = document.getElementById("ttClientDoctorSpecialty");
    const availabilityFilter = document.getElementById("ttClientDoctorAvailability");
    const typeFilter = document.getElementById("ttClientDoctorType");
    const sortSelect = document.getElementById("ttClientDoctorSort");
    const resetButton = document.getElementById("ttClientDoctorReset");
    const emptyResetButton = document.getElementById("ttClientDoctorEmptyReset");
    const emptyState = document.getElementById("ttClientDoctorsEmpty");
    const resultCount = document.getElementById("ttClientDoctorResultCount");
    const pageInfo = document.getElementById("ttClientDoctorPageInfo");
    const previousButton = document.getElementById("ttClientDoctorPrev");
    const nextButton = document.getElementById("ttClientDoctorNext");

    const originalCards = Array.from(grid.querySelectorAll(".tt-client-doctor-card"));
    const pageSize = 6;
    let currentPage = 1;
    let filteredCards = [...originalCards];

    /*--- Filter and Sort Doctors ---*/
    function filterDoctors() {
        const search = searchInput.value.trim().toLowerCase();
        const specialty = specialtyFilter.value;
        const availability = availabilityFilter.value;
        const consultationType = typeFilter.value;

        filteredCards = originalCards.filter(card => {
            const name = card.dataset.name.toLowerCase();
            const doctorId = card.dataset.id.toLowerCase();
            const cardSpecialty = card.dataset.specialty;
            const cardAvailability = card.dataset.availability;
            const cardTypes = card.dataset.type.split(" ");

            const matchesSearch = name.includes(search) || doctorId.includes(search);
            const matchesSpecialty = !specialty || cardSpecialty === specialty;
            const matchesAvailability = !availability || cardAvailability === availability;
            const matchesType = !consultationType || cardTypes.includes(consultationType);

            return matchesSearch && matchesSpecialty && matchesAvailability && matchesType;
        });

        /*--- Sorting ---*/
        switch (sortSelect.value) {
            case "name-asc":
                filteredCards.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
                break;
            case "name-desc":
                filteredCards.sort((a, b) => b.dataset.name.localeCompare(a.dataset.name));
                break;
            case "experience":
                filteredCards.sort((a, b) => Number(b.dataset.experience) - Number(a.dataset.experience));
                break;
            default:
                filteredCards.sort((a, b) => originalCards.indexOf(a) - originalCards.indexOf(b));
        }

        currentPage = 1;
        renderDoctors();
    }

    /*--- Render Doctors ---*/
    function renderDoctors() {
        const totalDoctors = filteredCards.length;
        const totalPages = Math.ceil(totalDoctors / pageSize);
        const startIndex = (currentPage - 1) * pageSize;
        const visibleCards = filteredCards.slice(startIndex, startIndex + pageSize);

        grid.innerHTML = "";

        visibleCards.forEach(card => {
            grid.appendChild(card);
        });

        originalCards.forEach(card => {
            if (!visibleCards.includes(card)) card.remove();
        });

        emptyState.hidden = totalDoctors !== 0;
        grid.hidden = totalDoctors === 0;

        resultCount.textContent = totalDoctors
            ? `Showing ${startIndex + 1}-${Math.min(startIndex + pageSize, totalDoctors)} of ${totalDoctors} doctors`
            : "Showing 0 doctors";

        pageInfo.textContent = totalPages ? `${currentPage} / ${totalPages}` : "0 / 0";

        previousButton.disabled = currentPage <= 1;
        nextButton.disabled = currentPage >= totalPages || totalPages === 0;
    }

    /*--- Reset Filters ---*/
    function resetFilters() {
        searchInput.value = "";
        specialtyFilter.value = "";
        availabilityFilter.value = "";
        typeFilter.value = "";
        sortSelect.value = "default";
        filteredCards = [...originalCards];
        currentPage = 1;
        renderDoctors();
    }

    /*--- Search and Filter Events ---*/
    searchInput.addEventListener("input", filterDoctors);
    specialtyFilter.addEventListener("change", filterDoctors);
    availabilityFilter.addEventListener("change", filterDoctors);
    typeFilter.addEventListener("change", filterDoctors);
    sortSelect.addEventListener("change", filterDoctors);

    resetButton.addEventListener("click", resetFilters);
    emptyResetButton.addEventListener("click", resetFilters);

    /*--- Pagination Events ---*/
    previousButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            renderDoctors();
        }
    });

    nextButton.addEventListener("click", function () {
        const totalPages = Math.ceil(filteredCards.length / pageSize);
        if (currentPage < totalPages) {
            currentPage++;
            renderDoctors();
        }
    });

    /*--- Initial Render ---*/
    renderDoctors();
})();

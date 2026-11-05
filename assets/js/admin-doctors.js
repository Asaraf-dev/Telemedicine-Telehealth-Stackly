
/*--- Admin Doctors ---*/
(function () {
    "use strict";

    const searchInput = document.querySelector("#ttDoctorSearch");
    const specialtyFilter = document.querySelector("#ttDoctorSpecialtyFilter");
    const availabilityFilter = document.querySelector("#ttDoctorAvailabilityFilter");
    const resetButton = document.querySelector("#ttDoctorReset");
    const tableBody = document.querySelector("#ttDoctorTableBody");
    const emptyState = document.querySelector("#ttDoctorEmpty");
    const resultCount = document.querySelector("#ttDoctorResultCount");
    const pageInfo = document.querySelector("#ttDoctorPageInfo");
    const prevButton = document.querySelector("#ttDoctorPrev");
    const nextButton = document.querySelector("#ttDoctorNext");

    if (!tableBody) return;

    const rows = Array.from(tableBody.querySelectorAll("tr"));
    const pageSize = 5;
    let currentPage = 1;
    let filteredRows = [...rows];

    /*--- Filter Doctors ---*/
    function filterDoctors() {
        const searchValue = searchInput.value.trim().toLowerCase();
        const selectedSpecialty = specialtyFilter.value;
        const selectedAvailability = availabilityFilter.value;

        filteredRows = rows.filter(function (row) {
            const rowText = row.textContent.toLowerCase();
            const specialty = row.dataset.specialty;
            const availability = row.dataset.availability;

            const matchesSearch = rowText.includes(searchValue);
            const matchesSpecialty = selectedSpecialty === "all" || specialty === selectedSpecialty;
            const matchesAvailability = selectedAvailability === "all" || availability === selectedAvailability;

            return matchesSearch && matchesSpecialty && matchesAvailability;
        });

        currentPage = 1;
        renderDoctors();
    }

    /*--- Render Doctors ---*/
    function renderDoctors() {
        const totalRows = filteredRows.length;
        const totalPages = Math.ceil(totalRows / pageSize);
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        rows.forEach(function (row) {
            row.hidden = true;
        });

        filteredRows.slice(startIndex, endIndex).forEach(function (row) {
            row.hidden = false;
        });

        emptyState.hidden = totalRows !== 0;

        resultCount.textContent = totalRows === 0
            ? "No doctors found"
            : `Showing ${startIndex + 1}-${Math.min(endIndex, totalRows)} of ${totalRows} doctors`;

        pageInfo.textContent = `${totalPages === 0 ? 0 : currentPage} / ${totalPages}`;

        prevButton.disabled = currentPage <= 1;
        nextButton.disabled = currentPage >= totalPages;
    }

    /*--- Search and Filter Events ---*/
    searchInput.addEventListener("input", filterDoctors);
    specialtyFilter.addEventListener("change", filterDoctors);
    availabilityFilter.addEventListener("change", filterDoctors);

    /*--- Reset Filters ---*/
    resetButton.addEventListener("click", function () {
        searchInput.value = "";
        specialtyFilter.value = "all";
        availabilityFilter.value = "all";
        filterDoctors();
    });

    /*--- Pagination ---*/
    prevButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            renderDoctors();
        }
    });

    nextButton.addEventListener("click", function () {
        const totalPages = Math.ceil(filteredRows.length / pageSize);

        if (currentPage < totalPages) {
            currentPage++;
            renderDoctors();
        }
    });

    /*--- Initial Render ---*/
    renderDoctors();

})();


/*--- Admin Appointments ---*/
(function () {
    "use strict";

    const searchInput = document.querySelector("#ttAppointmentSearch");
    const statusFilter = document.querySelector("#ttAppointmentStatusFilter");
    const typeFilter = document.querySelector("#ttAppointmentTypeFilter");
    const resetButton = document.querySelector("#ttAppointmentReset");
    const tableBody = document.querySelector("#ttAppointmentTableBody");
    const emptyState = document.querySelector("#ttAppointmentEmpty");
    const resultCount = document.querySelector("#ttAppointmentResultCount");
    const pageInfo = document.querySelector("#ttAppointmentPageInfo");
    const prevButton = document.querySelector("#ttAppointmentPrev");
    const nextButton = document.querySelector("#ttAppointmentNext");

    if (!tableBody) return;

    const rows = Array.from(tableBody.querySelectorAll("tr"));
    const pageSize = 5;
    let currentPage = 1;
    let filteredRows = [...rows];

    /*--- Filter Appointments ---*/
    function filterAppointments() {
        const searchValue = searchInput.value.trim().toLowerCase();
        const selectedStatus = statusFilter.value;
        const selectedType = typeFilter.value;

        filteredRows = rows.filter(function (row) {
            const rowText = row.textContent.toLowerCase();
            const statusElement = row.querySelector(".tt-aa-status");
            const status = statusElement
                ? statusElement.textContent.trim().toLowerCase()
                : "";

            const type = row.cells[5].textContent.trim().toLowerCase();

            const matchesSearch = rowText.includes(searchValue);
            const matchesStatus = selectedStatus === "all" || status === selectedStatus;
            const matchesType = selectedType === "all" || type === selectedType;

            return matchesSearch && matchesStatus && matchesType;
        });

        currentPage = 1;
        renderAppointments();
    }

    /*--- Render Appointments ---*/
    function renderAppointments() {
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
            ? "No appointments found"
            : `Showing ${startIndex + 1}-${Math.min(endIndex, totalRows)} of ${totalRows} appointments`;

        pageInfo.textContent = `${totalPages === 0 ? 0 : currentPage} / ${totalPages}`;

        prevButton.disabled = currentPage <= 1;
        nextButton.disabled = currentPage >= totalPages;
    }

    /*--- Search and Filter Events ---*/
    searchInput.addEventListener("input", filterAppointments);
    statusFilter.addEventListener("change", filterAppointments);
    typeFilter.addEventListener("change", filterAppointments);

    /*--- Reset Filters ---*/
    resetButton.addEventListener("click", function () {
        searchInput.value = "";
        statusFilter.value = "all";
        typeFilter.value = "all";
        filterAppointments();
    });

    /*--- Pagination ---*/
    prevButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            renderAppointments();
        }
    });

    nextButton.addEventListener("click", function () {
        const totalPages = Math.ceil(filteredRows.length / pageSize);

        if (currentPage < totalPages) {
            currentPage++;
            renderAppointments();
        }
    });

    /*--- Initial Render ---*/
    renderAppointments();

})();

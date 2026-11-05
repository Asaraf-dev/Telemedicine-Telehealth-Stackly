
/*--- Client Appointments ---*/
(function () {
    const tableBody = document.getElementById("ttClientAppointmentTableBody");
    if (!tableBody) return;

    /*--- Elements ---*/
    const searchInput = document.getElementById("ttClientAppointmentSearch");
    const statusFilter = document.getElementById("ttClientAppointmentStatus");
    const typeFilter = document.getElementById("ttClientAppointmentType");
    const resetButton = document.getElementById("ttClientAppointmentReset");
    const emptyState = document.getElementById("ttClientAppointmentEmpty");
    const resultCount = document.getElementById("ttClientAppointmentResultCount");
    const pageInfo = document.getElementById("ttClientAppointmentPageInfo");
    const prevButton = document.getElementById("ttClientAppointmentPrev");
    const nextButton = document.getElementById("ttClientAppointmentNext");

    /*--- Settings ---*/
    const rows = Array.from(tableBody.querySelectorAll("tr"));
    const pageSize = 5;
    let currentPage = 1;
    let filteredRows = [];

    /*--- Filter Appointments ---*/
    function filterAppointments() {
        const searchValue = searchInput.value.trim().toLowerCase();
        const selectedStatus = statusFilter.value;
        const selectedType = typeFilter.value;

        filteredRows = rows.filter(function (row) {
            const rowText = row.textContent.toLowerCase();
            const status = row.dataset.status;
            const type = row.dataset.type;

            const matchesSearch = rowText.includes(searchValue);
            const matchesStatus = !selectedStatus || status === selectedStatus;
            const matchesType = !selectedType || type === selectedType;

            return matchesSearch && matchesStatus && matchesType;
        });

        currentPage = 1;
        renderAppointments();
    }

    /*--- Render Appointments ---*/
    function renderAppointments() {
        const totalRows = filteredRows.length;
        const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
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
            : "Showing " + (startIndex + 1) + "-" + Math.min(endIndex, totalRows) + " of " + totalRows + " appointments";

        pageInfo.textContent = "Page " + currentPage + " of " + totalPages;

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage >= totalPages;
    }

    /*--- Search and Filter Events ---*/
    searchInput.addEventListener("input", filterAppointments);
    statusFilter.addEventListener("change", filterAppointments);
    typeFilter.addEventListener("change", filterAppointments);

    /*--- Reset Filters ---*/
    resetButton.addEventListener("click", function () {
        searchInput.value = "";
        statusFilter.value = "";
        typeFilter.value = "";
        filterAppointments();
    });

    /*--- Previous Page ---*/
    prevButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            renderAppointments();
        }
    });

    /*--- Next Page ---*/
    nextButton.addEventListener("click", function () {
        const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));

        if (currentPage < totalPages) {
            currentPage++;
            renderAppointments();
        }
    });

    /*--- Initial Render ---*/
    filterAppointments();
})();

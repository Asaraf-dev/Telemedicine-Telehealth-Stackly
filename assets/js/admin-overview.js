
/*--- Admin Overview ---*/
(function () {
    "use strict";

    const periodSelect = document.querySelector("#ttOverviewPeriod");
    const chartContainer = document.querySelector("#ttOverviewBarChart");
    const chartTotal = document.querySelector("#ttOverviewChartTotal");

    if (!periodSelect || !chartContainer || !chartTotal) return;

    const chartData = {
        week: {
            total: 186,
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            values: [48, 70, 56, 88, 64, 95, 38]
        },
        month: {
            total: 824,
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            values: [62, 85, 72, 96]
        }
    };

    /*--- Render Activity Chart ---*/
    function renderChart(period) {
        const data = chartData[period];
        if (!data) return;

        chartTotal.textContent = data.total.toLocaleString("en-IN");

        chartContainer.innerHTML = data.labels.map(function (label, index) {
            return `
                <div class="tt-admin-overview-chart-column">
                    <div class="tt-admin-overview-bar-track">
                        <span style="height:${data.values[index]}%"></span>
                    </div>
                    <small>${label}</small>
                </div>
            `;
        }).join("");

        chartContainer.setAttribute(
            "aria-label",
            "Illustrative ${period} appointment activity chart"
        );
    }

    /*--- Period Change ---*/
    periodSelect.addEventListener("change", function () {
        renderChart(this.value);
    });

    /*--- Initial Chart ---*/
    renderChart("week");

})();

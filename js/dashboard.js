const allData =
    dashboardData.serviceGaps;


const overallKPIs =
    dashboardData.overallKPIs;


const areaFilter =
    document.getElementById(
        "areaFilter"
    );


const categoryFilter =
    document.getElementById(
        "categoryFilter"
    );


const gapTableBody =
    document.getElementById(
        "gapTableBody"
    );


const keyInsight =
    document.getElementById(
        "keyInsight"
    );



// --------------------------------------------------
// POPULATE FILTERS
// --------------------------------------------------

const areas =
    [...new Set(
        allData.map(
            item => item.Area
        )
    )]
    .sort();


const categories =
    [...new Set(
        allData.map(
            item => item.Category
        )
    )]
    .sort();



areas.forEach(
    area => {

        const option =
            document.createElement(
                "option"
            );

        option.value = area;

        option.textContent = area;

        areaFilter.appendChild(
            option
        );

    }
);



categories.forEach(
    category => {

        const option =
            document.createElement(
                "option"
            );

        option.value = category;

        option.textContent =
            category;

        categoryFilter.appendChild(
            option
        );

    }
);



// --------------------------------------------------
// UPDATE DASHBOARD
// --------------------------------------------------
// --------------------------------------------------
// DEMAND BAR CHART
// --------------------------------------------------

function renderDemandChart(
    filteredData,
    selectedCategory
) {

    const chart =
        document.getElementById(
            "demandChart"
        );


    const chartTitle =
        document.getElementById(
            "demandChartTitle"
        );


    let groupedData = [];


    // --------------------------------------------------
    // IF ALL CATEGORIES:
    // GROUP REQUESTS BY CATEGORY
    // --------------------------------------------------

    if (selectedCategory === "All") {

        chartTitle.textContent =
            "Demand by Category";


        const categoryTotals = {};


        filteredData.forEach(
            item => {

                if (
                    !categoryTotals[
                        item.Category
                    ]
                ) {

                    categoryTotals[
                        item.Category
                    ] = 0;

                }


                categoryTotals[
                    item.Category
                ] += item.Requests;

            }
        );


        groupedData =
            Object.entries(
                categoryTotals
            )
            .map(
                ([label, value]) => ({
                    label,
                    value
                })
            );

    }


    // --------------------------------------------------
    // IF ONE CATEGORY SELECTED:
    // GROUP REQUESTS BY AREA
    // --------------------------------------------------

    else {

        chartTitle.textContent =
            `${selectedCategory} Demand by Area`;


        const areaTotals = {};


        filteredData.forEach(
            item => {

                if (
                    !areaTotals[
                        item.Area
                    ]
                ) {

                    areaTotals[
                        item.Area
                    ] = 0;

                }


                areaTotals[
                    item.Area
                ] += item.Requests;

            }
        );


        groupedData =
            Object.entries(
                areaTotals
            )
            .map(
                ([label, value]) => ({
                    label,
                    value
                })
            );

    }



    // Sort highest demand first

    groupedData.sort(
        (a, b) =>
            b.value - a.value
    );



    const maximumValue =
        Math.max(
            ...groupedData.map(
                item => item.value
            ),
            1
        );



    chart.innerHTML = "";



    groupedData.forEach(
        item => {

            const percentage =
                (
                    item.value
                    /
                    maximumValue
                    *
                    100
                );


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "bar-row";


            row.innerHTML = `

                <div class="bar-label">
                    ${item.label}
                </div>

                <div class="bar-track">

                    <div
                        class="bar-fill"
                        style="
                            width:
                            ${percentage}%;
                        "
                    >
                    </div>

                </div>

                <div class="bar-value">
                    ${item.value.toLocaleString()}
                </div>

            `;


            chart.appendChild(
                row
            );

        }
    );

}
// --------------------------------------------------
// SERVICE COVERAGE VISUALIZATION
// --------------------------------------------------

function renderCoverage(
    totalRequests,
    totalServed,
    totalUnserved
) {

    let servedPercentage = 0;

    let unservedPercentage = 0;


    if (totalRequests > 0) {

        servedPercentage =
            totalServed
            /
            totalRequests
            *
            100;


        unservedPercentage =
            totalUnserved
            /
            totalRequests
            *
            100;

    }



    document.getElementById(
        "servedBar"
    ).style.width =
        servedPercentage
        +
        "%";


    document.getElementById(
        "unservedBar"
    ).style.width =
        unservedPercentage
        +
        "%";



    document.getElementById(
        "servedPercentage"
    ).textContent =
        servedPercentage.toFixed(1)
        +
        "%";


    document.getElementById(
        "unservedPercentage"
    ).textContent =
        unservedPercentage.toFixed(1)
        +
        "%";



    document.getElementById(
        "servedCount"
    ).textContent =
        totalServed.toLocaleString();


    document.getElementById(
        "unservedCount"
    ).textContent =
        totalUnserved.toLocaleString();

}
// --------------------------------------------------
// RECOMMENDATION ENGINE
// --------------------------------------------------

function renderRecommendation(
    biggestGap
) {

    const priorityBadge =
        document.getElementById(
            "priorityBadge"
        );


    const recommendationTitle =
        document.getElementById(
            "recommendationTitle"
        );


    const recommendationText =
        document.getElementById(
            "recommendationText"
        );


    const recommendationEvidence =
        document.getElementById(
            "recommendationEvidence"
        );


    if (!biggestGap) {

        priorityBadge.textContent =
            "No Data";

        recommendationTitle.textContent =
            "No recommendation available";

        recommendationText.textContent =
            "There is not enough data for the current selection.";

        recommendationEvidence.textContent =
            "";

        return;

    }



    // ----------------------------------------------
    // DETERMINE PRIORITY
    // ----------------------------------------------

    let priority;


    if (biggestGap.UnmetRate >= 30) {

        priority = "Critical";

    }

    else if (biggestGap.UnmetRate >= 20) {

        priority = "High";

    }

    else if (biggestGap.UnmetRate >= 15) {

        priority = "Moderate";

    }

    else {

        priority = "Stable";

    }



    priorityBadge.textContent =
        priority + " Priority";
priorityBadge.classList.remove(
    "priority-critical",
    "priority-high",
    "priority-moderate",
    "priority-stable"
);


if (priority === "Critical") {

    priorityBadge.classList.add(
        "priority-critical"
    );

}

else if (priority === "High") {

    priorityBadge.classList.add(
        "priority-high"
    );

}

else if (priority === "Moderate") {

    priorityBadge.classList.add(
        "priority-moderate"
    );

}

else {

    priorityBadge.classList.add(
        "priority-stable"
    );

}


    // ----------------------------------------------
    // CATEGORY-SPECIFIC ACTION
    // ----------------------------------------------

    const actions = {

        Transportation:
            "Increase transportation capacity, review service coverage, and investigate whether additional routes, ride programs, or peak-time support could reduce unmet demand.",

        Housing:
            "Expand housing-navigation and referral capacity and strengthen partnerships with organizations that can provide additional housing support.",

        Employment:
            "Increase career-support and training capacity and strengthen partnerships with employers and workforce-development programs.",

        Food:
            "Review food-distribution capacity, inventory availability, and partner coverage to better match demand with available resources.",

        Health:
            "Increase health-navigation capacity and review referral options to reduce wait times and improve access to available services.",

        Education:
            "Review education-support capacity and coordinate available learning and school resources with areas experiencing higher demand."

    };



    const action =
        actions[
            biggestGap.Category
        ]
        ||
        "Review available capacity and consider reallocating resources toward this service area.";

let finalAction = action;


if (priority === "Stable") {

    finalAction =
        "Current service performance appears stable. Maintain existing capacity, continue monitoring demand, and watch for changes in wait time or satisfaction.";

}


else if (priority === "Moderate") {

    finalAction =
        "Current performance is acceptable but shows signs of pressure. Monitor demand closely and consider targeted improvements before the service gap grows.";

}

    let recommendationHeading;


if (priority === "Critical") {

    recommendationHeading =
        `Prioritize ${biggestGap.Category} in ${biggestGap.Area}`;

}

else if (priority === "High") {

    recommendationHeading =
        `Increase ${biggestGap.Category} capacity in ${biggestGap.Area}`;

}

else if (priority === "Moderate") {

    recommendationHeading =
        `Monitor and improve ${biggestGap.Category} in ${biggestGap.Area}`;

}

else {

    recommendationHeading =
        `Maintain ${biggestGap.Category} service levels in ${biggestGap.Area}`;

}


recommendationTitle.textContent =
    recommendationHeading;


    recommendationText.textContent =
        finalAction;



    recommendationEvidence.textContent =

        `Evidence: ${biggestGap.UnmetRate.toFixed(1)}% unmet demand, `
        +
        `${biggestGap.Unserved.toLocaleString()} unserved requests, `
        +
        `${biggestGap.AvgWaitTimeMinutes.toFixed(1)} minute average wait time, `
        +
        `and ${biggestGap.AvgSatisfaction.toFixed(2)} / 5 satisfaction.`;

}
// --------------------------------------------------
// PROTOTYPE SESSION ACTIVITY
// --------------------------------------------------

function renderSessionActivity() {

    const emptyMessage =
        document.getElementById(
            "sessionActivityEmpty"
        );


    const content =
        document.getElementById(
            "sessionActivityContent"
        );


    const searchCount =
        document.getElementById(
            "sessionSearchCount"
        );


    const topDemand =
        document.getElementById(
            "sessionTopDemand"
        );


    const demandList =
        document.getElementById(
            "sessionDemandList"
        );



    if (
        residentSearchActivity.length === 0
    ) {

        emptyMessage.classList.remove(
            "hidden"
        );


        content.classList.add(
            "hidden"
        );


        return;

    }



    emptyMessage.classList.add(
        "hidden"
    );


    content.classList.remove(
        "hidden"
    );



    searchCount.textContent =
        residentSearchActivity.length;



    const demandCounts = {};



    residentSearchActivity.forEach(
        search => {

            const key =
                `${search.area} | ${search.category}`;


            if (!demandCounts[key]) {

                demandCounts[key] = 0;

            }


            demandCounts[key]++;

        }
    );



    const rankedDemand =
        Object.entries(
            demandCounts
        )
        .map(
            ([label, count]) => ({

                label,
                count

            })
        )
        .sort(
            (a, b) =>
                b.count - a.count
        );



    topDemand.textContent =
        rankedDemand[0].label;



    demandList.innerHTML = "";



    rankedDemand
        .slice(0, 5)
        .forEach(
            item => {

                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "session-demand-row";


                row.innerHTML = `

                    <span>
                        ${item.label}
                    </span>

                    <strong>
                        ${item.count}
                        search${item.count === 1 ? "" : "es"}
                    </strong>

                `;


                demandList.appendChild(
                    row
                );

            }
        );

}
function updateDashboard() {

    const selectedArea =
        areaFilter.value;


    const selectedCategory =
        categoryFilter.value;



    const filteredData =
        allData.filter(

            item => {

                const areaMatch =
                    selectedArea === "All"
                    ||
                    item.Area === selectedArea;


                const categoryMatch =
                    selectedCategory === "All"
                    ||
                    item.Category ===
                    selectedCategory;


                return (
                    areaMatch
                    &&
                    categoryMatch
                );

            }

        );



    // ----------------------------------------------
    // KPI CALCULATIONS
    // ----------------------------------------------

    const totalRequests =
        filteredData.reduce(
            (sum, item) =>
                sum + item.Requests,
            0
        );


    const totalServed =
        filteredData.reduce(
            (sum, item) =>
                sum + item.Served,
            0
        );


    const totalUnserved =
        filteredData.reduce(
            (sum, item) =>
                sum + item.Unserved,
            0
        );


    const totalRecords =
        filteredData.reduce(
            (sum, item) =>
                sum + item.Records,
            0
        );


    const serviceRate =
        totalRequests > 0
        ?
        (
            totalServed
            /
            totalRequests
            *
            100
        )
        :
        0;


    const unmetRate =
        totalRequests > 0
        ?
        (
            totalUnserved
            /
            totalRequests
            *
            100
        )
        :
        0;



    const satisfaction =
        totalRecords > 0
        ?
        filteredData.reduce(

            (sum, item) =>
                sum
                +
                (
                    item.AvgSatisfaction
                    *
                    item.Records
                ),

            0

        )
        /
        totalRecords
        :
        0;



    document.getElementById(
        "totalRequests"
    ).textContent =
        totalRequests.toLocaleString();



    document.getElementById(
        "serviceRate"
    ).textContent =
        serviceRate.toFixed(1)
        +
        "%";



    document.getElementById(
        "unmetRate"
    ).textContent =
        unmetRate.toFixed(1)
        +
        "%";



    document.getElementById(
        "satisfaction"
    ).textContent =
        satisfaction.toFixed(2)
        +
        " / 5";



    // ----------------------------------------------
    // SERVICE GAP TABLE
    // ----------------------------------------------

    const rankedData =
        [...filteredData]
        .sort(
            (a, b) =>
                b.UnmetRate
                -
                a.UnmetRate
        )
        .slice(0, 5);



    gapTableBody.innerHTML = "";



    rankedData.forEach(
        item => {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${item.Area}
                </td>

                <td>
                    ${item.Category}
                </td>

                <td>
                    ${item.Requests.toLocaleString()}
                </td>

                <td>
                    ${item.Unserved.toLocaleString()}
                </td>

                <td>
                    ${item.UnmetRate.toFixed(1)}%
                </td>

                <td>
                    ${item.AvgWaitTimeMinutes.toFixed(1)} min
                </td>

                <td>
                    ${item.AvgSatisfaction.toFixed(2)}
                </td>

            `;


            gapTableBody.appendChild(
                row
            );

        }
    );



    // ----------------------------------------------
    // KEY INSIGHT
    // ----------------------------------------------

    if (rankedData.length > 0) {

        const biggestGap =
            rankedData[0];


        keyInsight.textContent =

            `${biggestGap.Area} ${biggestGap.Category} `
            +
            `shows the highest unmet demand in the current selection, `
            +
            `with ${biggestGap.UnmetRate.toFixed(1)}% `
            +
            `of requests going unserved.`;

    }
// ----------------------------------------------
// RECOMMENDATION
// ----------------------------------------------

if (rankedData.length > 0) {

    renderRecommendation(
        rankedData[0]
    );

}

else {

    renderRecommendation(
        null
    );

}
// ----------------------------------------------
// UPDATE DEMAND CHART
// ----------------------------------------------

renderDemandChart(
    filteredData,
    selectedCategory
);

renderCoverage(
    totalRequests,
    totalServed,
    totalUnserved
);
}



// --------------------------------------------------
// EVENTS
// --------------------------------------------------

areaFilter.addEventListener(
    "change",
    updateDashboard
);


categoryFilter.addEventListener(
    "change",
    updateDashboard
);



// Initial dashboard

updateDashboard();
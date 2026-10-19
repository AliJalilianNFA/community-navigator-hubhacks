// ==================================================
// MAIN VIEW NAVIGATION
// ==================================================

const residentButton =
    document.getElementById(
        "residentButton"
    );


const organizationButton =
    document.getElementById(
        "organizationButton"
    );


const residentView =
    document.getElementById(
        "residentView"
    );


const organizationView =
    document.getElementById(
        "organizationView"
    );



residentButton.addEventListener(
    "click",
    function () {

        residentView.classList.remove(
            "hidden"
        );

        organizationView.classList.add(
            "hidden"
        );


        residentButton.classList.add(
            "active"
        );

        organizationButton.classList.remove(
            "active"
        );

    }
);



organizationButton.addEventListener(
    "click",
    function () {

        organizationView.classList.remove(
            "hidden"
        );

        residentView.classList.add(
            "hidden"
        );


        organizationButton.classList.add(
            "active"
        );

        residentButton.classList.remove(
            "active"
        );
        renderSessionActivity();

    }
);



// ==================================================
// RESIDENT VIEW
// ==================================================

let selectedResidentGroup = null;

let selectedResidentCategory = null;

// ==================================================
// PROTOTYPE SESSION ACTIVITY
// ==================================================

const residentSearchActivity = [];

const groupButtons =
    document.querySelectorAll(
        ".category-card[data-group]"
    );


const subcategorySection =
    document.getElementById(
        "subcategorySection"
    );


const subcategoryGrid =
    document.getElementById(
        "subcategoryGrid"
    );


const subcategoryTitle =
    document.getElementById(
        "subcategoryTitle"
    );


const residentSelection =
    document.getElementById(
        "residentSelection"
    );


const residentSelectionText =
    document.getElementById(
        "residentSelectionText"
    );

const preferenceSection =
    document.getElementById(
        "preferenceSection"
    );


const residentArea =
    document.getElementById(
        "residentArea"
    );


const residentPriority =
    document.getElementById(
        "residentPriority"
    );


const residentCost =
    document.getElementById(
        "residentCost"
    );


const residentAccessibility =
    document.getElementById(
        "residentAccessibility"
    );


const residentOnline =
    document.getElementById(
        "residentOnline"
    );


const findServicesButton =
    document.getElementById(
        "findServicesButton"
    );


const preferenceMessage =
    document.getElementById(
        "preferenceMessage"
    );
    const residentResultsSection =
    document.getElementById(
        "residentResultsSection"
    );


const residentResultsSummary =
    document.getElementById(
        "residentResultsSummary"
    );


const serviceResults =
    document.getElementById(
        "serviceResults"
    );
    // --------------------------------------------------
// POPULATE RESIDENT AREAS
// --------------------------------------------------

const residentAreas =
    [
        ...new Set(

            residentServices.flatMap(
                service =>
                    service.areas
            )

        )
    ]
    .sort();



residentAreas.forEach(
    area => {

        const option =
            document.createElement(
                "option"
            );


        option.value =
            area;


        option.textContent =
            area;


        residentArea.appendChild(
            option
        );

    }
);

// --------------------------------------------------
// MAIN GROUP CLICK
// --------------------------------------------------

groupButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            function () {

                selectedResidentGroup =
                    button.dataset.group;


                selectedResidentCategory =
                    null;


                // Remove selection from
                // all main buttons

                groupButtons.forEach(
                    item => {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                // Highlight selected group

                button.classList.add(
                    "selected"
                );


                renderSubcategories(
                    selectedResidentGroup
                );

            }
        );

    }
);



// --------------------------------------------------
// CREATE SUBCATEGORY BUTTONS
// --------------------------------------------------

function renderSubcategories(
    group
) {

    const categories =
        [
            ...new Set(

                residentServices

                    .filter(
                        service =>
                            service.group === group
                    )

                    .map(
                        service =>
                            service.category
                    )

            )
        ]
        .sort();



    subcategoryTitle.textContent =
        `Choose a ${group} category`;


    subcategoryGrid.innerHTML = "";


    residentSelection.classList.add(
        "hidden"
    );



    categories.forEach(
        category => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "subcategory-button";


            button.textContent =
                category;


            button.addEventListener(
                "click",
                function () {

                    selectedResidentCategory =
                        category;


                    document
                        .querySelectorAll(
                            ".subcategory-button"
                        )
                        .forEach(
                            item => {

                                item.classList.remove(
                                    "selected"
                                );

                            }
                        );


                    button.classList.add(
                        "selected"
                    );


                    showResidentSelection();

                }
            );


            subcategoryGrid.appendChild(
                button
            );

        }
    );


    subcategorySection.classList.remove(
        "hidden"
    );

}



// --------------------------------------------------
// DISPLAY CURRENT SELECTION
// --------------------------------------------------

function showResidentSelection() {

    residentSelectionText.textContent =
        `${selectedResidentGroup} → ${selectedResidentCategory}`;


    residentSelection.classList.remove(
        "hidden"
    );


    preferenceSection.classList.remove(
        "hidden"
    );


    preferenceMessage.textContent =
        "";

}

// --------------------------------------------------
// CALCULATE SERVICE MATCH SCORE
// --------------------------------------------------

function calculateServiceScore(
    service
) {

    let score = 0;

    const reasons = [];


    // --------------------------------------------------
    // AREA
    // Maximum: 40 points
    // --------------------------------------------------

    if (
        service.areas.includes(
            residentArea.value
        )
    ) {

        score += 40;

        reasons.push(
            `Available in ${residentArea.value}`
        );

    }


    // --------------------------------------------------
    // PRIORITY
    // Maximum: 20 points
    // --------------------------------------------------

    if (
        residentPriority.value === "Urgent"
    ) {

        if (service.urgent) {

            score += 20;

            reasons.push(
                "Supports urgent needs"
            );

        }

        else {

            score += 5;

        }

    }

    else {

        score += 20;

    }


    // --------------------------------------------------
    // COST
    // Maximum: 15 points
    // --------------------------------------------------

    if (
        residentCost.value === "Any"
    ) {

        score += 15;

    }


    else if (
        residentCost.value === "Free"
    ) {

        if (service.cost === "Free") {

            score += 15;

            reasons.push(
                "Free service"
            );

        }

    }


    else if (
        residentCost.value === "Low-cost"
    ) {

        if (
            service.cost === "Free"
            ||
            service.cost === "Low-cost"
        ) {

            score += 15;

            reasons.push(
                `${service.cost} option`
            );

        }

        else {

            score += 5;

        }

    }


    // --------------------------------------------------
    // ACCESSIBILITY
    // Maximum: 15 points
    // --------------------------------------------------

    if (
        residentAccessibility.value
        ===
        "No preference"
    ) {

        score += 15;

    }


    else if (
        residentAccessibility.value
        ===
        "Required"
        &&
        service.accessible
    ) {

        score += 15;

        reasons.push(
            "Accessibility support available"
        );

    }


    // --------------------------------------------------
    // SERVICE FORMAT
    // Maximum: 10 points
    // --------------------------------------------------

    if (
        residentOnline.value === "Any"
    ) {

        score += 10;

    }


    else if (
        residentOnline.value === "Online"
        &&
        service.online
    ) {

        score += 10;

        reasons.push(
            "Online option available"
        );

    }


    else if (
        residentOnline.value === "In-person"
        &&
        !service.online
    ) {

        score += 10;

        reasons.push(
            "In-person service available"
        );

    }


    return {
        score,
        reasons
    };

}
// --------------------------------------------------
// RENDER RESIDENT RESULTS
// --------------------------------------------------

function renderResidentResults(
    results,
    fallbackUsed
) {

    serviceResults.innerHTML = "";


    if (results.length === 0) {

        residentResultsSummary.textContent =
            "No matching services were found for the current selection.";


        serviceResults.innerHTML = `

            <div class="no-results">

                No service options are currently
                available for this selection.

            </div>

        `;


        residentResultsSection.classList.remove(
            "hidden"
        );


        return;

    }



    if (fallbackUsed) {

        residentResultsSummary.textContent =

            `No direct ${selectedResidentCategory} service was found in `
            +
            `${residentArea.value}. Showing alternative options that may still help.`;

    }

    else {

        residentResultsSummary.textContent =

            `${results.length} option(s) found for `
            +
            `${selectedResidentCategory} in ${residentArea.value}, `
            +
            `ranked by relevance.`;

    }



    results.forEach(
        result => {

            const service =
                result.service;


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "service-result-card";



            const reasonsHTML =
                result.reasons.length > 0

                ?

                result.reasons
                    .map(
                        reason =>
                            `<li>${reason}</li>`
                    )
                    .join("")

                :

                "<li>Relevant to the selected category</li>";



            card.innerHTML = `

                <div class="service-card-header">

                    <h4>
                        ${service.name}
                    </h4>

                    <span class="match-score">
                        ${result.score}% Match
                    </span>

                </div>


                <p class="service-description">
                    ${service.description}
                </p>


                <div class="service-tags">

                    <span class="service-tag">
                        ${service.cost}
                    </span>

                    <span class="service-tag">
                        ${
                            service.online
                            ?
                            "Online available"
                            :
                            "In-person"
                        }
                    </span>

                    ${
                        service.urgent
                        ?
                        `
                        <span class="service-tag">
                            Urgent support
                        </span>
                        `
                        :
                        ""
                    }

                </div>


                <div class="match-reasons">

                    <strong>
                        Why this matches
                    </strong>

                    <ul>
                        ${reasonsHTML}
                    </ul>

                </div>

            `;


            serviceResults.appendChild(
                card
            );

        }
    );


    residentResultsSection.classList.remove(
        "hidden"
    );

}
// --------------------------------------------------
// FIND SERVICES BUTTON
// --------------------------------------------------

// --------------------------------------------------
// FIND AND RANK SERVICES
// --------------------------------------------------

findServicesButton.addEventListener(
    "click",
    function () {

        if (
            residentArea.value === ""
        ) {

            preferenceMessage.textContent =
                "Please select an area before continuing.";


            residentResultsSection.classList.add(
                "hidden"
            );


            return;

        }


        preferenceMessage.textContent =
            "";

// ------------------------------------------
// RECORD PROTOTYPE SEARCH ACTIVITY
// ------------------------------------------

residentSearchActivity.push({

    area:
        residentArea.value,

    group:
        selectedResidentGroup,

    category:
        selectedResidentCategory,

    priority:
        residentPriority.value,

    timestamp:
        new Date()

});
        // ------------------------------------------
        // FIND SERVICES FOR SELECTED
        // GROUP + CATEGORY
        // ------------------------------------------

        const categoryServices =
            residentServices.filter(
                service =>

                    service.group
                    ===
                    selectedResidentGroup

                    &&

                    service.category
                    ===
                    selectedResidentCategory
            );



        // ------------------------------------------
        // FIRST TRY LOCAL SERVICES
        // ------------------------------------------

        let candidateServices =
            categoryServices.filter(
                service =>

                    service.areas.includes(
                        residentArea.value
                    )
            );


        let fallbackUsed = false;



        // ------------------------------------------
        // IF NOTHING LOCAL EXISTS,
        // SHOW ALTERNATIVES
        // ------------------------------------------

        if (
            candidateServices.length === 0
        ) {

            candidateServices =
                categoryServices;


            fallbackUsed = true;

        }



        // ------------------------------------------
        // SCORE SERVICES
        // ------------------------------------------

        const rankedServices =
            candidateServices

                .map(
                    service => {

                        const match =
                            calculateServiceScore(
                                service
                            );


                        return {

                            service:
                                service,

                            score:
                                match.score,

                            reasons:
                                match.reasons

                        };

                    }
                )

                .sort(
                    (a, b) =>
                        b.score - a.score
                );



        // ------------------------------------------
        // DISPLAY RESULTS
        // ------------------------------------------

        renderResidentResults(
            rankedServices,
            fallbackUsed
        );

    }
);
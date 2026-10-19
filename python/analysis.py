import random
from datetime import date, timedelta
from pathlib import Path

import pandas as pd


# ---------------------------------------------------------
# SETTINGS
# ---------------------------------------------------------

random.seed(42)

NUMBER_OF_ROWS = 1200

AREAS = [
    "Halifax",
    "Bedford",
    "Dartmouth",
    "Sackville"
]

CATEGORY_SERVICES = {
    "Transportation": [
        "Public Transit Support",
        "Community Ride Program"
    ],

    "Housing": [
        "Housing Navigation",
        "Emergency Housing Support"
    ],

    "Food": [
        "Community Food Pickup",
        "Weekly Pantry Support"
    ],

    "Employment": [
        "Career Support",
        "Skills Training"
    ],

    "Health": [
        "Health Navigation",
        "Community Health Support"
    ],

    "Education": [
        "School Information",
        "Learning Support"
    ]
}


# Typical demand level for each category
BASE_DEMAND = {
    "Transportation": 70,
    "Housing": 65,
    "Food": 55,
    "Employment": 50,
    "Health": 60,
    "Education": 45
}


# Basic ability to serve demand
BASE_SERVICE_RATE = {
    "Transportation": 0.83,
    "Housing": 0.80,
    "Food": 0.88,
    "Employment": 0.86,
    "Health": 0.90,
    "Education": 0.91
}


# Different areas may experience different levels of demand
AREA_DEMAND_MULTIPLIER = {
    "Halifax": 1.20,
    "Bedford": 1.00,
    "Dartmouth": 1.10,
    "Sackville": 0.85
}


# Cost type used only for demonstration
COST_TYPE = {
    "Transportation": "Low-cost",
    "Housing": "Free",
    "Food": "Free",
    "Employment": "Free",
    "Health": "Free",
    "Education": "Free"
}


# ---------------------------------------------------------
# HELPER FUNCTION
# ---------------------------------------------------------

def random_date(start_date, end_date):
    """
    Returns a random date between start_date and end_date.
    """

    number_of_days = (end_date - start_date).days

    return start_date + timedelta(
        days=random.randint(0, number_of_days)
    )


# ---------------------------------------------------------
# CREATE SYNTHETIC DATA
# ---------------------------------------------------------

rows = []

start_date = date(2026, 1, 1)
end_date = date(2026, 9, 30)


for _ in range(NUMBER_OF_ROWS):

    area = random.choice(AREAS)

    category = random.choice(
        list(CATEGORY_SERVICES.keys())
    )

    service = random.choice(
        CATEGORY_SERVICES[category]
    )

    service_date = random_date(
        start_date,
        end_date
    )


    # -----------------------------------------------------
    # CALCULATE REQUESTS
    # -----------------------------------------------------

    expected_demand = (
        BASE_DEMAND[category]
        * AREA_DEMAND_MULTIPLIER[area]
    )

    requests = int(
        random.uniform(
            expected_demand * 0.75,
            expected_demand * 1.25
        )
    )

    requests = max(requests, 1)


    # -----------------------------------------------------
    # CALCULATE SERVICE RATE
    # -----------------------------------------------------

    service_rate = BASE_SERVICE_RATE[category]

    # Add small natural variation
    service_rate += random.uniform(-0.05, 0.05)


    # -----------------------------------------------------
    # PURPOSEFUL SERVICE GAPS
    # -----------------------------------------------------

    # Bedford has a transportation capacity problem
    if (
        area == "Bedford"
        and category == "Transportation"
    ):
        service_rate -= 0.18


    # Halifax experiences housing pressure
    if (
        area == "Halifax"
        and category == "Housing"
    ):
        service_rate -= 0.13


    # Sackville has a smaller employment-service gap
    if (
        area == "Sackville"
        and category == "Employment"
    ):
        service_rate -= 0.08


    # Keep rate within sensible limits
    service_rate = max(
        0.50,
        min(service_rate, 0.98)
    )


    # -----------------------------------------------------
    # SERVED / UNSERVED
    # -----------------------------------------------------

    served = round(
        requests * service_rate
    )

    unserved = requests - served

    unmet_rate = (
        unserved / requests
    )


    # -----------------------------------------------------
    # WAIT TIME
    # -----------------------------------------------------

    wait_time = (
        8
        + unmet_rate * 45
        + random.uniform(-3, 5)
    )

    wait_time = round(
        max(wait_time, 3),
        1
    )


    # -----------------------------------------------------
    # SATISFACTION
    # -----------------------------------------------------

    satisfaction = (
        4.7
        - unmet_rate * 3
        - wait_time / 50
        + random.uniform(-0.2, 0.2)
    )

    satisfaction = round(
        max(
            1.0,
            min(satisfaction, 5.0)
        ),
        1
    )


    # -----------------------------------------------------
    # SAVE ROW
    # -----------------------------------------------------

    rows.append(
        {
            "Date": service_date.isoformat(),
            "Area": area,
            "Category": category,
            "Service": service,
            "Requests": requests,
            "Served": served,
            "Unserved": unserved,
            "WaitTimeMinutes": wait_time,
            "Satisfaction": satisfaction,
            "CostType": COST_TYPE[category]
        }
    )


# ---------------------------------------------------------
# CREATE DATAFRAME
# ---------------------------------------------------------

df = pd.DataFrame(rows)

df = df.sort_values(
    by="Date"
).reset_index(drop=True)


# ---------------------------------------------------------
# SAVE CSV
# ---------------------------------------------------------

project_folder = (
    Path(__file__)
    .resolve()
    .parents[1]
)

output_file = (
    project_folder
    / "data"
    / "sample_service_data.csv"
)

df.to_csv(
    output_file,
    index=False
)


# ---------------------------------------------------------
# DISPLAY RESULT
# ---------------------------------------------------------

print()
print("Synthetic dataset created successfully.")
print()

print(
    f"Rows created: {len(df)}"
)

print(
    f"Saved to: {output_file}"
)

print()

print("First 5 rows:")
print(
    df.head().to_string(index=False)
)
# ---------------------------------------------------------
# DATA VALIDATION
# ---------------------------------------------------------

print()
print("DATA VALIDATION")
print("-" * 50)

print(
    f"Date range: {df['Date'].min()} to {df['Date'].max()}"
)

print(
    f"Number of areas: {df['Area'].nunique()}"
)

print(
    f"Number of categories: {df['Category'].nunique()}"
)

data_is_valid = (
    df["Requests"]
    == df["Served"] + df["Unserved"]
).all()

print(
    f"Requests = Served + Unserved: {data_is_valid}"
)


# ---------------------------------------------------------
# OVERALL KPIs
# ---------------------------------------------------------

total_requests = df["Requests"].sum()

total_served = df["Served"].sum()

total_unserved = df["Unserved"].sum()

overall_service_rate = (
    total_served / total_requests * 100
)

overall_unmet_rate = (
    total_unserved / total_requests * 100
)

average_wait_time = (
    df["WaitTimeMinutes"].mean()
)

average_satisfaction = (
    df["Satisfaction"].mean()
)


print()
print("OVERALL KPIs")
print("-" * 50)

print(
    f"Total Requests: {total_requests:,}"
)

print(
    f"Total Served: {total_served:,}"
)

print(
    f"Total Unserved: {total_unserved:,}"
)

print(
    f"Service Rate: {overall_service_rate:.1f}%"
)

print(
    f"Unmet Rate: {overall_unmet_rate:.1f}%"
)

print(
    f"Average Wait Time: {average_wait_time:.1f} minutes"
)

print(
    f"Average Satisfaction: {average_satisfaction:.2f} / 5"
)


# ---------------------------------------------------------
# AREA + CATEGORY SUMMARY
# ---------------------------------------------------------

summary = (
    df
    .groupby(
        ["Area", "Category"],
        as_index=False
    )
    .agg(
        Requests=("Requests", "sum"),
        Served=("Served", "sum"),
        Unserved=("Unserved", "sum"),
        Records=("Requests", "size"),
        AvgWaitTimeMinutes=(
            "WaitTimeMinutes",
            "mean"
        ),
        AvgSatisfaction=(
            "Satisfaction",
            "mean"
        )
    )
)


# ---------------------------------------------------------
# CALCULATED KPIs
# ---------------------------------------------------------

summary["ServiceRate"] = (
    summary["Served"]
    / summary["Requests"]
    * 100
).round(1)

summary["UnmetRate"] = (
    summary["Unserved"]
    / summary["Requests"]
    * 100
).round(1)

summary["AvgWaitTimeMinutes"] = (
    summary["AvgWaitTimeMinutes"]
    .round(1)
)

summary["AvgSatisfaction"] = (
    summary["AvgSatisfaction"]
    .round(2)
)


# Sort highest service gaps first
summary = (
    summary
    .sort_values(
        by="UnmetRate",
        ascending=False
    )
    .reset_index(drop=True)
)


# ---------------------------------------------------------
# SAVE ANALYTICS SUMMARY
# ---------------------------------------------------------

summary_output_file = (
    project_folder
    / "data"
    / "analytics_summary.csv"
)

summary.to_csv(
    summary_output_file,
    index=False
)


# ---------------------------------------------------------
# DISPLAY TOP SERVICE GAPS
# ---------------------------------------------------------

print()
print("TOP SERVICE GAPS")
print("-" * 50)

print(
    summary[
        [
            "Area",
            "Category",
            "Requests",
            "Unserved",
            "UnmetRate",
            "AvgWaitTimeMinutes",
            "AvgSatisfaction"
        ]
    ]
    .head(10)
    .to_string(index=False)
)

print()

print(
    f"Analytics summary saved to: "
    f"{summary_output_file}"
)
# ---------------------------------------------------------
# CREATE JAVASCRIPT DATA FILE FOR OFFLINE DASHBOARD
# ---------------------------------------------------------

import json


overall_kpis = {
    "totalRequests": int(total_requests),
    "totalServed": int(total_served),
    "totalUnserved": int(total_unserved),
    "serviceRate": round(overall_service_rate, 1),
    "unmetRate": round(overall_unmet_rate, 1),
    "averageWaitTime": round(average_wait_time, 1),
    "averageSatisfaction": round(average_satisfaction, 2)
}


summary_records = summary.to_dict(
    orient="records"
)


dashboard_data = {
    "overallKPIs": overall_kpis,
    "serviceGaps": summary_records
}


data_js_file = (
    project_folder
    / "js"
    / "data.js"
)


with open(
    data_js_file,
    "w",
    encoding="utf-8"
) as file:

    file.write(
        "const dashboardData = "
    )

    json.dump(
        dashboard_data,
        file,
        indent=2
    )

    file.write(";")


print()
print("OFFLINE DASHBOARD DATA")
print("-" * 50)

print(
    f"JavaScript data file created: {data_js_file}"
)
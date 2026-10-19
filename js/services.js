const residentServices = [

    // ==================================================
    // COMMUNITY SUPPORT
    // ==================================================

    {
        id: 1,
        group: "Community Support",
        category: "Transportation",
        name: "Community Ride Program",
        areas: ["Bedford", "Halifax", "Dartmouth"],
        cost: "Low-cost",
        urgent: true,
        online: false,
        accessible: true,
        description:
            "Community transportation support for essential trips and appointments."
    },

    {
        id: 2,
        group: "Community Support",
        category: "Transportation",
        name: "Transit Planning Support",
        areas: ["Halifax", "Bedford", "Dartmouth", "Sackville"],
        cost: "Free",
        urgent: false,
        online: true,
        accessible: true,
        description:
            "Guidance for finding suitable public transportation options."
    },

    {
        id: 3,
        group: "Community Support",
        category: "Housing",
        name: "Housing Navigation Service",
        areas: ["Halifax", "Bedford", "Dartmouth", "Sackville"],
        cost: "Free",
        urgent: false,
        online: true,
        accessible: true,
        description:
            "Support for finding housing resources and understanding available options."
    },

    {
        id: 4,
        group: "Community Support",
        category: "Housing",
        name: "Emergency Housing Support",
        areas: ["Halifax", "Dartmouth"],
        cost: "Free",
        urgent: true,
        online: false,
        accessible: true,
        description:
            "Urgent referral support for people experiencing immediate housing needs."
    },

    {
        id: 5,
        group: "Community Support",
        category: "Food",
        name: "Community Food Pickup",
        areas: ["Halifax", "Bedford", "Dartmouth"],
        cost: "Free",
        urgent: true,
        online: false,
        accessible: true,
        description:
            "Food-support option for residents requiring short-term assistance."
    },

    {
        id: 6,
        group: "Community Support",
        category: "Employment",
        name: "Career Support Centre",
        areas: ["Halifax", "Bedford", "Dartmouth", "Sackville"],
        cost: "Free",
        urgent: false,
        online: true,
        accessible: true,
        description:
            "Resume, interview, training and employment-search support."
    },


    // ==================================================
    // PLACES
    // ==================================================

    {
        id: 7,
        group: "Places",
        category: "Hospital",
        name: "Hospital & Health Centre",
        areas: ["Halifax", "Dartmouth"],
        cost: "Varies",
        urgent: true,
        online: false,
        accessible: true,
        description:
            "Find hospital and health-centre options in the selected area."
    },

    {
        id: 8,
        group: "Places",
        category: "Library",
        name: "Public Library",
        areas: ["Halifax", "Bedford", "Dartmouth", "Sackville"],
        cost: "Free",
        urgent: false,
        online: false,
        accessible: true,
        description:
            "Access library, study, computer and community resources."
    },

    {
        id: 9,
        group: "Places",
        category: "School",
        name: "Public School Directory",
        areas: ["Halifax", "Bedford", "Dartmouth", "Sackville"],
        cost: "Free",
        urgent: false,
        online: true,
        accessible: true,
        description:
            "Find public-school information for the selected community."
    },

    {
        id: 10,
        group: "Places",
        category: "Shopping",
        name: "Shopping & Essential Services",
        areas: ["Halifax", "Bedford", "Dartmouth"],
        cost: "Varies",
        urgent: false,
        online: false,
        accessible: true,
        description:
            "Find shopping centres and essential retail services."
    },


    // ==================================================
    // PUBLIC SERVICES
    // ==================================================

    {
        id: 11,
        group: "Public Services",
        category: "Service Canada",
        name: "Service Canada",
        areas: ["Halifax", "Bedford", "Dartmouth", "Sackville"],
        cost: "Free",
        urgent: false,
        online: true,
        accessible: true,
        description:
            "Federal government services and information."
    },

    {
        id: 12,
        group: "Public Services",
        category: "Nova Scotia Health",
        name: "Nova Scotia Health",
        areas: ["Halifax", "Bedford", "Dartmouth", "Sackville"],
        cost: "Free",
        urgent: true,
        online: true,
        accessible: true,
        description:
            "Provincial health information and service navigation."
    },

    {
        id: 13,
        group: "Public Services",
        category: "Access Nova Scotia",
        name: "Access Nova Scotia",
        areas: ["Halifax", "Bedford", "Dartmouth", "Sackville"],
        cost: "Free",
        urgent: false,
        online: true,
        accessible: true,
        description:
            "Provincial government programs, licences and public services."
    },

    {
        id: 14,
        group: "Public Services",
        category: "Nova Scotia Power",
        name: "Nova Scotia Power",
        areas: ["Halifax", "Bedford", "Dartmouth", "Sackville"],
        cost: "Varies",
        urgent: true,
        online: true,
        accessible: true,
        description:
            "Electricity account, outage and customer-service information."
    },

    {
        id: 15,
        group: "Public Services",
        category: "HRCE",
        name: "Halifax Regional Centre for Education",
        areas: ["Halifax", "Bedford", "Dartmouth", "Sackville"],
        cost: "Free",
        urgent: false,
        online: true,
        accessible: true,
        description:
            "Public-school information and education services."
    }

];
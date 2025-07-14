export const schemas = {
  medicine: {
    defaults: {
      brand_name: "",
      generic_name: "",
      manufacturer_name: "",
      form_name: "",
      strength: "",
      regulatory_status: "",
      age_group_suitability: [],
      min_price: 0,
      max_price: 0,
      indication: "",
      dosage_instructions: "",
      onset_of_action: "",
      duration_of_effect: "",
      warnings: "",
      contraindications: "",
      interactions: "",
      side_effects_common: "",
      side_effects_serious: "",
      precautions: "",
      pro_tips: "",
      pregnancy: ""
    },
    keyOrder: [
      "brand_name",
      "generic_name",
      "manufacturer_name",
      "form_name",
      "strength",
      "regulatory_status",
      "age_group_suitability",
      "min_price",
      "max_price",
      "indication",
      "dosage_instructions",
      "onset_of_action",
      "duration_of_effect",
      "warnings",
      "contraindications",
      "interactions",
      "side_effects_common",
      "side_effects_serious",
      "precautions",
      "pro_tips",
      "pregnancy"
    ],
  },
  manufacturer: {
    defaults: {
      name: "",
      country: "",
      description: "",
      website_url: ""
    },
    keyOrder: ["name", "country", "description", "website_url"],
  },
  generics: {
    defaults: {
      name: "",
      category: "",
      description: "",
      is_active: true
    },
    keyOrder: ["name", "category", "description", "is_active"],
  },
  forms: {
    defaults: {
      name: "",
      route_of_administration: "",
      user_friendly_summary: "",
      suitability: [],
      accessibility_tips: []
    },
    keyOrder: [
      "name",
      "route_of_administration",
      "user_friendly_summary",
      "suitability",
      "accessibility_tips"
    ],
  }
};

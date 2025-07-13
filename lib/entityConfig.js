import {
  medicineSchema,
  medicineDefaults,
  manufacturerSchema,
  manufacturerDefaults,
  genericSchema,
  genericDefault,
  formSchema,
  formsDefault,
} from "./validation/addEntity";

export const schemas = {
  medicine: {
    schema: medicineSchema,
    defaults: medicineDefaults,
    keyOrder: [
      "brand_name",
      "generic_name",
      "is_verified",
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
      "pro_tips"
    ],
  },
  manufacturer: {
    schema: manufacturerSchema,
    defaults: manufacturerDefaults,
    keyOrder: ["name", "country", "description", "website_url"],
  },
  generics: {
    schema: genericSchema,
    defaults: genericDefault,
    keyOrder: ["name", "category", "description", "is_active"],
  },
  forms: {
    schema: formSchema,
    defaults: formsDefault,
    keyOrder: ["name", "route_of_administration", "user_friendly_summary", "suitability", "accessibility_tips"]
  }
};
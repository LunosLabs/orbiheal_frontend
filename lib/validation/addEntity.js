import { z } from "zod";

/* --------------------------------- */
/* 1️⃣ ENUMS & Utility Schemas       */
/* --------------------------------- */

export const regulatoryStatusEnum = [
  "otc",
  "prescription",
  "fda_approved",
  "ema_approved",
  "under_review",
  "not_approved",
  "other",
];

export const ageGroupEnum = [
  "infant",
  "child",
  "adolescent",
  "adult",
  "elderly",
  "disabled",
];

const optionalLowerTrimmedString = () =>
  z
    .string()
    .min(1)
    .optional()
    .nullable()
    .transform((val) => (val ? val.trim().toLowerCase() : val));

const requiredLowerTrimmedString = (message) =>
  z.string().min(1, message).transform((str) => str.trim().toLowerCase());

export const noteArraySchema = z
  .array(z.string().min(1, "Note must not be empty").trim())
  .optional()
  .default([]);

/* --------------------------------- */
/* 2️⃣ Medicine Schema & Defaults    */
/* --------------------------------- */

export const medicineSchema = z
  .object({
    brand_name: requiredLowerTrimmedString("Brand name is required"),
    generic_name: requiredLowerTrimmedString("Generic name is required"),
    is_verified: z.boolean().default(false),
    manufacturer_name: requiredLowerTrimmedString("Manufacturer name is required"),
    form_name: requiredLowerTrimmedString("Form name is required"),
    strength: requiredLowerTrimmedString("Strength is required"),

    regulatory_status: z.enum(regulatoryStatusEnum, {
      errorMap: () => ({ message: "Invalid regulatory status" }),
    }),

    age_group_suitability: z.array(z.enum(ageGroupEnum)).optional().default([]),

    min_price: z.number().nonnegative("Minimum price cannot be negative"),
    max_price: z.number().nonnegative("Maximum price cannot be negative"),

    indication: optionalLowerTrimmedString(),
    dosage_instructions: optionalLowerTrimmedString(),
    onset_of_action: optionalLowerTrimmedString(),
    duration_of_effect: optionalLowerTrimmedString(),

    warnings: noteArraySchema,
    contraindications: noteArraySchema,
    interactions: noteArraySchema,
    side_effects_common: noteArraySchema,
    side_effects_serious: noteArraySchema,
    precautions: noteArraySchema,
    pro_tips: noteArraySchema,
  })
  .refine(
    (data) => {
      const min = data.min_price ?? 0;
      const max = data.max_price ?? 0;
      if (!min || !max) return true;
      return min <= max;
    },
    {
      message: "Minimum price must be less than or equal to maximum price",
      path: ["max_price"],
    }
  );

export const medicineDefaults = {
  brand_name: "",
  generic_name: "",
  is_verified: false,
  manufacturer_name: "",
  form_name: "",
  strength: "",
  regulatory_status: "other",
  age_group_suitability: [],
  min_price: 0,
  max_price: 0,
  indication: "",
  dosage_instructions: "",
  onset_of_action: "",
  duration_of_effect: "",
  warnings: [],
  contraindications: [],
  interactions: [],
  side_effects_common: [],
  side_effects_serious: [],
  precautions: [],
  pro_tips: [],
};










/* --------------------------------- */
/* 3️⃣ Manufacturer Schema & Defaults */
/* --------------------------------- */

export const manufacturerSchema = z.object({
  name: requiredLowerTrimmedString("Name is required"),
  country: requiredLowerTrimmedString("Country is required"),
  description: optionalLowerTrimmedString(),
  website_url: optionalLowerTrimmedString(),
});

export const manufacturerDefaults = {
  name: "",
  country: "",
  description: "",
  website_url: "",
};

/* --------------------------------- */
/* 4️⃣ Generic Schema & Defaults      */
/* --------------------------------- */

export const genericSchema = z.object({
  name: requiredLowerTrimmedString("Name is required"),
  category: requiredLowerTrimmedString("Category is required"),
  description: optionalLowerTrimmedString(),
  is_active: z.boolean().optional().default(true),
});

export const genericDefault = {
  name: "",
  category: "",
  description: "",
  is_active: true,
};


export const formSchema = z.object({
  name: requiredLowerTrimmedString("Name is required"),
  route_of_administration: requiredLowerTrimmedString("Route of administration is required"),
  user_friendly_summary: optionalLowerTrimmedString(),
  ease_of_use: optionalLowerTrimmedString(),
  suitability: z.array(z.enum(["adult", "child", "adolescent", "elderly"])).default([]),
  accessibility_tips: z.array(z.string().trim()).default([]),
});

export const formsDefault = {
  name: "",
  route_of_administration: "",
  user_friendly_summary: "",
  suitability: [],
  accessibility_tips: ""
};
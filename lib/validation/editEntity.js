import {z} from "zod"

const medicineDetailsSchema = z.object({
    how_it_helps: z.string().min(1, "Explanation of benefit is required"),
    when_and_how_to_take: z.string().min(1, "Dosage info is required"),
    warnings: z.array(z.string()).min(1, "At least one warning is required"),
    contraindications: z.array(z.string()).min(1, "At least one exclusion is required"),
    side_effects_common: z.array(z.string()).min(1, "List at least one common side effect"),
    side_effects_serious: z.array(z.string()).min(1, "List at least one serious side effect"),
    pro_tips: z.array(z.string()).min(1, "At least one expert tip is required")
});


// update medicine Schema
export const medicineUpdateSchema = z.object({
    brand_name: z.string().min(1, "Brand name must be non-empty").optional(),
    generic_name: z.string().min(1, "Generic name must be non-empty").optional(),
    manufacturer_name: z.string().min(1, "Manufacturer must be non-empty").optional(),
    form: z.string().min(1, "Form must be non-empty").optional(),
    strength: z.string().min(1, "Strength must be non-empty").optional(),
    regulatory_status: z.string().min(1, "Regulatory status must be non-empty").optional(),
    min_price: z.number().min(0, "Minimum price must be positive").optional(),
    max_price: z.number().min(0, "Maximum price must be positive").optional(),
    is_verified: z.boolean().optional(),
    medicine_details: medicineDetailsSchema.partial().optional()
}).refine(
  data => {
    if (data.min_price !== undefined && data.max_price !== undefined) {
      return data.min_price <= data.max_price;
    }
    return true;
  },
  { message: "Minimum price must be less than or equal to maximum price" }
);



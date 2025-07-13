import { redirect } from "next/navigation";
import { fetchMedicineById } from "@/lib/services/adminServices/medicineService";
import MedicineHeader from "@/components/publicComponents/MedicinePackComponents/MedicineHeader";
import PriceInfo from "@/components/publicComponents/MedicinePackComponents/PriceInfo";
import BasicInfo from "@/components/publicComponents/MedicinePackComponents/BasicInfo";
import DescriptionSection from "@/components/publicComponents/MedicinePackComponents/DescriptionSection";
import TextList from "@/components/publicComponents/MedicinePackComponents/TextList";
import ProTipsSection from "@/components/publicComponents/MedicinePackComponents/ProTipsSection";
import MedicineFooter from "@/components/publicComponents/MedicinePackComponents/MedicineFooter";
import AgeSuitabilityTags from "@/components/publicComponents/MedicinePackComponents/AgeSuitabilityTags";


export default async function Page({ params }) {
  const id = (await params)?.id ?? "";
  if(!id){
    redirect("/dashboard/medicine")
  }
  try {
    const { medicine, details, attributes, generic, manufacturer, form } = await fetchMedicineById(id); 
    return (
      <div className="mx-auto min-h-screen max-w-4xl py-2 font-sans text-white sm:px-6 lg:px-12">
        <div className="space-y-6">
          <MedicineHeader medicine={medicine} generic={generic} />
          <BasicInfo medicine={medicine} form={form} manufacturer={manufacturer} />
          <PriceInfo medicine={medicine} />
          <AgeSuitabilityTags ageGroups={medicine?.age_group_suitability ?? []} />

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
            <DescriptionSection
              title="Onset Of Action"
              content={details?.onset_of_action ?? "Not available"}
            />
            <DescriptionSection
              title="Duration of Effect"
              content={details?.duration_of_effect ?? "Not available"}
            />
            <DescriptionSection
              title="How It Helps"
              content={details?.indication ?? "Not available"}
            />
            <DescriptionSection
              title="Dosage Instructions"
              content={details?.dosage_instructions ?? "Not available"}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
            <TextList
              title="Common Side Effects"
              content={attributes?.side_effects_common ?? []}
            />
            <TextList
              title="Rare Side Effects"
              content={attributes?.side_effects_serious ?? []}
              highlight
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
            <TextList
              title="Important Safety Warnings"
              content={attributes?.warnings ?? []}
              highlight
            />
            <TextList
              title="Who Should Avoid This"
              content={attributes?.contraindications ?? []}
            />
          </div>

          <TextList
            title="Potential Drug Interactions"
            content={attributes?.interactions ?? []}
          />

          <ProTipsSection
            title="Expert Tips & Guidance"
            content={attributes?.pro_tips ?? []}
          />

          <TextList
            title="Additional Precautions"
            content={attributes?.precautions ?? []}
          />

          <MedicineFooter last_reviewed={medicine.updated_at ?? null} />
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    
    redirect("/dashboard/medicine");
  }
}
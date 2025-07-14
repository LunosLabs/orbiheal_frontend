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
  if (!id) redirect("/dashboard");

  const rawData = await fetchMedicineById(id);
  const { medicine, details, generic, manufacturer, form } = rawData;
  const attributes = groupAttributesByCode(rawData.attributes);

  return (
    <div className="mx-auto min-h-screen max-w-7xl py-2 sm:px-8 lg:px-16 xl:px-24 font-sans text-white">
      <div className="space-y-10">
        <MedicineHeader medicine={medicine} generic={generic} />
        <BasicInfo
          medicine={medicine}
          form={form}
          manufacturer={manufacturer}
        />
        <PriceInfo medicine={medicine} />
        <AgeSuitabilityTags ageGroups={medicine?.age_group_suitability ?? []} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {attributes.side_effects_common && (
            <TextList data={attributes.side_effects_common} />
          )}
          {attributes.side_effects_serious && (
            <TextList data={attributes.side_effects_serious} highlight />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {attributes.warnings && (
            <TextList data={attributes.warnings} highlight />
          )}
          {attributes.contraindications && (
            <TextList data={attributes.contraindications} />
          )}
        </div>

        {attributes.pregnancy && <TextList data={attributes.pregnancy} />}
        {attributes.pro_tips && <ProTipsSection data={attributes.pro_tips} />}
        {attributes.precautions && <TextList data={attributes.precautions} />}

        <MedicineFooter last_reviewed={medicine.updated_at ?? null} />
      </div>
    </div>
  );
}

function groupAttributesByCode(attributesArray = []) {
  return attributesArray.reduce((result, attr) => {
    result[attr.category_code] = attr;
    return result;
  }, {});
}

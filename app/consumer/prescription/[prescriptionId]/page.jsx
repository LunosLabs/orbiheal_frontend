import React from "react";
import HeaderSection from "@/components/prescriptionComponents/HeaderSection";
import DoctorSection from "@/components/prescriptionComponents/DoctorSection";
import StatusSection from "@/components/prescriptionComponents/StatusSection";
import MedicinesSection from "@/components/prescriptionComponents/MedicineSection";
import RemindersSection from "@/components/prescriptionComponents/RemindersSection";
import AdviceSection from "@/components/prescriptionComponents/AdviceSection";
import UnderDevelopmentPage from "@/components/UnderDevelopmentPage";

export default function PrescriptionDetailsPage() {
  const prescription = {
    doctor: "Dr. Anita Sharma",
    hospital: "CityCare Hospital",
    status: false,
    startDate: "2024-06-01",
    endDate: "2024-06-15",
    summary:
      "Management of Type 2 Diabetes with Metformin and lifestyle guidance.",
    medicines: [
      {
        name: "Metformin 500mg",
        purpose: "Helps reduce blood sugar levels.",
        timing: "After breakfast and after dinner",
        sideEffects: "Mild stomach upset possible.",
      },
      {
        name: "Vitamin D3 1000IU",
        purpose: "Supports bone health and immunity.",
        timing: "After lunch",
        sideEffects: "",
      },
    ],
    reminders: [
      "08:00 AM - Metformin Reminder",
      "01:00 PM - Vitamin D3 Reminder",
      "08:00 PM - Metformin Reminder",
    ],
    advice: [
      "Eat balanced meals with low sugar.",
      "Take medications with food to avoid stomach upset.",
      "Stay hydrated and do light exercise daily.",
      "Monitor your blood sugar regularly and report changes.",
    ],
    notificationPolicy:
      "You’ll receive SMS and app notifications 15 minutes before each dose.",
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 px-4 py-4 sm:py-12">
      <article className="max-w-2xl mx-auto space-y-8">
        <UnderDevelopmentPage/>
        <HeaderSection />

        <DoctorSection
          doctor={prescription.doctor}
          hospital={prescription.hospital}
          summary={prescription.summary}
        />
        <hr className="border-neutral-800" />
        <StatusSection
          status={prescription.status}
          startDate={prescription.startDate}
          endDate={prescription.endDate}
        />
        <hr className="border-neutral-800" />
        <MedicinesSection medicines={prescription.medicines} />
        <hr className="border-neutral-800" />
        <RemindersSection
          reminders={prescription.reminders}
          notificationPolicy={prescription.notificationPolicy}
        />
        <hr className="border-neutral-800" />
        <AdviceSection advice={prescription.advice} />
      </article>
    </main>
  );
}

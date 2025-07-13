import React from "react";
import UploadPrescriptionClient from "@/components/scanComponents/UploadPrescriptionClient";
import { Lock, ShieldCheck, CalendarCheck2, Smile, Pill } from "lucide-react";
import UnderDevelopmentPage from "@/components/UnderDevelopmentPage";

export default function UploadPrescriptionPage() {
  return (
    <main className="min-h-screen w-full flex justify-center py-2 bg-neutral-950">
      <section className="w-full max-w-md space-y-4">

        {/* development notice */}
        <UnderDevelopmentPage/>


        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            Upload Your Prescription
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Upload a{" "}
            <span className="text-blue-400 font-medium">clear photo</span> of
            your doctor’s prescription. Our system will{" "}
            <span className="text-blue-400 font-medium">
              automatically detect medicines, dosages, their purposes
            </span>
            , and even set smart reminders — so you never miss a dose.
          </p>
        </div>

        {/* Upload Client Component */}
        <UploadPrescriptionClient />

        {/* Reassurance Bullets */}
        <div className="space-y-3 text-sm text-neutral-300">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-5 h-5 text-green-400 shrink-0" />
            <span>
              Your prescription is processed securely — fully encrypted and
              private.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Lock className="w-5 h-5 text-blue-400 shrink-0" />
            <span>
              Your data is never shared. You’re in full control at every step.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Pill className="w-5 h-5 text-teal-400 shrink-0" />
            <span>
              You'll get full info on what each medicine does — clearly
              explained.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CalendarCheck2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              Medicine timings and reminders are auto-scheduled for you.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Smile className="w-5 h-5 text-yellow-400 shrink-0" />
            <span>
              There’s no wall between you and your health — just clarity and
              comfort.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

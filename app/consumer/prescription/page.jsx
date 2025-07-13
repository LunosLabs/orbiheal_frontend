'use client';

import React from 'react';
import Prescription from '@/components/prescriptionComponents/Prescription';
import UnderDevelopmentPage from '@/components/UnderDevelopmentPage';

export default function PrescriptionsPage() {
  const prescriptions = [
    {
      id: '1',
      doctor: 'Dr. Anita Sharma',
      hospital: 'CityCare Hospital',
      status: 'active',
      startDate: '2024-06-01',
      endDate: '2024-06-15',
      summary: 'Type 2 Diabetes Management with Metformin and lifestyle changes.'
    },
    {
      id: '2',
      doctor: 'Dr. Rahul Verma',
      hospital: 'LifeLine Clinic',
      status: 'completed',
      startDate: '2024-04-10',
      endDate: '2024-05-01',
      summary: 'Hypertension treatment including Amlodipine and dietary guidance.'
    },
    {
      id: '3',
      doctor: 'Dr. Neha Patil',
      hospital: 'GreenLeaf Hospital',
      status: 'completed',
      startDate: '2024-03-05',
      endDate: '2024-03-10',
      summary: 'Routine general health checkup with normal results.'
    }
  ];

  return (
 <main className="min-h-screen w-full flex justify-center px-2 py-4 bg-neutral-950 text-neutral-200">
  <section className="w-full max-w-2xl space-y-6">

    <UnderDevelopmentPage/>
    {/* Page header */}
    <div className="text-center space-y-1">
      <h1 className="text-2xl font-bold text-white">
        Your Digital Prescription Locker
      </h1>
      <p className="text-sm text-neutral-400">
       All your prescriptions in one safe, easy-to-access place. Clear, reliable, and secure — never miss any treatment details, doses, or doctor’s advice, all kept private just for you.
      </p>
    </div>

    {/* Prescription List */}
    <div className="space-y-3">
      {prescriptions.map((item) => (
        <Prescription key={item.id} {...item} />
      ))}
    </div>
  </section>
</main>

  );
}

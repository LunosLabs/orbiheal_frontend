import React from 'react';
import { Bell } from 'lucide-react';

export default function RemindersSection({ reminders, notificationPolicy }) {
  return (
    <>
      <section className="space-y-3">
        <h2 className="flex items-center gap-3 text-lg font-semibold text-white">
          <Bell className="w-6 h-6 text-yellow-400" />
          Reminders
        </h2>
        <ul className="list-disc list-inside text-sm text-neutral-300 space-y-1">
          {reminders.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <p className="text-xs text-neutral-500 mt-1">
          {notificationPolicy}
        </p>
      </section>
    </>
  );
}

import React from "react";
import WelcomeCard from "@/components/dashboardComponents/WelcomeCard";
import DashBoardOptions from "@/components/dashboardComponents/DashBoardOptions";

export default function DashboardPage() {
  return (
    <div className=" min-h-screen w-full max-w-4xl flex flex-col gap-6 py-2 sm:px-6 ">
      <WelcomeCard />
      <DashBoardOptions />
    </div>
  );
}

"use client";
import React from "react";
import { CiCoffeeBean, CiCalendar } from "react-icons/ci";

export function ScheduleSection(
  handleCoffeeCalendlyClick: (event: React.MouseEvent) => void,
  handleBusinessCalendlyClick: (event: React.MouseEvent) => void,
) {
  return (
    <div className="text-left flex flex-col h-full gap-2">
      <p className="font-bold text-lg text-pretty text-gradient_blue-purple">
        Schedule
      </p>
      <div className="flex flex-start space-x-4 items-center p-1">
        <CiCoffeeBean className="text-xl" />
        <p onClick={handleCoffeeCalendlyClick} className="text-sm link-hover">
          Coffee Chat?
        </p>
      </div>
      <div className="flex space-x-4 items-center p-1">
        <CiCalendar className="text-xl" />
        <p onClick={handleBusinessCalendlyClick} className="text-sm link-hover">
          Business Talk?
        </p>
      </div>
    </div>
  );
}

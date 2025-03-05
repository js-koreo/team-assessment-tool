import React from "react";

const TrafficLightAssessment = ({ score }) => {
  let color = "bg-red-500"; // Default Red (Needs Growth)
  let label = "Needs Growth";

  if (score >= 4) {
    color = "bg-green-500"; // Strength
    label = "Strength";
  } else if (score >= 2) {
    color = "bg-yellow-500"; // Developing
    label = "Developing";
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <div className={`w-6 h-6 rounded-full ${color}`} />
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default TrafficLightAssessment;

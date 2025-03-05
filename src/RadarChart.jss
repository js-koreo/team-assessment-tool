import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const RadarChartComponent = ({ data }) => {
  const chartData = Object.keys(data).map((domain) => ({
    domain,
    value: data[domain] ?? 0, // Default to 0 if no selection
  }));

  return (
    <div className="radar-chart">
      <RadarChart cx={200} cy={150} outerRadius={120} width={400} height={300} data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="domain" />
        <PolarRadiusAxis domain={[0, 2]} tickCount={3} />
        <Radar name="Assessment" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </div>
  );
};

export default RadarChartComponent;

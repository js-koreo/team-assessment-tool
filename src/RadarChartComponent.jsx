import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const RadarChartComponent = ({ data }) => {
  return (
    <div className="radar-chart">
      <RadarChart outerRadius={120} width={400} height={300} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="domain" />
        <PolarRadiusAxis angle={30} domain={[1, 5]} />
        <Radar 
          name="Team Assessment" 
          dataKey="score" 
          stroke="#8884d8" 
          fill="#8884d8" 
          fillOpacity={0.6} 
        />
      </RadarChart>
    </div>
  );
};

export default RadarChartComponent;

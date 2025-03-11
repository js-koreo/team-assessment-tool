import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const RadarChartComponent = ({ data }) => {
  return (
    <div className="radar-chart">
      <RadarChart 
        outerRadius={140} 
        width={490} 
        height={450} 
        data={data}
        margin={{ top: 20, right: 50, left: 50, bottom: 20 }}
      >
        <PolarGrid />
        <PolarAngleAxis 
          dataKey="domain" 
          tick={{ fontSize: 12 }}
          tickLine={false}
        />
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
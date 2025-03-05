import React, { useState } from "react";
import RadarChartComponent from "./RadarChartComponent";
import TrafficLightAssessment from "./TrafficLightAssessment";

// Using regular HTML elements instead of potentially missing shadcn/ui components
// You can replace these with the shadcn/ui components if they're properly installed

const domains = [
  "Strategic Focus", "Change Maker", "Inclusive", "Collaborative", "Entrepreneurial"
];

const questions = {
  "Strategic Focus": [
    "Do we set clear priorities aligned with our mission?",
    "Do we make bold, strategic decisions when needed?",
    "Do we delegate effectively and hold each other accountable?"
  ],
  "Change Maker": [
    "Do we embrace change as a pathway to impact?",
    "Do we make informed decisions about resources and growth?",
    "Do we optimize systems for effective leadership?"
  ],
  "Inclusive": [
    "Do we prioritize diverse perspectives in decision-making?",
    "Do we foster an inclusive and psychologically safe environment?",
    "Do we role model authenticity and integrity in leadership?"
  ],
  "Collaborative": [
    "Do we build strong networks to enhance impact?",
    "Do we actively listen and integrate diverse perspectives?",
    "Do we foster a feedback culture that drives improvement?"
  ],
  "Entrepreneurial": [
    "Do we experiment with new ideas and innovate?",
    "Do we take smart risks with data-driven decision-making?",
    "Do we balance short-term priorities with long-term learning?"
  ]
};

const trafficLightScores = { "🟢": 5, "🟡": 3, "🔴": 1 };
const trafficLightLabels = { "🟢": "Strength", "🟡": "Developing", "🔴": "Needs Growth" };

export default function TeamAssessmentTool() {
  const [responses, setResponses] = useState({});
  const [actionPlan, setActionPlan] = useState(null);

  const handleChange = (domain, index, value) => {
    const updatedResponses = { ...responses };
    if (!updatedResponses[domain]) updatedResponses[domain] = [];
    updatedResponses[domain][index] = trafficLightScores[value];
    setResponses(updatedResponses);
  };

  const generateRadarData = () => {
    return domains.map((domain) => {
      const scores = responses[domain] || [];
      const avgScore = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length) : 1;
      return { domain, score: avgScore };
    });
  };

  const generateActionPlan = () => {
    const weakAreas = domains.filter((domain) => {
      const scores = responses[domain] || [];
      if (scores.length === 0) return true; // If no responses, consider it a weak area
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      return avgScore <= 2; // Average score less than 3 is considered a weak area
    });

    if (weakAreas.length === 0) {
      setActionPlan({
        status: "strong",
        message: "Your team is performing well across all domains. Focus on maintaining strengths and continuous improvement."
      });
    } else {
      setActionPlan({
        status: "areas-to-improve",
        areas: weakAreas,
        message: `Consider focusing on improving these areas: ${weakAreas.join(", ")}`
      });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Team Self-Assessment Tool</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {domains.map((domain) => (
          <div key={domain} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">{domain}</h3>
            {questions[domain].map((q, index) => (
              <div key={index} className="mb-4">
                <p className="mb-2 text-gray-800">{q}</p>
                <div className="flex gap-2 justify-center">
                  {Object.keys(trafficLightScores).map((emoji) => (
                    <label key={emoji} className="cursor-pointer flex items-center">
                      <input
                        type="radio"
                        name={`${domain}-${index}`}
                        value={emoji}
                        onChange={() => handleChange(domain, index, emoji)}
                        checked={(responses[domain] || [])[index] === trafficLightScores[emoji]}
                        className="mr-1"
                      />
                      <span className="text-gray-800">{emoji} {trafficLightLabels[emoji]}</span>
                    </label>
                  ))}
                </div>
                {(responses[domain] || [])[index] && (
                  <div className="mt-2">
                    <TrafficLightAssessment score={(responses[domain] || [])[index]} />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <RadarChartComponent data={generateRadarData()} />
      </div>
      <button 
        className="mt-6 w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={generateActionPlan}
      >
        Generate Action Plan
      </button>
      
      {actionPlan && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold text-lg mb-2 text-gray-900">Action Plan</h3>
          <p className="text-gray-800">{actionPlan.message}</p>
          {actionPlan.areas && (
            <ul className="mt-2 list-disc pl-5">
              {actionPlan.areas.map(area => (
                <li key={area} className="text-gray-800">{area}: Focus on improving the team's capabilities in this domain.</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

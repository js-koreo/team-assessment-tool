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
    "Do I/we focus on organisational mission and strategy, setting clear priorities, and say no to distractions?",
    "Do I/we make tough, strategic decisions with courage and confidence?",
    "Do I/we balance financial growth with strategic goals when making decisions?",
    "Am I/Are we bold and ambitious in driving results to achieve our strategy?",
    "Do I/we empower colleagues to perform at their best while holding them accountable?"
  ],
  "Change Maker": [
    "Do I/we embrace change as a constant and inspire others to be more resilient in times of change?",
    "Do I/we align our work with achieving positive change in the wider ecosystem we work in?",
    "Do I/we make sound decisions to resource our work in innovative ways?",
    "Do I/we see our organisational teams and partners as a system and influence change within it?",
    "Do I/we optimise processes to support effective leadership and change-making?"
  ],
  "Inclusive": [
    "Do I/we lead with empathy, centring the needs of those we work for?",
    "Do I/we build diverse, inclusive teams where everyone feels valued?",
    "Do I/we actively seek and include diverse perspectives when making decisions?",
    "Am I/Are we authentic, transparent, and reliable in my/our actions?",
    "Do I/we address power dynamics and inequalities proactively?"
  ],
  "Collaborative": [
    "Do I/we build trust-based connections that mobilises partnerships and innovation?",
    "Do I/we communicate stories that motivate others while centring the people we work for?",
    "Do I/we actively listen to and integrate diverse perspectives?",
    "Do I/we create a culture of feedback and transparency?",
    "Do I/we seek opportunities to improve collaboration and communication?"
  ],
  "Entrepreneurial": [
    "Am I/Are we curious and open to new ideas that could drive positive growth?",
    "Do I/we make bold, data-driven decisions that balance risk and reward?",
    "Do I/we foster a culture of learning, encouraging reflection and growth from failure?",
    "Am I/Are we adaptable, embracing uncertainty as part of the innovation process?",
    "Do I/we create environments that support personal growth and well-being for colleagues?"
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
                <p className="font-bold mb-2 text-gray-800">{q}</p>
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

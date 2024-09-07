import { useState } from "react";

const symptoms = [
  "Fever",
  "Cough",
  "Shortness of breath",
  "Sore throat",
  "Loss of taste",
  "Loss of smell",
  "Headache",
  "Body aches",
  "Fatigue",
  "Chills",
  "Nausea",
];

const Demo = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState(["", "", "", ""]);

  const handleChange = (index, event) => {
    const newSymptoms = [...selectedSymptoms];
    newSymptoms[index] = event.target.value;
    setSelectedSymptoms(newSymptoms);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected Symptoms:", selectedSymptoms);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {selectedSymptoms.map((symptom, index) => (
        <div key={index}>
          <label
            htmlFor={`symptoms${index + 1}`}
            className="block text-gray-700 mb-2"
          >
            Choose a symptom {index + 1}:
          </label>
          <select
            id={`symptoms${index + 1}`}
            name={`symptoms${index + 1}`}
            value={symptom}
            onChange={(event) => handleChange(index, event)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a symptom...</option>
            {symptoms.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default Demo;

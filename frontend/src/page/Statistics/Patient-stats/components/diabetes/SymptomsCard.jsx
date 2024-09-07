const SymptomsCard = () => {
  const symptoms = [
    "Increased thirst",
    "Frequent urination",
    "Extreme hunger",
    "weight loss",
    "Fatigue",
    "Irritability",
  ];

  return (
    <div>
      <div className="container w-80 flex flex-col gap-2 bg-white py-5 px-6 rounded-md shadow-sm">
        <p className="font-medium text-md mb-1">Symptoms</p>
        <div className="flex gap-2 justify-between">
          <div className="flex flex-col gap-2 ">
            {symptoms.slice(0, 3).map((symptom) => (
              <div key={symptom} className="flex items-center justify-between">
                <span className="font-medium text-sm text-gray-400">
                  {symptom}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 ">
            {symptoms.slice(3).map((symptom) => (
              <div
                key={symptom}
                className="flex items-center justify-between text-left"
              >
                <span className="font-medium text-sm text-gray-400">
                  {symptom}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomsCard;

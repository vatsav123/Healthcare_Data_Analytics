import { GiKidneys } from "react-icons/gi";

const ChronicCondition = () => {
  return (
    <div>
      <div className="w-[320px] h-[350px] rounded-md shadow-sm bg-gradient-to-r from-teal-800 to-teal-500 p-6 flex flex-col">
        <div className="flex items-center gap-3">
          <div className="bg-teal-900 flex items-center justify-center w-16 h-16 rounded-full">
            <GiKidneys className="text-white" size={36} />
          </div>
          <span className="text-lg font-medium text-white">Kidney Disease</span>
        </div>
        <p className="text-white text-lg my-4">Chronic conditions</p>
        <div className="flex items-center justify-between mx-8">
          <div className="text-white flex flex-col gap-2">
            <span className="font-medium text-xl">20.0%</span>
            <span className="text-xs">Last time</span>
          </div>
          <div className="border-r-2 h-12">&nbsp;</div>
          <div className="text-white flex flex-col gap-2">
            <span className="font-medium text-xl">40.0%</span>
            <span className="text-xs">Recently</span>
          </div>
        </div>
        <p className="text-white font-medium text-base my-7 text-center">
          Low Probability of Kidney Disease
        </p>
        <button className="bg-white text-green-600 px-4 py-2 rounded-md shadow-md hover:bg-green-600 hover:text-white transition duration-300">
          View Full Report
        </button>
      </div>
    </div>
  );
};

export default ChronicCondition;

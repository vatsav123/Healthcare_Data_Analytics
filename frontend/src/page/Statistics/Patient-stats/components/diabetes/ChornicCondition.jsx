import { FaNotesMedical } from "react-icons/fa";

const ChornicCondition = () => {
  return (
    <div>
      <div className="w-[320px] h-[350px] rounded-md shadow-sm bg-gradient-to-r from-yellow-500 to-yellow-700 p-6 flex flex-col">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-900 flex items-center justify-center w-16 h-16 rounded-full">
            <FaNotesMedical className="text-white" size={36} />
          </div>
          <span className="text-lg font-medium text-white">Diabetes</span>
        </div>
        <p className="text-white text-lg my-4">Chronic conditions</p>
        <div className="flex items-center justify-between mx-8">
          <div className="text-white flex flex-col gap-2">
            <span className="font-medium text-xl">25.0%</span>
            <span className="text-xs">Last time</span>
          </div>
          <div className="border-r-2 h-12">&nbsp;</div>
          <div className="text-white flex flex-col gap-2">
            <span className="font-medium text-xl">30.0%</span>
            <span className="text-xs">Recently</span>
          </div>
        </div>
        <p className="text-white font-medium text-base my-7 text-center">
          Moderate Risk of Diabetes
        </p>

        <button className="bg-white text-yellow-700 px-4 py-2 rounded-md shadow-md hover:bg-yellow-700 hover:text-white transition duration-300">
          View Full Report
        </button>
      </div>
    </div>
  );
};

export default ChornicCondition;

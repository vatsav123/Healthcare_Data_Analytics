import { FaCaretUp } from "react-icons/fa";
const BloodPressure = () => {
  return (
    <div>
      <div className="container w-60 flex flex-col gap-2 bg-white p-6 rounded-md shadow-sm">
        <div>
          <div className="bg-blue-200 flex w-10  items-center justify-center p-2 rounded-md">
            <img className="h-5 w-5 " src="/icons/blood-pressure.png" alt="" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Blood Pressure</span>
          <div className="flex items-center justify-between gap-2">
            <FaCaretUp />

            <span className="font-medium">1.5%</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xl font-medium text-blue-400">120</span>
          <span className="text-sm text-gray-500">mmHg</span>
          <span className="text-sm font-medium ml-auto">(Systolic)</span>
        </div>
      </div>
    </div>
  );
};

export default BloodPressure;

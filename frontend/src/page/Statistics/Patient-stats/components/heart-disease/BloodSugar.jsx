import { FaCaretUp } from "react-icons/fa";
const BloodSugar = () => {
  return (
    <div>
      <div className="container w-60 flex flex-col gap-2 bg-white p-6 rounded-md shadow-sm">
        <div>
          <div className="bg-orange-200 flex w-10  items-center justify-center p-2 rounded-md">
            <img className="h-5 w-5 " src="/icons/blood-sugar.png" alt="" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Blood Sugar</span>
          <div className="flex items-center justify-between gap-2">
            <FaCaretUp />

            <span className="font-medium">2.8%</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xl font-medium text-orange-400">120</span>
          <span className="text-sm text-gray-500">/160 mm/DL</span>
        </div>
      </div>
    </div>
  );
};

export default BloodSugar;

import { FaHeartbeat } from "react-icons/fa";

const ChornicCondition = () => {
  return (
    <div>
      <div className=" rounded-md shadow-sm bg-gradient-to-r from-orange-800 to-red-500 p-6 flex flex-col ">
        <div className="flex items-center gap-3  ">
          <div className="bg-orange-900 flex items-center justify-center w-16  h-16 rounded-full">
            <FaHeartbeat className="text-white" size={36} />
          </div>
          <span className="text-lg font-medium text-white">Heart Disease</span>
        </div>
        <p className="text-white  text-lg my-4">Chronic conditions</p>
        <div className="flex items-center justify-between mx-8">
          <div className="text-white flex flex-col gap-2 ">
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
          Low Probability of Heart Disease
        </p>
        <hr className="text-white my-6" />
        <div className="text-white flex  justify-between mb-10">
          <div className="flex justify-between flex-col gap-6">
            <span>Chest Pain Type : Non-anginal pain</span>
            <span>Resting BP (mm Hg) : 120</span>
            <span>Serum Cholesterol (mg/dL) : 200</span>
          </div>
          <div className="flex justify-between flex-col gap-6">
            <span>Resting ECG : Normal</span>
            <span>Max Heart Rate : 150</span>
            <span>Oldpeak : 2</span>
          </div>
          <div className="flex justify-between flex-col gap-6">
            <span>ST Segment : Down-sloping</span>
            <span>Major Vessels : 0</span>
            <span>Thalassemia : Reversible defect</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChornicCondition;

import BloodPressure from "./components/heart-disease/BloodPressure";
import BloodSugar from "./components/heart-disease/BloodSugar";
import SymptomsCard from "./components/heart-disease/SymptomsCard";
import ChornicCondition from "./components/heart-disease/ChornicCondition";
import ListAlerts from "./components/heart-disease/ListAlerts";
import PatientDetailCard from "./components/heart-disease/PatientDetailCard";
import HeartChart from "./components/heart-disease/HeartChart";
import BarChart from "./components/heart-disease/BarChart";
import RadarChart from "./components/heart-disease/RadarChart";
import BubbleChart from "./components/heart-disease/BubbleChart";
import GroupedBarChart from "./components/heart-disease/GroupedBarChart ";
import PieChart from "./components/heart-disease/PieChart";

const PatientSummaryHD = () => {
  // Sample Data for Maximum Heart Rate and Blood Pressure
  const heartRateData = [150, 110, 94, 110, 82, 125, 98, 115, 101, 130];
  const bloodPressureData = [118, 142, 128, 154, 130, 148, 132, 160, 122, 140];
  const serumCholesterolData = [
    190, 210, 195, 230, 205, 220, 210, 240, 185, 225,
  ];

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-6">
        <div className="mr-10">
          <ChornicCondition />
        </div>
        <div className="flex gap-6">
          <div className="bg-white w-1/2 h-[350px] rounded-md shadow-sm ">
            <HeartChart
              heartRateData={heartRateData}
              bloodPressureData={bloodPressureData}
              serumCholesterolData={serumCholesterolData}
            />
          </div>
          <div className="bg-white w-[400px]  h-[350px] rounded-md shadow-sm ">
            <BarChart />
          </div>
        </div>
        <div className="flex gap-6">
          <div className="bg-white w-1/2 h-[350px] rounded-md shadow-sm ">
            <RadarChart />
          </div>
          <div className="bg-white w-[400px]  h-[350px] rounded-md shadow-sm ">
            <BubbleChart />
          </div>
        </div>
        <div className="flex gap-6">
          <div className="bg-white w-1/2 h-[350px] rounded-md shadow-sm ">
            <GroupedBarChart />
          </div>
          <div className="bg-white w-[400px]  h-[350px] rounded-md shadow-sm ">
            <PieChart />
          </div>
        </div>
        <div>
          <ListAlerts />
        </div>
      </div>
      <div className="bottom-0 bg-white w-1/4 right-0 mt-[-80px] p-4 rounded-md shadow-sm">
        <PatientDetailCard />
      </div>
    </div>
  );
};

export default PatientSummaryHD;

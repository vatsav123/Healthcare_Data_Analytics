import BloodPressure from "./components/heart-disease/BloodPressure";
import BloodSugar from "./components/heart-disease/BloodSugar";
import SymptomsCard from "./components/heart-disease/SymptomsCard";
import ChornicCondition from "./components/heart-disease/ChornicCondition";
import ListAlerts from "./components/heart-disease/ListAlerts";
import PatientDetailCard from "./components/heart-disease/PatientDetailCard";
import HeartChart from "./components/heart-disease/HeartChart"; // Add this import

const PatientSummaryHD = () => {
  // Sample Data for Maximum Heart Rate and Blood Pressure
  const heartRateData = [150, 140, 130, 150, 160, 125, 140]; // Maximum heart rate in bpm
  const bloodPressureData = [130, 135, 128, 140, 132, 129, 137]; // Blood pressure in mmHg

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-6">
        <div className="flex gap-12">
          <BloodPressure />
          <BloodSugar />
          <SymptomsCard />
        </div>
        <div className="flex gap-12">
          <div className="bg-white w-[530px] h-[350px] rounded-md shadow-sm p-4">
            <HeartChart
              heartRateData={heartRateData}
              bloodPressureData={bloodPressureData}
            />
          </div>
          <ChornicCondition />
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

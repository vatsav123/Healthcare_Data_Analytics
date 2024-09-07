import BloodPressure from "./components/diabetes/BloodPressure";
import Glucose from "./components/diabetes/Glucose";
import SymptomsCard from "./components/diabetes/SymptomsCard";
import ChornicCondition from "./components/diabetes/ChornicCondition";
import ListAlerts from "./components/diabetes/ListAlerts";
import PatientDetailCard from "./components/diabetes/PatientDetailCard";
import DiabetesChart from "./components/diabetes/DiabetesChart";

const PatientSummaryDD = () => {
  return (
    <div className=" flex justify-between">
      <div className="flex flex-col gap-6">
        <div className="flex gap-12">
          <BloodPressure />
          <Glucose />
          <SymptomsCard />
        </div>
        <div className="flex gap-10 mr-12">
          <div className="bg-white w-[530px] h-[350px rounded-md shadow-sm">
            <DiabetesChart />
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

export default PatientSummaryDD;

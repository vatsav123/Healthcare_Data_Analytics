import BloodPressure from "./components/kidney-disease/BloodPressure";
import SerumCreatinine from "./components/kidney-disease/SerumCreatinine";
import SymptomsCard from "./components/kidney-disease/SymptomsCard";
import ChornicCondition from "./components/kidney-disease/ChornicCondition";
import ListAlerts from "./components/kidney-disease/ListAlerts";
import PatientDetailCard from "./components/kidney-disease/PatientDetailCard";
import KidneyChart from "./components/kidney-disease/KidneyChart";

const PatientSummaryKD = () => {
  return (
    <div className=" flex justify-between">
      <div className="flex flex-col gap-6">
        <div className="flex gap-12">
          <BloodPressure />
          <SerumCreatinine />
          <SymptomsCard />
        </div>
        <div className="flex gap-10 mr-12">
          <div className="bg-white w-[530px] h-[350px rounded-md shadow-sm">
            <KidneyChart />
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

export default PatientSummaryKD;

import { useState } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PatientSummaryHD from "./PatientSummaryHD";
import PatientSummaryDD from "./PatientSummaryDD";
import PatientSummaryKD from "./PatientSummaryKD";
import PatientSummaryTable from "./PatientSummaryTable";

const PatientSummaryPage = () => {
  const pageTitle = "Statistics";
  const [activeTab, setActiveTab] = useState("table");
  const [showViewPatientStats, setShowViewPatientStats] = useState(true);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleViewPatientStats = () => {
    setShowViewPatientStats(true);
    setActiveTab("hd"); // Default to Heart Disease Stats tab
  };

  const renderTabContent = () => {
    if (!showViewPatientStats) {
      return (
        <PatientSummaryTable handleViewPatientStats={handleViewPatientStats} />
      );
    }

    switch (activeTab) {
      case "hd":
        return <PatientSummaryHD />;
      case "dd":
        return <PatientSummaryDD />;
      case "kd":
        return <PatientSummaryKD />;
      case "table":
      default:
        return (
          <PatientSummaryTable
            handleViewPatientStats={handleViewPatientStats}
          />
        );
    }
  };

  return (
    <div className=" h-screen">
      <main className="bg-gray-100">
        <Header />
        <Sidebar activePage={pageTitle} />
        <div
          className="flex gap-10 flex-col ml-[285px] pt-24 mr-4 pb-6"
          id="mainpage"
        >
          <div className="flex items-center w-full">
            <span
              className="text-2xl font-semibold cursor-pointer"
              onClick={() => handleTabChange("table")}
            >
              Patient Summary
            </span>
            <div className="ml-4 flex rounded-full bg-gray-200 p-1 text-sm font-medium text-gray-800">
              <button
                className={`px-4 py-1 rounded-full ${
                  activeTab === "hd" ? "bg-white" : ""
                } ${
                  !showViewPatientStats ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => handleTabChange("hd")}
                disabled={!showViewPatientStats}
              >
                Heart Disease Stats
              </button>
              <button
                className={`px-4 py-1 rounded-full ${
                  activeTab === "dd" ? "bg-white" : ""
                } ${
                  !showViewPatientStats ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => handleTabChange("dd")}
                disabled={!showViewPatientStats}
              >
                Diabetes Disease Stats
              </button>
              <button
                className={`px-4 py-1 rounded-full ${
                  activeTab === "kd" ? "bg-white" : ""
                } ${
                  !showViewPatientStats ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => handleTabChange("kd")}
                disabled={!showViewPatientStats}
              >
                Kidney Disease Stats
              </button>
            </div>
          </div>
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default PatientSummaryPage;

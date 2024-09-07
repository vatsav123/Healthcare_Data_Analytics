import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AdmissionsLineChart from "../components/AdmissionsLineChart";
import CalendarComponent from "../components/CalendarComponent";
import PatientDiseasePieChart from "../components/PatientDiseasePieChart";

import {
  FaUser,
  FaBriefcaseMedical,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

const SettingsPage = () => {
  const pageTitle = "Settings";

  return (
    <div className=" h-screen">
      <main className="bg-gray-100">
        <Header />
        <Sidebar activePage={pageTitle} />
        <div
          className="flex gap-10 flex-col ml-[272px] pt-24 mr-4 pb-6"
          id="mainpage"
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-2xl font-semibold"> Dashboard</span>
          </div>
          <div className="flex">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="bg-white p-4 flex flex-col items-center rounded-lg shadow-sm">
                  <div className="flex items-center justify-between gap-12">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <FaUser size={16} color="#14b8a6" />
                      </div>
                      <div className="text-teal-500">Patient</div>
                    </div>
                    <div>
                      <FaArrowRight size={16} color="#666" />
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <p className="text-2xl font-bold m-2 text-teal-500">15</p>
                    <p className="text-teal-500">Admitted Patient</p>
                  </div>
                </div>
                <div className="bg-white p-4 flex flex-col items-center rounded-lg shadow-sm text-blue-500">
                  <div className="flex items-center justify-between gap-12">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <FaBriefcaseMedical size={16} color="#3b82f6 " />
                      </div>
                      <div>Doctor</div>
                    </div>
                    <div>
                      <FaArrowRight size={16} color="#666" />
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <p className="text-2xl font-bold m-2">6</p>
                    <p className="text-blue-500">Available Doctors</p>
                  </div>
                </div>
                <div className="bg-white p-4 flex flex-col items-center rounded-lg shadow-sm text-gray-500">
                  <div className="flex items-center justify-between gap-12">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <FaUsers size={16} color="#666" />
                      </div>
                      <div>User</div>
                    </div>
                    <div>
                      <FaArrowRight size={16} color="#666" />
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <p className="text-2xl font-bold m-2">3</p>
                    <p className="text-gray-600">Total Users</p>
                  </div>
                </div>
                <div className="bg-white p-4 flex flex-col items-center rounded-lg shadow-sm text-red-500">
                  <div className="flex items-center justify-between gap-12">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <FaUsers size={16} color="#ef4444 " />
                      </div>
                      <div>Prediction Model</div>
                    </div>
                    <div>
                      <FaArrowRight size={16} color="#666" />
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <p className="text-2xl font-bold m-2">4</p>
                    <p className="text-red-500">Total Models</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-white w-[400px]  h-[350px] rounded-md shadow-sm ">
                  <AdmissionsLineChart />
                </div>
                <div className="bg-white w-[400px]  h-[350px] rounded-md shadow-sm ">
                  <PatientDiseasePieChart />
                </div>
              </div>
            </div>

            <div className="w-1/3 bg-white ml-8">
              {" "}
              <CalendarComponent />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;

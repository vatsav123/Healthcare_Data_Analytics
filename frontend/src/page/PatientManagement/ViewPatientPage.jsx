import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";

const ViewPatientPage = () => {
  const { patientId } = useParams();
  const pageTitle = "Patient Management";
  const [patientDetails, setPatientDetails] = useState(null);
  const diseases = ["Heart Disease", "Kidney Disease", "Diabetes Disease"];
  const tableData = [
    {
      date: "2023-05-01",
      doctor: "Dr. Smith",
      diagnosis: "Heart Disease",
      risk: "High",
    },
    {
      date: "2023-04-05",
      doctor: "Dr. Johnson",
      diagnosis: "Kidney Disease",
      risk: "Low",
    },
    {
      date: "2023-03-10",
      doctor: "Dr. Lee",
      diagnosis: "Heart Disease",
      risk: "High",
    },
  ];

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(`/api/patients/${patientId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPatientDetails(data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
        setPatientDetails(null); // Clear patientDetails if there's an error
      }
    };
    fetchPatientDetails();
  }, [patientId]);

  return (
    <div className="h-screen">
      <main className="bg-gray-100">
        <Header />
        <Sidebar activePage={pageTitle} />
        <div
          className="flex gap-10 flex-col ml-[272px] pt-24 mr-4 pb-6"
          id="viewPatient"
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-2xl font-semibold">{pageTitle}</span>
          </div>
          <div className="flex gap-6">
            <div className="bg-white p-8 rounded-md shadow-md mt-2 w-1/2">
              <p className="text-xl font-medium mb-6 mt-[-12px]">
                Patient No :&nbsp;{patientId}
              </p>

              <hr className="my-6" />
              {patientDetails ? (
                <div className="flex  ">
                  <div className="flex flex-col mr-36 gap-8">
                    <div className="flex font-medium">
                      <p className="text-gray-500">Name&nbsp;: &nbsp; </p>
                      <p>{patientDetails.name}</p>
                    </div>
                    <div className="flex font-medium">
                      <p className="text-gray-500">Age&nbsp;: &nbsp;</p>
                      <p>{patientDetails.age}</p>
                    </div>
                    <div className="flex font-medium">
                      <p className="text-gray-500">Weight&nbsp;: &nbsp;</p>
                      <p>{patientDetails.weight}Kg</p>
                    </div>
                  </div>
                  <div className="flex flex-col mr-2 gap-8">
                    <div className="flex font-medium">
                      <p className="text-gray-500">Gender&nbsp;: &nbsp; </p>
                      <p>{patientDetails.gender}</p>
                    </div>
                    <div className="flex font-medium">
                      <p className="text-gray-500">
                        Blood Group&nbsp;: &nbsp;{" "}
                      </p>
                      <p>{patientDetails.blood_group}</p>
                    </div>
                    <div className="flex font-medium">
                      <p className="text-gray-500">Height&nbsp;: &nbsp;</p>
                      <p>{patientDetails.height}cm</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p>No patient selected</p>
              )}
            </div>
            <div className="bg-white p-8 rounded-md shadow-md mt-2 w-1/2">
              <p className="text-xl font-medium mb-6 mt-[-12px]">Diagnosis</p>
              <div className="space-y-4">
                {diseases.map((disease, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
                  >
                    <p className="text-md font-medium text-gray-800">
                      {disease}
                    </p>
                    <button className="bg-teal-500 text-sm  text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors">
                      View Full Report
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-md shadow-md  w-full mt-[-20px]">
            <div className="overflow-x-auto">
              <div className="bg-white shadow-md rounded-lg border border-gray-300">
                <div className="border-t border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Doctor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Diagnosis
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Risk
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Report
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tableData.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {item.doctor}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {item.diagnosis}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span
                              className={`p-1 px-4 inline-flex text-xs font-semibold rounded-full ${
                                item.risk === "High"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {item.risk}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="bg-teal-500 text-sm  text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors">
                              View Report
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewPatientPage;

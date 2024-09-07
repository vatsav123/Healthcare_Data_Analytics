import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PatientDropdown = ({ onPatientSelect }) => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/patients");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
        setError("Failed to load patients. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleSelectChange = async (e) => {
    const selectedPatientId = e.target.value;
    console.log("Selected Patient ID:", selectedPatientId);

    const selectedPatient = patients.find(
      (patient) => patient.patient_id.toString() === selectedPatientId
    );

    console.log("Found Patient:", selectedPatient);

    if (selectedPatient) {
      try {
        const response = await fetch(`/api/patients/${selectedPatientId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const detailedPatient = await response.json();
        onPatientSelect(detailedPatient);

        const url = `/analytical-tools/disease-prediction/heart-disease-prediction/${selectedPatientId}`;
        console.log("Navigating to:", url);
        navigate(url);
      } catch (error) {
        console.error("Error fetching detailed patient data:", error);
      }
    } else {
      console.error("Selected patient not found in the list.");
    }
  };

  if (isLoading) return <p>Loading patients...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="relative w-64">
      <label
        htmlFor="patient-select"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Select Patient
      </label>
      <select
        id="patient-select"
        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={handleSelectChange}
        defaultValue=""
      >
        <option value="" disabled>
          Select a patient
        </option>
        {patients.map((patient) => (
          <option key={patient.patient_id} value={patient.patient_id}>
            {patient.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
};

export default PatientDropdown;

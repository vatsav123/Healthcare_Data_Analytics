import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../components/button.jsx";
import PatientTable from "./component/PatientTable.jsx";
import AddPatientModal from "./component/AddPatientModal.jsx";
import { toast } from "react-toastify";

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("");

  const fetchPatients = async () => {
    try {
      const response = await axios.get("/api/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients(); // Fetch patients initially
    const interval = setInterval(fetchPatients, 5000); // Fetch patients every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleAddPatient = (newPatient) => {
    axios
      .post("/api/patients", newPatient)
      .then((response) => {
        setPatients([...patients, response.data]);
        setShowAddModal(false);
        toast.success("Patient added successfully!");
      })
      .catch((error) => {
        console.error("Error adding patient:", error);
        toast.error("Error adding patient. Please try again.");
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (event) => {
    setFilterBy(event.target.value);
  };

  // Simplify the filtering logic using an object
  const filterOptions = {
    id: (patient) =>
      patient.patient_id &&
      patient.patient_id
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    name: (patient) =>
      patient.name &&
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()),
    age: (patient) =>
      patient.age &&
      patient.age.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    gender: (patient) =>
      patient.gender &&
      patient.gender.toLowerCase().includes(searchTerm.toLowerCase()),
    diagnosis: (patient) =>
      patient.diagnosis &&
      patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()),
    admission_date: (patient) =>
      patient.admission_date &&
      patient.admission_date.toLowerCase().includes(searchTerm.toLowerCase()),
  };

  const filteredPatients = patients.filter((patient) => {
    if (filterBy && searchTerm) {
      return filterOptions[filterBy](patient);
    } else if (!filterBy && searchTerm) {
      // No filter applied, search across all fields
      return Object.values(filterOptions).some((filterFunc) =>
        filterFunc(patient)
      );
    } else {
      // No filter or search term provided, return all patients
      return true;
    }
  });

  return (
    <div className="px-2 w-full">
      <div className="mb-6 flex items-center justify-between">
        <div className=" flex">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-400 px-3 py-2 rounded mr-2 w-2/3 focus:outline-none"
          />
          <select
            value={filterBy}
            onChange={handleFilter}
            className="border border-gray-400 px-3 py-2 rounded focus:outline-none"
          >
            <option value="">Filter by...</option>
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="age">Age</option>
            <option value="gender">Gender</option>
            <option value="diagnosis">Diagnosis</option>
            <option value="admission_date">Admission Date</option>
          </select>
        </div>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          Add Patient
        </Button>
      </div>

      <PatientTable patients={filteredPatients} />
      <AddPatientModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddPatient}
      />
    </div>
  );
};

export default PatientManagement;

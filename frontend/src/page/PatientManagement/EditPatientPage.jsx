/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const EditPatientPage = ({ patient, onSubmit }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");

  useEffect(() => {
    if (patient) {
      setName(patient.name);
      setAge(patient.age);
      setGender(patient.gender);
      setEmail(patient.email);
      setPhone(patient.phone);
      setAddress(patient.address);
      setDiagnosis(patient.diagnosis);
      setAdmissionDate(patient.admission_date);
    }
  }, [patient]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPatient = {
      patient_id: patient.patient_id,
      name,
      age: parseInt(age),
      gender,
      email,
      phone,
      address,
      diagnosis,
      admission_date: admissionDate,
    };
    onSubmit(updatedPatient);
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Edit Patient</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-400 px-3 py-2 rounded w-full"
            required
          />
        </div>
        {/* Other form fields similar to AddPatientModal */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPatientPage;

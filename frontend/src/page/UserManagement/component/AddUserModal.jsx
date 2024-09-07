/* eslint-disable react/prop-types */
import { useState } from "react";

const AddUserModal = ({ show, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [admission_date, setAdmissionDate] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPatient = {
      name,
      dateOfBirth,
      age: parseInt(age),
      gender,
      email,
      phone,
      address,
      admission_date,
      bloodGroup,
      height,
      weight,
    };
    onSubmit(newPatient);
    clearForm();
    console.log(newPatient);
  };

  const clearForm = () => {
    setName("");
    setDateOfBirth("");
    setAge("");
    setGender("");
    setEmail("");
    setPhone("");
    setAddress("");
    setAdmissionDate("");
    setBloodGroup("");
    setHeight("");
    setWeight("");
  };

  if (!show) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>

      <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
          <h2 className="text-2xl font-bold mb-6">Add Patient</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block font-semibold mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="age" className="block font-semibold mb-2">
                Age
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="gender" className="block font-semibold mb-2">
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label htmlFor="email" className="block font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block font-semibold mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="address" className="block font-semibold mb-2">
                Address
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="bloodGroup" className="block font-semibold mb-2">
                Blood Group
              </label>
              <select
                id="bloodGroup"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div>
              <label htmlFor="height" className="block font-semibold mb-2">
                Height (cm)
              </label>
              <input
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="weight" className="block font-semibold mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="addmissionDate"
                className="block font-semibold mb-2"
              >
                Admission Date
              </label>
              <input
                type="date"
                id="addmissionDate"
                value={admission_date}
                onChange={(e) => setAdmissionDate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="col-span-2 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Add Patient
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddUserModal;

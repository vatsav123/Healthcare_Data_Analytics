import { useEffect, useState } from "react";
import axios from "axios";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

const EditPatientPage = () => {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const userId = localStorage.getItem("userId"); // Retrieve userId from local storage

  // Function to fetch data from the API
  const fetchData = () => {
    if (userId) {
      axios
        .get(`/api/account-settings/${userId}`)
        .then((response) => {
          const data = response.data;

          // Convert dateOfBirth to YYYY-MM-DD format
          const date = new Date(data.dateOfBirth);
          const formattedDateOfBirth = date.toISOString().split("T")[0];

          setName(data.name || "");
          setDateOfBirth(formattedDateOfBirth || "");
          setAge(data.age || "");
          setGender(data.gender || "");
          setEmail(data.email || "");
          setPhone(data.phone || "");
          setAddress(data.address || "");
          setUsername(data.username || "");
          setPassword(data.password || "");
          setRole(data.role || "");
        })
        .catch((error) => console.error("Error fetching account data:", error));
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      name,
      dateOfBirth,
      age: parseInt(age),
      gender,
      email,
      phone,
      address,
      username,
      password,
      role,
    };

    if (userId) {
      axios
        .put(`/api/account-settings/${userId}`, updatedData)
        .then((response) => {
          toast.success("Account settings updated successfully!");
        })
        .catch((error) => {
          toast.error("Error updating account settings. Please try again.");
        });
    }
  };

  const handleCancel = () => {
    fetchData(); // Refetch data to reset form
  };

  return (
    <div className="overflow-y-auto flex ">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full">
        <div className="flex items-center mb-6">
          <div className="bg-gray-300 rounded-full w-32 h-32 mr-10">Image</div>
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-5 font-medium">
            <FiUpload className="mr-2" />
            Upload
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 font-medium">
            <FiTrash2 className="mr-2" />
            Remove
          </button>
        </div>
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
            <label htmlFor="username" className="block font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block font-semibold mb-2">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none  disabled"
              disabled
            >
              <option value="">{role}</option>
            </select>
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPatientPage;

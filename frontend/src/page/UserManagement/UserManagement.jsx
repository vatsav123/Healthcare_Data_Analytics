import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../components/button.jsx";
import UserTable from "./component/UserTable.jsx";
import AddUserModal from "./component/AddUserModal.jsx"; // Adjusted to User context
import { toast } from "react-toastify";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users"); // Adjusted to fetch users
      setUsers(response.data);
      console.log("Users fetched:", response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users initially
    const interval = setInterval(fetchUsers, 5000); // Fetch users every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleAddUser = (newUser) => {
    axios
      .post("/api/users", newUser) // Adjusted to add users
      .then((response) => {
        setUsers([...users, response.data]);
        setShowAddModal(false);
        toast.success("User added successfully!");
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        toast.error("Error adding user. Please try again.");
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (event) => {
    setFilterBy(event.target.value);
  };

  // Adjusted filter options to match user data structure
  const filterOptions = {
    id: (user) =>
      user.userId &&
      user.userId.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    username: (user) =>
      user.username &&
      user.username.toLowerCase().includes(searchTerm.toLowerCase()),
    email: (user) =>
      user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    role: (user) =>
      user.role && user.role.toLowerCase().includes(searchTerm.toLowerCase()),
    createdAt: (user) =>
      user.createdAt &&
      user.createdAt.toLowerCase().includes(searchTerm.toLowerCase()),
  };

  const filteredUsers = users.filter((user) => {
    if (filterBy && searchTerm) {
      return filterOptions[filterBy](user);
    } else if (!filterBy && searchTerm) {
      // No filter applied, search across all fields
      return Object.values(filterOptions).some((filterFunc) =>
        filterFunc(user)
      );
    } else {
      // No filter or search term provided, return all users
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
            <option value="username">UserName</option>
            <option value="email">Email</option>
            <option value="role">Role</option>
            <option value="createdAt">Created At</option>
          </select>
        </div>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          Add User
        </Button>
      </div>

      <UserTable users={filteredUsers} />
      <AddUserModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddUser}
      />
    </div>
  );
};

export default UserManagement;

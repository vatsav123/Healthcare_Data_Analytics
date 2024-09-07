import { FaSearch, FaBell } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center text-sm fixed w-full ml-64">
      <div className="relative flex items-center ">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-200 text-gray-700 px-3 py-2 rounded-full focus:outline-none transition-colors duration-300 w-96"
        />
        <button className="ml-2 bg-teal-500 text-white rounded-full p-2 hover:bg-teal-600 transition-colors duration-300">
          <FaSearch />
        </button>
      </div>
      <div className="flex items-center space-x-4 gap-3 ml-4 mr-64">
        <div className="relative">
          <button className="relative bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition-colors duration-300">
            <FaBell size={20} />
            <div className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 flex justify-center items-center rounded-full text-xs">
              3
            </div>
          </button>
        </div>
        <div className="font-semibold text-gray-600">Profile</div>
        <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
         VV
        </div>
      </div>
    </header>
  );
};

export default Header;

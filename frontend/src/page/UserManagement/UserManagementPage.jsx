import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import UserManagement from "./UserManagement";

const UserManagementPage = () => {
  const pageTitle = "User Management";

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
            <span className="text-2xl font-semibold">User Management</span>
          </div>
          <UserManagement />
        </div>
      </main>
    </div>
  );
};

export default UserManagementPage;

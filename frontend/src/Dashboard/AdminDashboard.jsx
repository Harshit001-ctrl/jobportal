import { useState } from "react";
import { AddJobForm } from "../AdminDashboard comp/AddJobForm";
import { ApplicationsList } from "../AdminDashboard comp/ApplicationList";
import { Sidebar } from "../AdminDashboard comp/Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Spinner";

const AdminLogin = () => {
  const [activeTab, setActiveTab] = useState("addJob");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleJobAdded = () => {
    // Show success toast when job is added
    toast.success("Job added successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: true,
      theme: "colored",
    });

    setIsSidebarOpen(false);

    setActiveTab("applications");
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex-1 p-6 lg:pl-8 lg:pr-8 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-semibold text-gray-800 tracking-tight">
            {activeTab === "addJob" ? "Add Job" : "Applications List"}
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeTab === "addJob" && <AddJobForm onJobAdded={handleJobAdded} />}
          {activeTab === "applications" && <ApplicationsList />}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

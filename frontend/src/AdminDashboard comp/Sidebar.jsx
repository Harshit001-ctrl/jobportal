/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, PlusCircle, Users } from "lucide-react";

export function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }) {
  return (
    <aside
      className={`bg-white shadow-xl p-5 transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      } h-screen flex flex-col`}
    >
      {/* Sidebar Header */}
      <div className="flex justify-between items-center mb-6">
        {isOpen && <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="ml-auto hover:bg-gray-200"
        >
          {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="space-y-2 flex flex-col">
        <Button
          variant={activeTab === "addJob" ? "default" : "ghost"}
          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
            activeTab === "addJob"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("addJob")}
        >
          <PlusCircle className="h-5 w-5" />
          {isOpen && <span className="text-sm font-medium">Add Job</span>}
        </Button>

        <Button
          variant={activeTab === "applications" ? "default" : "ghost"}
          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
            activeTab === "applications"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("applications")}
        >
          <Users className="h-5 w-5" />
          {isOpen && <span className="text-sm font-medium">Applications</span>}
        </Button>
      </nav>
    </aside>
  );
}

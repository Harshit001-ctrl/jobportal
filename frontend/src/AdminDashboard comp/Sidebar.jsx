/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, PlusCircle, Users } from "lucide-react"

export function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }) {
    return (
        <aside className={`bg-white shadow-md p-6 transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>
          <div className="flex justify-between items-center mb-6">
            {isOpen && <h2 className="text-xl font-semibold">Menu</h2>}
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="ml-auto">
              {isOpen ? <ChevronLeft /> : <ChevronRight />}
            </Button>
          </div>
          <nav className="space-y-2">
            <Button
              variant={activeTab === "addJob" ? "default" : "ghost"}
              className={`w-full justify-start ${!isOpen && "px-2"}`}
              onClick={() => setActiveTab("addJob")}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              {isOpen && "Add Job"}
            </Button>
            <Button
              variant={activeTab === "applications" ? "default" : "ghost"}
              className={`w-full justify-start ${!isOpen && "px-2"}`}
              onClick={() => setActiveTab("applications")}
            >
              <Users className="mr-2 h-4 w-4" />
              {isOpen && "Applications"}
            </Button>
          </nav>
        </aside>
      );
}

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import axios from "axios";

export function ApplicationsList() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/job-applications");
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const deleteApplication = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/job-applications/${id}`);
      setApplications(applications.filter((app) => app.id !== id)); // Update UI immediately
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <Card className="max-w-5xl mx-auto p-6 shadow-lg border border-gray-200 rounded-2xl bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800 text-center">
          📄 Received Applications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="w-full border-collapse">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="p-3 text-left font-semibold text-gray-700">Name</TableHead>
                <TableHead className="p-3 text-left font-semibold text-gray-700">Email</TableHead>
                <TableHead className="p-3 text-left font-semibold text-gray-700">Phone</TableHead>
                <TableHead className="p-3 text-left font-semibold text-gray-700">Resume</TableHead>
                <TableHead className="p-3 text-left font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id} className="border-b hover:bg-gray-50 transition">
                  <TableCell className="p-3 text-gray-800">{app.first_name} {app.last_name}</TableCell>
                  <TableCell className="p-3 text-gray-800">{app.email}</TableCell>
                  <TableCell className="p-3 text-gray-800">{app.phone}</TableCell>
                  <TableCell className="p-3">
                    <a
                      href={`http://localhost:8000/storage/${app.resume}`}
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      View Resume
                    </a>
                  </TableCell>
                  <TableCell className="p-3">
                    <Button
                      variant="destructive"
                      onClick={() => deleteApplication(app.id)}
                      className="bg-red-200 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Delete ❌
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

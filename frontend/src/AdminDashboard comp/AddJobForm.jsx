import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AddJobForm({ onJobAdded }) {
  const [formData, setFormData] = useState({
    company_name: "",
    title: "",
    description: "",
    experience: "",
    salary: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("❌ Admin token is missing. Please log in first!");
      setLoading(false);
      return;
    }

    const jobData = { ...formData, salary: formData.salary || null };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/post-job",
        jobData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success(`✅ Job "${formData.title}" posted successfully!`);
        onJobAdded();

        setFormData({
          company_name: "",
          title: "",
          description: "",
          experience: "",
          salary: "",
          location: "",
        });
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Post Job Error:", error);

      if (!error.response) {
        // toast.error("🚨 Network error! Please check your connection.");
      } else if (error.response.status === 422) {
        const errors = Object.values(error.response.data.errors).flat();
        errors.forEach((err) => toast.error(`❌ ${err}`));
      } else {
        toast.error(error.response?.data?.message || "❌ Failed to post job!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="max-w-lg mx-auto p-6 shadow-md border border-gray-200 rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">
            Add New Job
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="company_name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="title">Job Name</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="experience">Experience</Label>
              <Input
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="salary">Salary</Label>
              <Input
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Job"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

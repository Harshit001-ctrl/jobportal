import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

export const ApplyJobForm = ({ jobId, onClose }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    resume: null,
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const formRef = useRef(null); // Reference for form container

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose(); // Close form when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("job_id", jobId);
    formDataToSend.append("first_name", formData.first_name);
    formDataToSend.append("last_name", formData.last_name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("resume", formData.resume);

    try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/jobs/${jobId}/apply`, // Include job ID dynamically
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      
        if (response.status === 201) {
          setSuccessMessage("✅ Application submitted successfully!");
          setTimeout(() => {
            setSuccessMessage("");
            onClose(); // Close the form after success
          }, 1000);
        }
      } catch (error) {
        console.error("Application Error:", error);
        alert("❌ Failed to submit application. Try again.");
      } finally {
        setLoading(false);
      }
      
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div ref={formRef} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Apply for Job</h2>
        {successMessage && <p className="text-green-600">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="job_id" value={jobId} />

          <div>
            <label className="block">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="block">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="block">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="block">Resume (PDF only)</label>
            <input
              type="file"
              name="resume"
              accept=".pdf"
              onChange={handleFileChange}
              required
              className="border p-2 w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full"
          >
            {loading ? "Submitting..." : "Apply"}
          </button>
        </form>
      </div>
    </div>
  );
};

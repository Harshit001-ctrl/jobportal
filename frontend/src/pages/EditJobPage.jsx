import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    location: "",
    description: "",
    salary: "",
    company_name: "",
    experience: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/jobs/${id}`
        );
        const job = response.data;

        setFormData({
          title: job.title || "",
          location: job.location || "",
          description: job.description || "",
          salary: job.salary || "",
          company_name: job.company_name || "",
          experience: job.experience || "",
        });
      } catch (err) {
        setError("Failed to load job details.");
        toast.error("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.put(`http://127.0.0.1:8000/api/jobs/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Job updated successfully!");
      navigate(`/jobs/${id}`);
    } catch (err) {
      setError("Failed to update job.");
      alert("Failed to update job.");
      console.error("Error updating job:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Update Job
            </h2>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                className="border rounded w-full py-2 px-3"
                placeholder="Job title"
                required
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Description
              </label>
              <textarea
                name="description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Job description"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Salary
              </label>
              <input
                type="text"
                name="salary"
                className="border rounded w-full py-2 px-3"
                placeholder="Salary"
                required
                value={formData.salary}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                className="border rounded w-full py-2 px-3"
                placeholder="Location"
                required
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>

            <h3 className="text-2xl mb-5">Company Info</h3>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="company_name"
                className="border rounded w-full py-2 px-3"
                placeholder="Company Name"
                value={formData.company_name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full"
                type="submit"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditJobPage;

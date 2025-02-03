import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomeCards = () => {
  const [jobs, setJobs] = useState([]); // Stores job listings
  const [searchTerm, setSearchTerm] = useState(""); // Stores search input
  const [filteredJobs, setFilteredJobs] = useState([]); // Stores filtered results

  // Placeholder jobs (if backend fails)
  const placeholderJobs = [
    { id: 1, title: "Frontend Developer", company_name: "Tech Corp", location: "Remote", salary: "80,000" },
    { id: 2, title: "Backend Developer", company_name: "Innovate Ltd", location: "New York", salary: "90,000" },
    { id: 3, title: "Full-Stack Engineer", company_name: "StartupX", location: "San Francisco", salary: "100,000" },
  ];

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://your-laravel-backend/api/jobs");
        const data = await response.json();
        if (data.length > 0) {
          setJobs(data);
          setFilteredJobs(data);
        } else {
          throw new Error("No jobs found");
        }
      } catch (error) {
        console.error("Error fetching jobs, using placeholders:", error);
        setJobs(placeholderJobs);
        setFilteredJobs(placeholderJobs);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs when search term changes
  useEffect(() => {
    const results = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(results);
  }, [searchTerm, jobs]);

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">Find Your Dream Job</h2>
        </div>

        {/* 🔍 Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search jobs"
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-700">{job.title}</h3>
                <p className="text-gray-500">{job.company_name}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Location: {job.location || "Not specified"}
                </p>
                <p className="text-sm text-gray-600">
                  Salary: {job.salary ? `$${job.salary}` : "Negotiable"}
                </p>
                <Link
                  to={`/jobs/${job.id}`}
                  className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  View Job
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No jobs found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeCards;

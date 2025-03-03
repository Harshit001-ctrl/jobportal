import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredJobs, setFilteredJobs] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/jobs");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch jobs");
        }

        if (data.jobs && data.jobs.length > 0) {
          setJobs(data.jobs);
          setFilteredJobs(data.jobs);
        } else {
          throw new Error("No jobs found");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const results = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(results);
  }, [searchTerm, jobs]);

  const displayJobs = isHome ? filteredJobs.slice(0, 4) : filteredJobs;

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            {isHome ? "Featured Jobs" : "All Jobs"}
          </h2>
        </div>

        {!isHome && (
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search jobs"
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        {loading && <p className="text-center text-gray-500">Loading jobs...</p>}

        {error && !loading && (
          <p className="text-center text-red-500">{error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {!loading && !error && displayJobs.length > 0 ? (
            displayJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-700">
                  {job.title}
                </h3>
                <p className="text-gray-500">{job.description}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Experience: {job.experience || "Not specified"}
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
            !loading && !error && (
              <p className="text-center text-gray-500 col-span-2">
                No jobs found.
              </p>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default JobListings;

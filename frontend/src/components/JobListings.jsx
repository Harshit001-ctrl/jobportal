import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

const JobListings = ({ isHome = false }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/jobs");
      const data = await response.json();

      if (data.jobs && data.jobs.length > 0) {
        return data.jobs;
      } else {
        throw new Error("No jobs found");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const {
    data: jobs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
    staleTime: 3000,
    onError: (err) => {
      console.error("Error fetching jobs:", err);
    },
  });

  const filteredJobs = useMemo(() => {
    if (!jobs) return [];
    return jobs.filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, jobs]);

  const displayJobs = isHome ? filteredJobs.slice(0, 4) : filteredJobs;

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 py-10">Error: {error.message}</p>
    );
  }

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayJobs.length > 0 ? (
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
            <p className="text-center text-gray-500 col-span-2">
              No jobs found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobListings;

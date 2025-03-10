import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import axios from "axios";
import { ApplyJobForm } from "./ApplyJobForm";
import Spinner from "../components/Spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const JobPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const formRef = useRef(null);

  const fetchJobDetails = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/jobs/${id}`);
    return response.data;
  };

  const {
    data: job,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobDetails(),
    staleTime: 1000,
    retry: 2,
    onError: (err) => {
      console.error("Fetch Error:", err.response ? err.response.data : err);
    },
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowApplyForm(false);
      }
    };

    if (showApplyForm) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showApplyForm]);

  const deleteJob = async () => {
    await axios.delete(`http://127.0.0.1:8000/api/jobs/${id}`);
    alert("Job deleted successfully");
    navigate("/jobs");
  };

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteJob(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(["job", id], (e) => {
        return e?.filter((job) => job.id != id);
      });
    },
    onError: (err) => {
      console.error("Delete Error:", err.response ? err.response.data : err);
    },
  });

  if (isLoading)
    return (
      <p className="text-center py-10">
        <Spinner />
      </p>
    );
  if (isError)
    return <p className="text-center text-red-500 py-10">{isError}</p>;
  if (!job)
    return <p className="text-center text-red-500 py-10">Job not found.</p>;

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <h1 className="text-3xl font-bold mb-4">
                  {job.title || "Untitled Job"}
                </h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="text-orange-700 mr-1" />
                  <p className="text-orange-700">
                    {job.location || "Location not specified"}
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>
                <p className="mb-4">
                  {job.description || "No description available."}
                </p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Experience Required
                </h3>
                <p className="mb-4">
                  {job.experience ? `${job.experience} years` : "Not specified"}
                </p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Salary
                </h3>
                <p className="mb-4">
                  {job.salary
                    ? `$${job.salary} / Year`
                    : "Salary not specified"}
                </p>
              </div>
            </main>

            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>
                <h2 className="text-2xl">
                  {job.company_name || "Unknown Company"}
                </h2>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>

                {user?.role === "admin" ? (
                  <>
                    <Link
                      to={`/edit-job/${job.id}`}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                    >
                      Edit Job
                    </Link>
                    <button
                      onClick={() => deleteMutation.mutate(id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                    >
                      Delete Job
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full"
                      onClick={() => setShowApplyForm(true)}
                    >
                      Apply for Job
                    </button>
                    {showApplyForm && (
                      <div ref={formRef}>
                        <ApplyJobForm
                          jobId={job.id}
                          onClose={() => setShowApplyForm(false)}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobPage;

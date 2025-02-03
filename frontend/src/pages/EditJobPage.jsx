import { useState, useEffect } from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditJobPage = ({ updateJobSubmit }) => {
    const job = useLoaderData();
    const navigate = useNavigate();
    const { id } = useParams();

    // Loading state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // State for form fields
    const [formData, setFormData] = useState({
        title: job?.title || '',
        type: job?.type || '',
        location: job?.location || '',
        description: job?.description || '',
        salary: job?.salary || '',
        companyName: job?.company?.name || '',
        companyDescription: job?.company?.description || '',
        contactEmail: job?.company?.contactEmail || '',
        contactPhone: job?.company?.contactPhone || ''
    });

    useEffect(() => {
        // Reset form data when the job is loaded (or reloaded)
        if (job) {
            setFormData({
                title: job.title,
                type: job.type,
                location: job.location,
                description: job.description,
                salary: job.salary,
                companyName: job.company?.name,
                companyDescription: job.company?.description,
                contactEmail: job.company?.contactEmail,
                contactPhone: job.company?.contactPhone
            });
        }
    }, [job]);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Form submission handler
    const submitForm = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        const updatedJob = {
            id,
            title: formData.title,
            type: formData.type,
            location: formData.location,
            description: formData.description,
            salary: formData.salary,
            company: {
                name: formData.companyName,
                description: formData.companyDescription,
                contactEmail: formData.contactEmail,
                contactPhone: formData.contactPhone
            }
        };

        try {
            await updateJobSubmit(updatedJob); // Call the passed updateJobSubmit function
            toast.success('Job Updated Successfully');
            navigate(`/jobs/${id}`); // Redirect after update
        } catch (err) {
            setError('Failed to update job');
            toast.error('Failed to update job');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    return (
        <section className="bg-indigo-50">
            <div className="container m-auto max-w-2xl py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <form onSubmit={submitForm}>
                        <h2 className="text-3xl text-center font-semibold mb-6">Update Job</h2>

                        {error && <div className="text-red-500 mb-4">{error}</div>} {/* Error display */}

                        <div className="mb-4">
                            <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Job Type</label>
                            <select
                                id="type"
                                name="type"
                                className="border rounded w-full py-2 px-3"
                                required
                                value={formData.type}
                                onChange={handleInputChange}
                            >
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Remote">Remote</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Job Listing Name</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="border rounded w-full py-2 px-3 mb-2"
                                placeholder="eg. Beautiful Apartment In Miami"
                                required
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                className="border rounded w-full py-2 px-3"
                                rows="4"
                                placeholder="Add any job duties, expectations, requirements, etc"
                                value={formData.description}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="salary" className="block text-gray-700 font-bold mb-2">Salary</label>
                            <select
                                id="salary"
                                name="salary"
                                className="border rounded w-full py-2 px-3"
                                required
                                value={formData.salary}
                                onChange={handleInputChange}
                            >
                                <option value="Under $50K">Under $50K</option>
                                <option value="$50K - 60K">$50K - $60K</option>
                                <option value="$60K - 70K">$60K - $70K</option>
                                <option value="$70K - 80K">$70K - $80K</option>
                                <option value="$80K - 90K">$80K - $90K</option>
                                <option value="$90K - 100K">$90K - $100K</option>
                                <option value="$100K - 125K">$100K - $125K</option>
                                <option value="$125K - 150K">$125K - $150K</option>
                                <option value="$150K - 175K">$150K - $175K</option>
                                <option value="$175K - $200K">$175K - $200K</option>
                                <option value="Over $200K">Over $200K</option>
                            </select>
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>Location</label>
                            <input
                                type='text'
                                id='location'
                                name='location'
                                className='border rounded w-full py-2 px-3 mb-2'
                                placeholder='Company Location'
                                required
                                value={formData.location}
                                onChange={handleInputChange}
                            />
                        </div>

                        <h3 className="text-2xl mb-5">Company Info</h3>

                        <div className="mb-4">
                            <label htmlFor="companyName" className="block text-gray-700 font-bold mb-2">Company Name</label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                className="border rounded w-full py-2 px-3"
                                placeholder="Company Name"
                                value={formData.companyName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="companyDescription" className="block text-gray-700 font-bold mb-2">Company Description</label>
                            <textarea
                                id="companyDescription"
                                name="companyDescription"
                                className="border rounded w-full py-2 px-3"
                                rows="4"
                                placeholder="What does your company do?"
                                value={formData.companyDescription}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="contactEmail" className="block text-gray-700 font-bold mb-2">Contact Email</label>
                            <input
                                type="email"
                                id="contactEmail"
                                name="contactEmail"
                                className="border rounded w-full py-2 px-3"
                                placeholder="Email address for applicants"
                                required
                                value={formData.contactEmail}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="contactPhone" className="block text-gray-700 font-bold mb-2">Contact Phone</label>
                            <input
                                type="tel"
                                id="contactPhone"
                                name="contactPhone"
                                className="border rounded w-full py-2 px-3"
                                placeholder="Optional phone for applicants"
                                value={formData.contactPhone}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <button
                                className="bg-indigo-500 hover:bg-indigo-600 text-white 
                                font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                {loading ? 'Updating...' : 'Update Job'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default EditJobPage;

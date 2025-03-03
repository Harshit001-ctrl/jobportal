const jobLoader = async ({ params }) => {
    try {
        const res = await fetch(`/api/jobs/${params.id}`);
        if (!res.ok) {
            throw new Error("Failed to fetch job data");
        }

        const data = await res.json();

        if (!data || Object.keys(data).length === 0) {
            throw new Error("Job not found");
        }

        return data;  
    } catch (error) {
        console.error("Error loading job:", error.message);
        return { error: error.message };  
    }
};

export { jobLoader };

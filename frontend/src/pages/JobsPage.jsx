import React, { Suspense, lazy } from "react";
import Spinner from "../components/Spinner";
const JobListings=lazy(() => import("../components/JobListings"));

const JobsPage = () => {
  return (
    <section className="bg-blue-50 px-4 py-6">
      <Suspense fallback={<Spinner />}>
        <JobListings />
      </Suspense>
    </section>
  );
};

export default JobsPage;

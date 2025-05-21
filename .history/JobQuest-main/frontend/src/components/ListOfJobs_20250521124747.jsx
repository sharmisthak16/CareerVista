import { useState, useEffect } from "react";
import axios from "axios";
const ListOfJobs = () => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobListings = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/service/joblist`,
          {}, 
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
        const jobs = response.data.jobs.results;

        if (Array.isArray(jobs)) {
          setJobListings(jobs);
        } else {
          setError("Invalid job listings data");
        }
      } catch (err) {
        console.error("Error fetching job listings:", err);
        setError("Failed to fetch job listings");
      } finally {
        setLoading(false);
      }
    };

    fetchJobListings();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl text-gray-500 py-5">
        Loading job listings...
      </div>
    ); // Show loading message while fetching data
  }

  if (error) {
    return <div className="text-center text-xl text-red-500 py-5">{error}</div>; // Show error message if something went wrong
  }

  if (!jobListings.length) {
    return (
      <div className="text-center text-xl text-gray-500 py-5">
        No job listings available
      </div>
    ); // Handle the case when no job listings are found
  }
  return (
    <div className="container mx-auto p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobListings.map((job, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
            <p className="text-gray-600">{job.company?.display_name}</p>
            <p className="text-gray-500">{job.location?.display_name}</p>
            <a
              href={job.redirect_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-blue-500 hover:text-blue-700"
            >
              Apply here
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOfJobs;

import { useState, useEffect } from "react";
import axios from "axios";

const ListOfJobs = () => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobListings = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to view job listings");
        setLoading(false);
        return;
      }

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

        // Check if response.data and response.data.jobs exist
        if (!response.data || !response.data.jobs) {
          setError("Invalid response format from server");
          setLoading(false);
          return;
        }

        // Check if response.data.jobs.results exists and is an array
        const jobs = response.data.jobs.results;
        if (Array.isArray(jobs)) {
          setJobListings(jobs);
        } else {
          console.error("Invalid jobs data:", response.data);
          setError("Invalid job listings data format");
        }
      } catch (err) {
        console.error("Error fetching job listings:", err);
        const errorMessage = err.response?.data?.error || "Failed to fetch job listings";
        setError(errorMessage);
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
    );
  }

  if (error) {
    return (
      <div className="text-center text-xl text-red-500 py-5">
        Error: {error}
      </div>
    );
  }

  if (!jobListings.length) {
    return (
      <div className="text-center text-xl text-gray-500 py-5">
        No job listings available
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold text-center mb-6">Available Job Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobListings.map((job, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
            <p className="text-gray-600">{job.company?.display_name || "Company not specified"}</p>
            <p className="text-gray-500">{job.location?.display_name || "Location not specified"}</p>
            <div className="mt-3">
              <a
                href={job.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Apply Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOfJobs;

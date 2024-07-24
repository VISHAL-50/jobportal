import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Jobs() {
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    fetchJobList();
  }, []);

  const fetchJobList = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/joblist");
      setJobList(response.data);
    } catch (error) {
      console.error("Error fetching job list:", error);
    }
  };

  return (
    <section className="jobs">
      <h1 className="heading">Get a job Beggars</h1>
      <div className="box-container">
        {jobList.map((job) => (
          <div key={job._id} className="box">
            <p>
              <i class="fas fa-location-dot"></i>
              {job.type}
            </p>
            <h3>{job.title}</h3>
            <h5>{job.location}</h5>

            <p>{job.description.split(" ").slice(0, 30).join(" ")}...</p>

            <Link to="/jobs/apply" state={job._id} className="btn">
              more details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

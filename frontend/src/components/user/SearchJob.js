import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function SearchJob() {
  const location = useLocation();
  const searchVal = location.state;

  const [jobList, setJobList] = useState([]);
  const [heading, setHeading] = useState("");

  useEffect(() => {
    fetchJobList();
  }, [searchVal]);

  const fetchJobList = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/searchjoblist",
        {
          data: { title: searchVal },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        setJobList(response.data.jobs);
        setHeading(response.data.message);
      } else {
        console.log(response.data);
        setJobList([]); // Ensure jobList is initialized as an empty array
        setHeading(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching job list:", error.message);
      setJobList([]); // Ensure jobList is initialized as an empty array
      setHeading("Error fetching job list");
    }
  };

  return (
    <section className="jobs">
      <h1 className="heading">{heading}</h1>
      <div className="box-container">
        {Array.isArray(jobList) && jobList.length > 0 ? (
          jobList.map((job) => (
            <div key={job._id} className="box">
              <p>
                <i className="fas fa-location-dot"></i>
                {job.type}
              </p>
              <h3>{job.title}</h3>
              <h5>{job.location}</h5>
              <p>{job.description.split(" ").slice(0, 30).join(" ")}...</p>
              <Link to="/jobs/apply" state={job._id} className="btn">
                More Details
              </Link>
            </div>
          ))
        ) : (
          <div className="box">
            <p>No jobs found</p>
          </div>
        )}
      </div>
    </section>
  );
}

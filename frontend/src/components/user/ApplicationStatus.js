import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function ApplicationStatus() {
  //   const [userData, setUserData] = useState();
  const [jobList, setJobList] = useState([]);

  //   useEffect(() => {}, []);
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  console.log(storedUserData.id);

  useEffect(() => {
    fetchJobList();
  }, []);

  const fetchJobList = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/jobapplylist",
        { id: storedUserData.id }
      );
      setJobList(response.data);
    } catch (error) {
      console.error("Error fetching job list:", error);
    }
  };

  return (
    <section className="jobs">
      <h1 className="heading">Application Status</h1>
      <div className="box-container">
        {jobList.map((job) => (
          <div key={job._id} className="box">
            <h3>Title: {job.title}</h3>

            <p>
              Description: {job.description.split(" ").slice(0, 30).join(" ")}
              ...
            </p>

            <span className="">Status: {job.status}</span>

            <Link to="/jobs/apply" state={job.jobid} className="btn">
              more details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

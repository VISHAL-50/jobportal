import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
export default function Rjobs() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  if (!auth) {
    toast("Please Login!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigate("/login"); // Navigate to the login page if user is not logged in
  }
  const [jobList, setJobList] = useState([]);
  const handleDeleteJob = async (jobId) => {
    try {
      // Send a DELETE request with job ID in the request body
      const response = await axios.delete(
        "http://localhost:3001/api/jobdelete",
        {
          data: { id: jobId }, // Send job ID in the request body
        }
      );
      toast.success("Job delete successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      // console.log(response.data); // Log the response data if needed

      // Update the job list after deleting the job
      // setJobList(jobList.filter(job => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Error deleting job: " + error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      // alert('Error deleting job: ' + error.message);
    }
  };

  useEffect(() => {
    const fetchJobList = async () => {
      try {
        const response = await axios.post("http://localhost:3001/api/joblist");
        setJobList(response.data);
      } catch (error) {
        console.error("Error fetching job list:", error);
      }
    };

    fetchJobList();
  }, [handleDeleteJob]);

  return (
    <section className="createJobs">
      <h1 className="heading">Listed Jobs </h1>
      <Link to="/admin/Jobs/Add Job" className="inline-btn">
        <i className="fa-solid fa-plus" />
      </Link>
      <div className="tableData">
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Title</th>
              <th>Description</th>
              <th>Salary</th>
              <th>Location</th>
              <th>Categories</th>
              <th>Shift</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobList.map((job) => (
              <tr key={job._id}>
                <td>{job.type}</td>
                <td>{job.title}</td>

                <td> {job.description.split(" ").slice(0, 30).join(" ")}...</td>
                <td>{job.salary}</td>
                <td>{job.location}</td>
                <td>{job.categories}</td>
                <td>{job.shift}</td>
                <td>{job.contact}</td>

                <td>
                  <Link to="/admin/updatejobs" state={job._id} className="btn">
                    Update
                  </Link>
                  {/* Pass job._id to handleDeleteJob */}
                  <button
                    onClick={() => handleDeleteJob(job._id)}
                    className="btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

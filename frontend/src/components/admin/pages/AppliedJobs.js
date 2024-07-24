import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "../../user/user-styles/style2.css";
export default function AppliedJobs() {
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
  const [appliedJobList, setAppliedJobList] = useState([]);

  useEffect(() => {
    const fetchAppliedJobList = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/jobapplylist"
        );
        console.log(response.data);
        setAppliedJobList(response.data);
      } catch (error) {
        toast.error("Error fetching applied list:", error, {
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
        // console.error("Error fetching applied list:", error);
      }
    };

    fetchAppliedJobList();
  }, []);

  return (
    <section className="reviews">
      <h1 className="heading">Beggars who applied for Jobs</h1>
      <div className="box-container">
        {appliedJobList.map((appliedList) => (
          <Link
            to="/admin/appliedjobs/resume"
            state={{
              uid: appliedList.userid,
              title: appliedList.title,
              id: appliedList._id,
            }}
          >
            {/* <Link to="/admin/appliedjobs/resume"> */}
            <div key={appliedList._id} className="box">
              <p>{appliedList.userid}</p>
              <p>
                Description -{" "}
                {appliedList.description.split(" ").slice(0, 20).join(" ")}
              </p>
              <div className="user">
                {/* <img src="images/pic-7.jpg" alt="" /> */}
                <div>
                  <h3>Applied for - {appliedList.title}</h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export default function Applyjob() {
  const location = useLocation();
  const jid = location.state;
  const [data, setData] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/singlejoblist",
          {
            data: { id: jid }, // Send job ID in the request body
          }
        );
        if (response) {
          setData(response.data[0]);
          console.log(response.data[0].categories); // Log the response data
        } else {
          console.error("No data received from server");
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    if (jid) {
      fetchJob();
    }
  }, []);

  const ApplyNow = async (e) => {
    e.preventDefault();
    const jobId = data._id;
    const title = data.title;
    const description = data.description;
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
    try {
      const userid = JSON.parse(auth); // Parse the string to an object
      const userId = userid._id;

      const response = await axios.post(
        "http://localhost:3001/api/resumelist",
        {
          uid: userId,
        }
      );
      if (response.data.response == null) {
        // toast("create your resume first!", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        //   transition: Bounce,
        // });

        navigate("/profile");
      } else {
        console.log(jobId, userId);
        try {
          const response = await axios.post(
            "http://localhost:3001/api/jobselection",
            {
              jobId,
              userId,
              title,
              description,
            }
          );
          console.log(response);
          toast(response.data.result, {
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
        } catch {}
      }
    } catch {}
  };

  return (
    <section className="jobs applyjobs">
      <h1 className="heading">Apply for job Beggars</h1>
      <div className="box-container">
        <div className="box">
          <h4>{data.title}</h4>
          <span>
            Title: <h3>{data.title}</h3>
          </span>
          <span>
            Description:<h3> {data.description}</h3>
          </span>
          <span>
            Contact:<h3>{data.contact}</h3>
          </span>

          <span>
            Salary:<h3>{data.salary}</h3>
          </span>
          <span>
            Location:<h3>{data.location}</h3>
          </span>
          <span>
            shift:<h3>{data.categories}</h3>
          </span>

          <span>
            Categories:<h3>{data.categories}</h3>
          </span>
          <span>
            Type:<h3>{data.type}</h3>
          </span>
          <button value="Apply Now" onClick={ApplyNow} className="btn">
            Apply now
          </button>
        </div>
      </div>
    </section>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "../admin-style/style1.css";
export default function UserResume() {
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
  const location = useLocation();
  const Id = location.state.uid;
  const title = location.state.title;
  const jid = location.state.id;

  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState("adf");
  const [phone, setPhone] = useState("adf");
  const [schoolName, setSchoolName] = useState();
  const [collegeName, setCollegeName] = useState();
  const [graduation, setGraduation] = useState();
  const [skills, setSkills] = useState();
  const [experience, setExperience] = useState();
  const [additional, setAdditional] = useState();

  useEffect(() => {
    fetchResume(Id);
  }, []);

  const fetchResume = async (Id) => {
    console.log(Id);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/resumelist",
        {
          uid: Id,
        }
      );
      console.log(response.data);

      const {
        phone,
        additional,
        collegename,
        email,
        fname,
        lname,
        skills,
        experience,
        graduation,
        schoolname,
      } = response.data.response;

      setPhone(phone);
      setAdditional(additional);
      setCollegeName(collegename);
      setEmail(email);
      setFname(fname);
      setLname(lname);
      setSkills(skills);
      setExperience(experience);
      setGraduation(graduation);
      setSchoolName(schoolname);
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };

  const changeStatus = async (jid, status) => {
    console.log(jid); // Log jid value
    // Your code to handle the status
    console.log(status); // Log jid value
    const response = await axios.post(
      "http://localhost:3001/api/resumestatus",
      {
        _id: jid,
        status: status,
      }
    );
    console.log(response.data.message);
    toast.success(response.data.message, {
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
  };

  return (
    <section className="resume">
      <h1 className="heading">Applied for role as {title}</h1>
      <div className="box-container">
        <div className="box">
          <div className="container">
            <form>
              <div className="user__details">
                <div className="input__box">
                  <span className="details">
                    First Name <span>*</span>
                  </span>
                  <input type="text" value={fname} readOnly required />
                </div>
                <div className="input__box">
                  <span className="details">
                    Last Name <span>*</span>
                  </span>
                  <input type="text" value={lname} readOnly />
                </div>
                <div className="input__box">
                  <span className="details">Email</span>
                  <input type="email" value={email} readOnly />
                </div>

                <div className="input__box">
                  <span className="details">Phone Number</span>
                  <input readOnly value={phone} />
                </div>
                <div className="input__box">
                  <span className="details">School Name - Marks</span>
                  <input type="text" value={schoolName} readOnly />
                </div>
                <div className="input__box">
                  <span className="details">College Name - Domain - Marks</span>
                  <input type="text" value={collegeName} readOnly />
                </div>
                <div className="input__box">
                  <span className="details">Graduation</span>
                  <input type="text" value={graduation} readOnly />
                </div>
                <div className="input__box">
                  <span className="details">Experince</span>
                  <input type="text" value={experience} readOnly />
                </div>
                <div className="input__box">
                  <span className="details">Skills</span>
                  <textarea type="text" value={skills} readOnly />
                </div>
                <div className="input__box">
                  <span className="details">Additional-Details</span>
                  <textarea type="text" value={additional} readOnly />
                </div>

                <span
                  onClick={() => changeStatus(jid, "accepted")} // Pass jid and status
                  className="inline-btn"
                >
                  Accept
                </span>
                <span
                  onClick={() => changeStatus(jid, "rejected")} // Pass jid and status
                  className="inline-btn"
                >
                  Reject
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

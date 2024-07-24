import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "../admin-style/style1.css";
// import images from "../../../../../backend/"
export default function Profile() {
  const navigate = useNavigate();

  const [read, setRead] = useState(true);
  const [editButton, setEditButton] = useState(false);

  const [name, setName] = useState();
  const [uemail, setUemail] = useState();

  const [uid, setId] = useState();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [schoolName, setSchoolName] = useState();
  const [collegeName, setCollegeName] = useState();
  const [graduation, setGraduation] = useState();
  const [skills, setSkills] = useState();
  const [experience, setExperience] = useState();
  const [additional, setAdditional] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/login"); // Navigate to the login page if user is not logged in
    }
    const userid = JSON.parse(auth); // Parse the string to an object
    const id = userid._id;
    const emage = userid.image;
    const username = userid.name;
    const useremail = userid.email;
    setImage(emage);
    setName(username);
    setUemail(useremail);
    console.log(userid);
    setId(id);
    fetchResume(id);
  }, []);
  console.log(name, uemail);
  const enableEdit = async () => {
    setRead((prevState) => !prevState);
    setEditButton((prevState) => !prevState);

    if (editButton) {
      console.log(
        uid,
        fname,
        lname,
        email,
        phone,
        schoolName,
        collegeName,
        graduation,
        skills,
        experience,
        additional
      );

      try {
        const response = await axios.post("http://localhost:3001/api/resume", {
          uid,
          fname,
          lname,
          email,
          phone,
          schoolName,
          collegeName,
          graduation,
          skills,
          experience,
          additional,
        });
        console.log(response.data.message);
        toast(response.data.message, {
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
        // alert(response.data.message);
        console.log(response.data.resume.additional);
      } catch (error) {
        toast.error("Error fetching resume list:", error, {
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
        // console.error("Error fetching resume list:", error);
      }
    }
  };

  // useEffect(() => {
  //   fetchResume();
  // }, []);

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
      toast("Create your resume !", error, {
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
      console.error("Error fetching resume:", error);
    }
  };
  return (
    <>
      <section className="profile">
        <h1 className="heading">profile details</h1>
        <div className="details">
          <div className="user">
            {/* <img src="../home${image}" alt="" /> */}
            {/* <img
              src={`C:/Users/Vishal/Desktop/jobportal/backend/${image}`}
              alt=""
            /> */}
            <img src={`http://localhost:3001/${image}`} alt="User Image" />

            <h3>{name}</h3>
            <p>{uemail}</p>
            <Link
              to="/jobs/update"
              state={{ name: name, email: uemail }}
              className="inline-btn"
            >
              update profile
            </Link>
            {/* <Link to="/jobs/apply" state={job._id} className="btn">
              more details
            </Link> */}
          </div>
          {/* <div className="box-container">
            <div className="box">
              <div className="flex">
                <i className="fa fa-bookmark" />
                <div>
                  <h3>3</h3>
                  <span>saved playlist</span>
                </div>
              </div>
              <a href="#" className="inline-btn">
                view playlist
              </a>
            </div>
            <div className="box">
              <div className="flex">
                <i className="fa fa-heart" />
                <div>
                  <h3>30</h3>
                  <span>video liked</span>
                </div>
              </div>
              <a href="#" className="inline-btn">
                view liked
              </a>
            </div>
            <div className="box">
              <div className="flex">
                <i className="fa fa-comment" />
                <div>
                  <h3>3</h3>
                  <span>video comment</span>
                </div>
              </div>
              <a href="#" className="inline-btn">
                view comment
              </a>
            </div>
          </div> */}
        </div>
      </section>

      <section className="resume">
        <h1 className="heading">Resume</h1>
        <div className="box-container">
          <div className="box">
            <div className="container">
              <form>
                <div className="user__details">
                  <div className="input__box">
                    <span className="details">
                      First Name <span>*</span>
                    </span>
                    <input
                      type="text"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      placeholder="E.g: Vishal "
                      readOnly={read}
                      required
                    />
                  </div>
                  <div className="input__box">
                    <span className="details">
                      Last Name <span>*</span>
                    </span>
                    <input
                      type="text"
                      placeholder="E.g: Kushwaha"
                      readOnly={read}
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input__box">
                    <span className="details">Email</span>
                    <input
                      type="email"
                      placeholder="johnsmith@hotmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      readOnly={read}
                    />
                  </div>

                  <div className="input__box">
                    <span className="details">Phone Number</span>
                    <input
                      type="tel"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      placeholder="012-345-6789"
                      readOnly={read}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="input__box">
                    <span className="details">School Name - Marks</span>
                    <input
                      type="text"
                      placeholder="abc high school - 89%"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      readOnly={read}
                    />
                  </div>
                  <div className="input__box">
                    <span className="details">
                      College Name - Domain - Marks
                    </span>
                    <input
                      type="text"
                      placeholder="ABC college - Science - 89%"
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      readOnly={read}
                    />
                  </div>
                  <div className="input__box">
                    <span className="details">Graduation</span>
                    <input
                      type="text"
                      placeholder="E.g: BSC computer science"
                      value={graduation}
                      onChange={(e) => setGraduation(e.target.value)}
                      readOnly={read}
                    />
                  </div>
                  <div className="input__box">
                    <span className="details">Experince</span>
                    <input
                      type="text"
                      placeholder="E.g: 2 years"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      readOnly={read}
                    />
                  </div>
                  <div className="input__box">
                    <span className="details">Skills</span>
                    <textarea
                      type="text"
                      placeholder="E.g: web developmen, app development "
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      readOnly={read}
                    />
                  </div>
                  <div className="input__box">
                    <span className="details">Additional-Details</span>
                    <textarea
                      type="text"
                      placeholder="E.g: passionate for 3d model creation "
                      value={additional}
                      onChange={(e) => setAdditional(e.target.value)}
                      readOnly={read}
                    />
                  </div>
                </div>
                <Link type="submit" onClick={enableEdit} className="btn">
                  {editButton ? "Save" : "Edit"}{" "}
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

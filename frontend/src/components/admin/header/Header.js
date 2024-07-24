import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import logo from "../../../assets/images/logo.png";
import "../admin-style/style1.css";

export default function Header() {
  const [userData, setUserData] = useState(1);
  const [userId, setUserId] = useState();

  const [sidebarActive, setSidebarActive] = useState(false);
  const [profileActive, setProfileActive] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [searchVal, setSearchVal] = useState();
  const [image, setImage] = useState();
  const [loginState, setLoginState] = useState(false);

  const profile = () => {
    setProfileActive(false);
  };

  const handleLogout = () => {
    localStorage.clear("user");
    toast("Successfully logged out!", {
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
    setLoginState(true);
    navigate("/login");
  };

  /////////////////////////////////////////////////////////////////
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if (storedUserData !== null) {
      setUserData(storedUserData.type);
      setUserId(storedUserData._id);
      console.log("hello", storedUserData.type);
    }
    const userType = userData === 1 ? "student" : "Admin";
    console.log(userType);
  }, [loginState]);
  /////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const handleScroll = () => {
      // Call profileBtn function when scrolling occurs
      profile();
    };

    // Add scroll event listener to the window
    window.addEventListener("scroll", handleScroll);

    // Remove scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [darkMode, setDarkMode] = useState(localStorage.getItem("iconmode"));

  const profileBtn = () => {
    setProfileActive((prevState) => !prevState);
  };
  const searchBtn = () => {
    setSearchVal("");
    setSearchBar((prev) => !prev);
    setProfileActive(false);
  };

  const darkBtn = () => {
    setDarkMode((prevState) =>
      prevState === "fas fa-moon" ? "fas fa-sun" : "fas fa-moon"
    ); // Toggle darkMode state
    const mode = darkMode === "fas fa-moon" ? "fas fa-sun" : "fas fa-moon"; // Get the updated mode
    localStorage.setItem("iconmode", mode); // Update localStorage with the new mode
  };
  useEffect(() => {
    let theme = localStorage.getItem("iconmode");
    if (theme === "fas fa-moon") {
      body.classList.add("dark");
      localStorage.setItem("darkmode", "dark");
      // Adding 'dark' class to body
    } else {
      body.classList.remove("dark"); // Removing 'dark' class from body
      localStorage.setItem("darkmode", "light");
    }
  }, [darkBtn]);

  let body = document.body;
  const sidebarBtn = () => {
    setSidebarActive((prevState) => !prevState);
    body.classList.toggle("active");
  };
  const navigate = useNavigate();

  const auth = localStorage.getItem("user");

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth != null) {
      const userid = JSON.parse(auth); // Parse the string to an object

      const emage = userid.image;
      setImage(emage);
      console.log(image);
    }
  }, [profileBtn]);

  return (
    <>
      <div className="header">
        <section className="flex">
          <Link to="/jobs" className="logo">
            <img src={logo} alt="" />
          </Link>

          <form
            onSubmit={(e) => {
              e.preventDefault(); // Page reload ko rokne ke liye
            }}
            className={`search-form ${searchBar ? "active" : ""}`}
          >
            <input
              type="text"
              name="search_box"
              placeholder="search jobs..."
              className="sea"
              required=""
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              maxLength={100}
            />

            <Link
              to="/searchjobs"
              state={searchVal}
              className="fa fa-search"
              name="search_box"
            ></Link>
          </form>

          <div className="icons">
            <div
              id="search-btn"
              className="fas fa-search"
              onClick={searchBtn}
            ></div>
            <div
              id="menu-btn"
              className={`fas fa-bars ${sidebarActive ? "active" : ""}`}
              onClick={sidebarBtn}
            />
            <div id="toggle-btn" className={darkMode} onClick={darkBtn} />
            <div
              id="user-btn"
              className="fas fa-user"
              onClick={profileBtn}
            ></div>
          </div>

          <div className={`profile ${profileActive ? "active" : ""}`}>
            {auth ? (
              <React.Fragment>
                {userId && (
                  <div>
                    {/* Display user image */}
                    <img
                      src={`http://localhost:3001/${image}`}
                      alt="User Image"
                    />

                    {/* Display user name */}
                    <h3>{userData.name}</h3>

                    {/* Display user type */}
                    <span>{userData.type === 1 ? "Admin" : "User"}</span>
                  </div>
                )}

                <Link to="/profile" className="btn">
                  View profile
                </Link>
                <h4 className="btn" onClick={handleLogout}>
                  Logout
                </h4>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="flex-btn">
                  <Link to="/login" className="option-btn">
                    login
                  </Link>
                  <Link to="/register" className="option-btn">
                    register
                  </Link>
                </div>
              </React.Fragment>
            )}
          </div>
        </section>
      </div>

      <div className={`side-bar ${sidebarActive ? "active" : ""}`}>
        <div className="close-side-bar">
          <i className="fas fa-times" onClick={sidebarBtn} />
        </div>
        <div className="profile">
          {/* <img src="logo(prithvi).jpg" alt=""> */}
          <h3>Beggars</h3>
          <span>Get a Job Here</span>
        </div>

        <nav className="navbar">
          <nav className="navbar">
            {userData === 0 && (
              <>
                <Link to="/admin/dashboard">
                  <i className="fas fa-home" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/admin/appliedjobs">
                  <i className="fas fa-user" />
                  <span>Applied jobs</span>
                </Link>
                <Link to="/admin/jobs">
                  <i className="fas fa-square-plus" />
                  <span>Create Jobs</span>
                </Link>
              </>
            )}

            <Link to="/jobs">
              <i className="fas fa-briefcase" />
              <span>Jobs</span>
            </Link>
            {userId && (
              <Link to="/appliedstatus">
                <i className="fas fa-message" />
                <span>Job Status</span>
              </Link>
            )}
            <Link to="/about us">
              <i className="fas fa-question" />
              <span>About Us</span>
            </Link>
          </nav>
        </nav>
      </div>
    </>
  );
}

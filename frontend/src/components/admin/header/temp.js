import React, { useEffect, useState } from 'react';
import logo from '../../../assets/images/logo.png';
import '../admin-style/style1.css';
export default function Header() {

    const [sidebarActive, setSidebarActive] = useState(false);
    
    let body = document.body;
    
    let togglebtn = document.querySelector("#toggle-btn");
    let darkMode = localStorage.getItem("dark-mode");
    let sideBar = document.querySelector(".side-bar");
    useEffect(() => {
      sidebarbtn();
      tooglebtn();
      profile();
     

    
      window.onscroll=()=>{
        profile.classList.remove('active');
        if(window.innerWidth <1200){
            sideBar.classList.remove('active');
        body.classList.remove('active');
    
        }
    
    }
    }, []);
    function sidebarbtn() {
      document.querySelector("#menu-btn").onclick = () => {
        sideBar.classList.toggle("active");
        body.classList.toggle("active");
      };

      document.querySelector(".side-bar .close-side-bar").onclick = () => {
      
        sideBar.classList.remove("active");
        body.classList.remove("active");
      };
    }


    function tooglebtn() {
  

      const enableDarkMode = () => {
        togglebtn.classList.replace("fa-sun", "fa-moon");
        body.classList.add("dark");
        localStorage.setItem("dark-mode", "enabled");
      };
      const disableDarkMode = () => {
        togglebtn.classList.replace("fa-moon", "fa-sun");
        body.classList.remove("dark");
        localStorage.setItem("dark-mode", "disabled"); //noice :)
      };
      if (darkMode === "enabled") {
        enableDarkMode();
      }
      togglebtn.onclick = (e) => {
        let darkMode = localStorage.getItem("dark-mode");
        if (darkMode === "disabled") {
          enableDarkMode();
        } else {
          disableDarkMode();
        }
      };
    }
    

    function profile(){

let profile = document.querySelector('.header .flex .profile');

document.querySelector('#user-btn').onclick =()=>{
    profile.classList.toggle('active');
    // searchform.classList.remove('active');
}

    }



  return (
    <>
      <div className="header">
        <section className="flex">
          <a href="index.html" className="logo">
            {" "}
            <img src={logo} alt="" />
          </a>
          <div className="icons">
          <div id="menu-btn" className={`fas fa-bars ${sidebarActive ? 'active' : ''}`} onClick={sidebarbtn} />
            <div id="toggle-btn" className="fas fa-sun" />
            <div id="search-btn" className="fas fa-search"></div>
            <div id="user-btn" className="fas fa-user"></div>
          </div>

          <div className="profile">
            <img src="#" alt="" />
            <h3>vishal kushwaha</h3>
            <span>student</span>
            <a href="#" className="btn">
              {" "}
              View profile
            </a>
            <div className="flex-btn">
              <a href="#" className="option-btn">
                login
              </a>
              <a href="#" className="option-btn">
                register
              </a>
            </div>
          </div>
        </section>
      </div>

      <div className="side-bar">
        <div className="close-side-bar">
          <i className="fas fa-times" />
        </div>
        <div className="profile">
          {/* <img src="logo(prithvi).jpg" alt=""> */}
          <h3>KVC</h3>
          <span>Technical Services Co. LLC</span>
        </div>
        <nav className="navbar">
          <a href="#home">
            <i className="fas fa-home" />
            <span>Home</span>
          </a>
          <a href="#about">
            <i className="fas fa-question" />
            <span>About Us</span>
          </a>
          <a href="#Services">
            <i className="fas fa-graduation-cap" />
            <span>Services</span>
          </a>
          <a href="#portfolio">
            <i className="fas fa-briefcase" />
            <span>Portfolio</span>
          </a>
          <a href="#contact">
            <i className="fas fa-headset" />
            <span>Contact</span>
          </a>
        </nav>
      </div>
    </>
  );
}

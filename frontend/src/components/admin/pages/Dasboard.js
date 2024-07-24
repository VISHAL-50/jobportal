import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import a from "../../../../src/assets/images/a.jpeg";
import b from "../../../../src/assets/images/b.jpeg";
import c from "../../../../src/assets/images/c.jpeg";
import d from "../../../../src/assets/images/d.jpeg";
import e from "../../../../src/assets/images/e.jpeg";
import f from "../../../../src/assets/images/f.jpeg";

import "../../user/user-styles/style2.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

export default function Dasboard() {
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

  useEffect(() => {
    fetchList();
  }, []);

  const [jobList, setJobList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/numberofdata"
      );

      setJobList(response.data);
    } catch (error) {
      console.error("Error fetching job list:", error);
    }
  };

  return (
    <>
      <section className="about">
        <div className="box-container">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            // navigation={true}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="box slider-image">
                <img src={a} alt="Image A" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box slider-image">
                <img src={b} alt="Image B" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box slider-image">
                <img src={c} alt="Image B" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box slider-image">
                <img src={d} alt="Image B" />
              </div>
            </SwiperSlide>{" "}
            <SwiperSlide>
              <div className="box slider-image">
                <img src={e} alt="Image B" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box slider-image">
                <img src={f} alt="Image B" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      <section className="about">
        <div className="box-container">
          <div className="box">
            <i className="fas fa-graduation-cap" />
            <div>
              <h3>+{jobList.noofusers}</h3>
              <span>Registerd Users</span>
            </div>
          </div>
          <div className="box">
            <i className="fas fa-user-graduate" />
            <div>
              <h3>+{jobList.categoryCount}</h3> <span>Job categories</span>
            </div>
          </div>
          <div className="box">
            <i className="fas fa-chalkboard-user" />
            <div>
              <h3>+{jobList.noofjobs}</h3> <span>jobs</span>
            </div>
          </div>

          <div className="box">
            <i className="fas fa-briefcase" />
            <div>
              <h3>100%</h3>
              <span> job placement</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

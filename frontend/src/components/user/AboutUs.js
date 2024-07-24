import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import aboutSVG from "../../assets/images/aboutSVG.svg";
import "../admin/admin-style/style1.css";
import "../user/user-styles/style2.css";
// import required modules
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade"; // You may need to import other Swiper CSS files depending on your configuration
import "swiper/css/navigation";
import "swiper/css/pagination";
import a from "../../assets/images/a.jpeg";
import b from "../../assets/images/b.jpeg";
import c from "../../assets/images/c.jpeg";
import d from "../../assets/images/d.jpeg";
import e from "../../assets/images/e.jpeg";
import f from "../../assets/images/f.jpeg";
export default function AboutUs() {
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
        <div className="row">
          <div className="image">
            <img src={aboutSVG} alt="" />
          </div>
          <div className="content">
            <h3>why chosse us</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              illum id vel quam deleniti non veniam consequatur voluptate in
              repudiandae.
            </p>
            <Link to="/jobs" className="inline-btn">
              Apply now
            </Link>
          </div>
        </div>
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
      <section className="about">
        <div className="box-container">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 4500,
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
      <section className="reviews">
        <h1 className="heading">Feedback</h1>
        <div className="box-container">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            slidesPerView={"auto"}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="box">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Assumenda sed ad officia veniam amet atque praesentium at
                  accusantium vel maxime?
                </p>
                <div className="user">
                  <img src="images/pic-2.jpg" alt="" />
                  <div>
                    <h3>john doe</h3>
                    <div className="stars">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Assumenda sed ad officia veniam amet atque praesentium at
                  accusantium vel maxime?
                </p>
                <div className="user">
                  <img src="images/pic-2.jpg" alt="" />
                  <div>
                    <h3>john doe</h3>
                    <div className="stars">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Assumenda sed ad officia veniam amet atque praesentium at
                  accusantium vel maxime?
                </p>
                <div className="user">
                  <img src="images/pic-2.jpg" alt="" />
                  <div>
                    <h3>john doe</h3>
                    <div className="stars">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Assumenda sed ad officia veniam amet atque praesentium at
                  accusantium vel maxime?
                </p>
                <div className="user">
                  <img src="images/pic-2.jpg" alt="" />
                  <div>
                    <h3>john doe</h3>
                    <div className="stars">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Assumenda sed ad officia veniam amet atque praesentium at
                  accusantium vel maxime?
                </p>
                <div className="user">
                  <img src="images/pic-2.jpg" alt="" />
                  <div>
                    <h3>john doe</h3>
                    <div className="stars">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Assumenda sed ad officia veniam amet atque praesentium at
                  accusantium vel maxime?
                </p>
                <div className="user">
                  <img src="images/pic-2.jpg" alt="" />
                  <div>
                    <h3>john doe</h3>
                    <div className="stars">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
}

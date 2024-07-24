import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "../admin/admin-style/style1.css";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handlereset = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/api/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.status === 200) {
      toast("reset password link is sent on email", {
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
      // Login successful

      navigate("/login");
    } else if (response.status === 404) {
      // User not found
      toast("User not found. Please check your email.", {
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
      // alert('User not found. Please check your email.');
    } else {
      // Other errors
      toast("An error occurred. Please try again later.", {
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

      // alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <section className="form-container">
        <form onSubmit={handlereset}>
          <h3>Forgott password</h3>
          <p>
            your email <span>*</span>
          </p>
          <input
            type="email"
            placeholder="enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={100}
            required=""
            className="box"
            id=""
          />
          {/* <p>
        your password <span>*</span>
      </p>
      <input
        type="password"
       
        placeholder="enter your password"
        required=""
        maxLength={50}
        className="box"
        id=""
      /> */}
          <input
            type="submit"
            defaultValue="login now"
            name="submit"
            className="btn"
          />
          <Link to="/login" title="chala ja bhosdk">
            Login{" "}
          </Link>
        </form>
      </section>
    </div>
  );
}

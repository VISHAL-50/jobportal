import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "../admin/admin-style/style1.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      // Login successful
      const userData = await response.json();
      localStorage.setItem("user", JSON.stringify(userData.user));
      toast("Sucessfully logedin!", {
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
      navigate("/jobs"); // Redirect to homepage or any other appropriate page
    } else if (response.status === 404) {
      toast("User not found. Please check your email.", {
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
      // User not found
      // alert("User not found. Please check your email.");
    } else if (response.status === 401) {
      // Invalid password
      toast("Invalid password. Please try again.", {
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
      // alert("Invalid password. Please try again.");
    } else {
      // Other errors
      toast.error("An error occurred. Please try again later.", {
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
      // alert("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/admin/jobs");
    }
  }, [navigate]);

  return (
    <section className="form-container">
      <form onSubmit={handleLogin}>
        <h3>Welcome back</h3>
        <p>
          your email <span>*</span>
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter your email"
          maxLength={100}
          required=""
          className="box"
          id=""
        />
        <p>
          your password <span>*</span>
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="enter your password"
          required=""
          maxLength={50}
          className="box"
          id=""
        />
        <input
          type="submit"
          defaultValue="login now"
          name="submit"
          className="btn"
        />

        <Link to="/reset" title="">
          forget password..?{" "}
        </Link>
      </form>
    </section>
  );
}

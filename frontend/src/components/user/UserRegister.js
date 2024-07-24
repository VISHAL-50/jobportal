import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "../admin/admin-style/style1.css";

export default function UserRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState(1);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(name, email, password, image, type);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", image);
    formData.append("type", type);

    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        body: formData,
      });

      if (response.status === 409) {
        alert(" email already exist ");
      } else {
        const data = await response.json();
        toast("Sucessfully Registerd!", {
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
        // localStorage.setItem("user", JSON.stringify(data));
        // const auth = await localStorage.getItem("user");
        console.log(data, "here");
        if (data) {
          navigate("/login");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/jobs");
    }
  });

  return (
    <section className="form-container">
      <form
        onSubmit={handleRegister}
        // encType="multipart/form-data"
        // method="post"
      >
        <h3>Register Now</h3>
        <p>
          Your Name <span>*</span>
        </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          maxLength="100"
          required
          className="box"
        />
        <p>
          Your Email <span>*</span>
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          maxLength="100"
          required
          className="box"
        />
        <p>
          Your Password <span>*</span>
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          maxLength="50"
          className="box"
        />
        <p>
          Select Picture <span>*</span>
        </p>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          required
          className="box"
        />
        <input
          type="submit"
          value="Register Now"
          name="submit"
          className="btn"
        />
      </form>
    </section>
  );
}

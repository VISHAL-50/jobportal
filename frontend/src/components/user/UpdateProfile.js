import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export default function UpdateProfile() {
  const [name, setName] = useState("");
  const location = useLocation();
  const pd = location.state;
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const email = pd.email;

    console.log(name, email); // Logging formData contents

    try {
      const response = await fetch("http://localhost:3001/api/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.status === 200) {
        const userData = await response.json();
        console.log(userData);
        localStorage.setItem("user", JSON.stringify(userData.data));
        toast("Successfully updated.", {
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
        navigate("/profile");
      } else {
        const data = await response.json();
        toast("error", {
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
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="form-container">
      <form onSubmit={handleUpdate}>
        <h3>Update Now</h3>
        <p>
          Your Name <span>*</span>
        </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={pd.name}
          maxLength="100"
          required
          className="box"
        />
        <p>
          Your Email <span>*</span>
        </p>
        <input
          type="email"
          value={pd.email}
          readOnly={true}
          maxLength="100"
          required
          className="box"
        />
        <input type="submit" value="Update Now" name="submit" className="btn" />
        <Link
          to="/profile"

          // className="inline-btn"
        >
          back to profile
        </Link>
      </form>
    </section>
  );
}

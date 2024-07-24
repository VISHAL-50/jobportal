import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "../admin-style/style1.css";

export default function AddJobs() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [categories, setCategory] = useState("");
  const [shift, setShift] = useState("");
  const [type, setType] = useState("");
  const [contact, setContact] = useState("");

  const navigate = useNavigate();

  const handleJobRegister = async (e) => {
    e.preventDefault();
    console.log(title, description, salary, location, categories);

    try {
      const response = await axios.post("http://localhost:3001/api/jobcreate", {
        title,
        description,
        salary,
        location,
        shift,
        type,
        categories,
        contact,
      });

      if (response.status === 200) {
        const data = response.data;
        toast.success("job created successfully!", {
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
        console.log(data); // Handle response data as needed
        navigate("/admin/jobs");
      } else {
        toast.warn("Failed to add job: " + response.statusText, {
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
        console.log("Failed to add job:", response.statusText);
        // alert('Failed to add job: ' + response.statusText);
      }
    } catch (error) {
      toast.error("Error creating job: " + error.message, {
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
      console.error("Error creating job:", error);
      // alert('Error creating job: ' + error.message);
    }
  };

  // useEffect(() => {
  //   const auth = localStorage.getItem("user");
  //   if (!auth) {
  //     navigate("/admin/login");
  //   }
  // }, []); // Empty dependency array to run only once

  return (
    <section className="form-container">
      <form onSubmit={handleJobRegister}>
        <Link to="/admin/jobs">
          <i className="fas fa-arrow-left heading"></i>{" "}
        </Link>
        <h3>Add Job Now</h3>
        <p>
          Title <span>*</span>
        </p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter job title"
          maxLength="100"
          required
          className="box"
        />
        <p>
          Description <span>*</span>
        </p>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter job description"
          required
          className="box"
        />
        <p>
          Salary <span>*</span>
        </p>
        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Enter job salary"
          required
          maxLength="50"
          className="box"
        />
        <p>
          Location <span>*</span>
        </p>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter job location"
          required
          maxLength="50"
          className="box"
        />

        <p>
          Shift <span>*</span>
        </p>

        <input
          type="text"
          value={shift}
          onChange={(e) => setShift(e.target.value)}
          placeholder="Enter job timing"
          required
          maxLength="50"
          className="box"
        />
        <p>
          Type <span>*remote/onsite</span>
        </p>

        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Enter job type"
          required
          maxLength="50"
          className="box"
        />
        <p>
          Contact <span>*</span>
        </p>
        <input
          type="number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Enter contact"
          required
          maxLength="10"
          className="box"
        />

        <p>
          Category <span>*</span>
        </p>
        <input
          type="text"
          value={categories}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter job category"
          required
          maxLength="50"
          className="box"
        />

        <input type="submit" value="Add Now" name="submit" className="btn" />
      </form>
    </section>
  );
}

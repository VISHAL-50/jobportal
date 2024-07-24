import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "../admin-style/style1.css";

export default function UpdateJobs() {
  const location = useLocation();

  //   const jid = location.state.id;
  const jid = location.state;

  console.log(jid);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [loc, setLocation] = useState("");
  const [categories, setCategories] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/singlejoblist",
          {
            data: { id: jid }, // Send job ID in the request body
          }
        );
        if (response) {
          setCategories(response.data[0].categories);
          setTitle(response.data[0].title);
          setDescription(response.data[0].description);
          setLocation(response.data[0].location);
          setSalary(response.data[0].salary);

          console.log(response.data[0].categories); // Log the response data
        } else {
          console.error("No data received from server");
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    if (jid) {
      fetchJob();
    }
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send updated job data to the server
      const response = await axios.put("http://localhost:3001/api/jobupdate", {
        data: {
          id: jid,
          title,
          description,
          salary,
          loc,
          categories,
        },
      });
      if (response.status === 200) {
        toast.success(" job update  succesfully: ", {
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
        // alert(' job update  succesfully: ');
        navigate("/admin/jobs");
      } else {
        console.log("Failed to add job:", response.statusText);
        toast.error("Failed to add job: " + response.statusText, {
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

      console.log("Job updated successfully:", response.data);
      // Redirect or show a success message as needed
    } catch (error) {
      toast.error("Error updating job:", error, {
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
      console.error("Error updating job:", error);
      // Handle error, show error message to the user
    }
  };

  return (
    <section className="form-container">
      <form onSubmit={handleSubmit}>
        <Link to="/admin/jobs">
          <i className="fas fa-arrow-left heading"></i>{" "}
        </Link>
        <h3>Update Job</h3>
        <p>
          Title <span>*</span>
        </p>
        <input
          type="text"
          value={title || ""}
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
          value={description || ""}
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
          value={salary || ""}
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
          value={loc || ""}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter job location"
          required
          maxLength="50"
          className="box"
        />
        <p>
          Category <span>*</span>
        </p>
        <input
          type="text"
          value={categories || ""}
          onChange={(e) => setCategories(e.target.value)}
          placeholder="Enter job category"
          required
          maxLength="50"
          className="box"
        />
        <input type="submit" value="Update Now" name="submit" className="btn" />
      </form>
    </section>
  );
}

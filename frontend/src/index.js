import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout";
import AddJobs from "./components/admin/pages/AddJobs";
import AppliedJobs from "./components/admin/pages/AppliedJobs";
import Dasboard from "./components/admin/pages/Dasboard";
import Profile from "./components/admin/pages/Profile";
import Rjobs from "./components/admin/pages/Rjobs";
import UpdateJobs from "./components/admin/pages/UpdateJobs";
import UserResume from "./components/admin/pages/UserResume";
import AboutUs from "./components/user/AboutUs";
import Applyjob from "./components/user/Applyjob";
import Jobs from "./components/user/Jobs";
import ResetPassword from "./components/user/ResetPassword";
import SearchJob from "./components/user/SearchJob";

import ApplicationStatus from "./components/user/ApplicationStatus";
import UpdateProfile from "./components/user/UpdateProfile";
import UserLogin from "./components/user/UserLogin";
import UserRegister from "./components/user/UserRegister";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/admin/dashboard" element={<Dasboard />}></Route>

      <Route path="/jobs" element={<Jobs />}></Route>
      <Route path="/jobs/apply" element={<Applyjob />}></Route>
      <Route path="/jobs/update" element={<UpdateProfile />}></Route>

      <Route path="/admin/appliedjobs" element={<AppliedJobs />}></Route>
      {/* <Route path="/feed" element={<Feedback />}></Route> */}

      <Route path="/admin/Jobs/Add Job" element={<AddJobs />}></Route>
      <Route path="/about us" element={<AboutUs />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/admin/jobs" element={<Rjobs />}></Route>
      <Route path="/admin/updatejobs" element={<UpdateJobs />}></Route>
      <Route path="/reset" element={<ResetPassword />}></Route>
      <Route path="/admin/appliedjobs/resume" element={<UserResume />}></Route>
      <Route path="/appliedstatus" element={<ApplicationStatus />}></Route>
      <Route path="/searchjobs" element={<SearchJob />}></Route>

      <Route path="/login" element={<UserLogin />}></Route>
      <Route path="/register" element={<UserRegister />}></Route>
    </Route>
  )
);

let themevalue = localStorage.getItem("darkmode");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <RouterProvider router={router} />
    {/* Update to RouterProvider */}
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={themevalue}
    />
  </>
);

reportWebVitals();

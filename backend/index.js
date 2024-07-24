const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
app.use(cors());
app.use(express.json());
const port = 3001;

require("./db/config");

const uploadsPath = path.join(__dirname, "uploads");

// Serve the uploads folder statically
app.use("/uploads", express.static(uploadsPath));

const user_route = require("./routes/userRoute");
const login_route = require("./routes/loginRoute");
const job_create_route = require("./routes/jobCreateRoute"); // Corrected import
const job_list_route = require("./routes/jobListsRoute");

const job_delete_route = require("./routes/jobDeleteRoute");
const single_job_route = require("./routes/singleJobRoute");
const update_job_route = require("./routes/updateJobsRoute");
const reset_route = require("./routes/resetRoute");
const resume_route = require("./routes/resumeRoute");
const selection_route = require("./routes/jobRequestRoute");

app.use("/api", user_route);
app.use("/api", login_route);
app.use("/api", job_create_route);
app.use("/api", job_delete_route);
app.use("/api", selection_route);

// Corrected usage
app.use("/api", job_list_route);
app.use("/api", single_job_route);
app.use("/api", update_job_route);
app.use("/api", reset_route);
app.use("/api", resume_route);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  const navigate = useNavigate();

  // ✅ LOGIN CHECK (IMPORTANT FIX)
useEffect(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn !== "true") {
    window.location.href = "/#/login";
  }
}, []);

  // Load jobs
  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(savedJobs);
  }, []);

  // Save jobs
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = () => {
    if (!company || !role) return alert("Enter all fields");

    const newJob = { id: Date.now(), company, role, status };
    setJobs([...jobs, newJob]);
    setCompany("");
    setRole("");
    setStatus("Applied");
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const updateStatus = (id, newStatus) => {
    setJobs(
      jobs.map((job) =>
        job.id === id ? { ...job, status: newStatus } : job
      )
    );
  };

 const logout = () => {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "/#/login";
};

  // Stats
  const total = jobs.length;
  const applied = jobs.filter(j => j.status === "Applied").length;
  const interview = jobs.filter(j => j.status === "Interview").length;
  const rejected = jobs.filter(j => j.status === "Rejected").length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">SmartHire Dashboard</h1>

        <div>
          <Link
            to="/analyzer"
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Resume Analyzer
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">Total: {total}</div>
        <div className="bg-blue-100 p-4 rounded shadow">Applied: {applied}</div>
        <div className="bg-yellow-100 p-4 rounded shadow">Interview: {interview}</div>
        <div className="bg-red-100 p-4 rounded shadow">Rejected: {rejected}</div>
      </div>

      {/* Add Job */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <input
          className="border p-2 mr-2 rounded"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          className="border p-2 mr-2 rounded"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <select
          className="border p-2 mr-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
        </select>

        <button
          onClick={addJob}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Job List */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl mb-4">Your Jobs</h2>

        {jobs.length === 0 ? (
          <p>No jobs added</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <p className="font-semibold">{job.company}</p>
                <p className="text-sm text-gray-500">{job.role}</p>
              </div>

              <div>
                <select
                  value={job.status}
                  onChange={(e) => updateStatus(job.id, e.target.value)}
                  className="border p-1 rounded mr-2"
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Rejected</option>
                </select>

                <button
                  onClick={() => deleteJob(job.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Dashboard;
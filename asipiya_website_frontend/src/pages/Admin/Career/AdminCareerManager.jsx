import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../components/Admin/Navbar";
import axiosClient from "../../axioClient";

const AdminCareerManager = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axiosClient.get("/api/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axiosClient.delete(`/api/jobs/${id}`);
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (err) {
      console.error("Error deleting job", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 font-sans">
      <Navbar />

      <div className="flex-grow p-6 mt-20 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Manage Careers</h1>
          <button
            onClick={() => navigate("/admin/add-career")}
            className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-purple-700 transition"
          >
            <FaPlus className="text-sm" /> Add Job
          </button>
        </div>

        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs available.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">{job.title}</h2>
                  <p className="text-sm text-gray-600 mb-1">{job.location}</p>
                  <p className="text-sm text-gray-500">{job.type}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Deadline:{" "}
                    {new Date(job.application_deadline).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex justify-end items-center gap-4 mt-4">
                  <button
                    onClick={() => navigate(`/admin/edit-career/${job.id}`)}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="Edit"
                  >
                    <FaEdit className="text-lg" />
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Delete"
                  >
                    <FaTrashAlt className="text-lg" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCareerManager;

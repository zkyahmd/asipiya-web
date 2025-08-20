import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosClient from "../../axioClient";

const EditCareer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    type: "",
    location: "",
    description: "",
    requirements: [""],
    responsibilities: [""],
    benefits: [""],
    application_deadline: "",
  });

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await axiosClient.get(`/api/jobs/${id}`);
      const job = res.data;
      
      setForm({
        ...job,
        // Ensure these fields are always arrays
        requirements: Array.isArray(job.requirements) && job.requirements.length > 0 
          ? job.requirements 
          : [""],
        responsibilities: Array.isArray(job.responsibilities) && job.responsibilities.length > 0 
          ? job.responsibilities 
          : [""],
        benefits: Array.isArray(job.benefits) && job.benefits.length > 0 
          ? job.benefits 
          : [""],
      });
    } catch (err) {
      console.error("Error fetching job", err);
      alert("Failed to fetch job details");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  const addField = (field) => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const removeField = (field, index) => {
    const updated = [...form[field]];
    updated.splice(index, 1);
    setForm({ ...form, [field]: updated });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      ...form,
      requirements: JSON.stringify(form.requirements.filter(item => item.trim() !== "")),
      responsibilities: JSON.stringify(form.responsibilities.filter(item => item.trim() !== "")),
      benefits: JSON.stringify(form.benefits.filter(item => item.trim() !== ""))
    };

    await axiosClient.put(`/api/jobs/${id}`, payload);
    alert("Job updated successfully");
    navigate("/admin/careers");
  } catch (err) {
    console.error("Error updating job", err);
    alert("Error updating job: " + (err.response?.data?.error || err.message));
  }
};

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 font-sans">
      <div className="flex-grow flex items-center justify-center px-4 py-10 mt-20">
        <div className="w-full max-w-4xl p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Job</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {["title", "type", "location", "application_deadline"].map(
              (field) => (
                <div key={field}>
                  <label className="block text-gray-700 font-medium mb-1 capitalize">
                    {field.replace("_", " ")}
                  </label>
                  <input
                    type={field === "application_deadline" ? "date" : "text"}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                    placeholder={`Enter ${field}`}
                  />
                </div>
              )
            )}

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                rows={4}
                placeholder="Enter job description"
              ></textarea>
            </div>

            {["requirements", "responsibilities", "benefits"].map((field) => (
              <div key={field}>
                <label className="block text-gray-700 font-medium mb-2 capitalize">
                  {field}
                </label>
                {/* Add safety check here too */}
                {Array.isArray(form[field]) && form[field].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleArrayChange(field, index, e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                      placeholder={`Enter ${field.slice(0, -1)} ${index + 1}`}
                      required
                    />
                    {form[field].length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeField(field, index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addField(field)}
                  className="text-purple-600 hover:underline text-sm"
                >
                  + Add another {field.slice(0, -1)}
                </button>
              </div>
            ))}

            <div className="text-right">
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-semibold transition"
              >
                Update Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCareer;
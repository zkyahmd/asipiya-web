import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Admin/Navbar';
import axios from 'axios';
import { FaTrash, FaDownload } from 'react-icons/fa';
import axiosClient from '../../axioClient';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axiosClient.get('/api/jobs/applications/all');
      setApplications(res.data);
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await axiosClient.delete(`/api/jobs/applications/${id}`);
        fetchApplications(); // Refresh the list
      } catch (err) {
        console.error('Error deleting application:', err);
      }
    }
  };

  // download function
  const handleDownloadCV = async (filename) => {
    try {
      const response = await axiosClient.get(`/uploads/${filename}`, {
        responseType: 'blob', // Important for file download
      });
      
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Extract original filename (remove timestamp prefix)
      const originalFilename = filename.replace(/^cv-\d+-/, '');
      link.setAttribute('download', originalFilename);
      
      // Append to html link element page
      document.body.appendChild(link);
      
      // Start download
      link.click();
      
      // Clean up and remove the link
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Error downloading file. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black/20 via-purple-700/30 to-purple-900 text-white">
      <Navbar />
      
      <main className="pt-[100px] px-4 sm:px-8 lg:px-12 pb-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">Job Applications</h1>
          <p className="text-lg text-white/80">
            {applications.length} applications found
          </p>
        </header>

        {loading ? (
          <div className="text-center py-10">Loading applications...</div>
        ) : (
          <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-lg">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">{app.full_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{app.position_applied}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{app.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      {app.cv_filename && (
                        <button
                          onClick={() => handleDownloadCV(app.cv_filename)}
                          className="inline-flex items-center text-purple-400 hover:text-purple-300 cursor-pointer"
                        >
                          <FaDownload className="mr-1" /> CV
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminApplications;
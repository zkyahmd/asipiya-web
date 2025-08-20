import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../../../components/Admin/Navbar';
import axiosClient from '../../axioClient';

const ClientLogo = () => {
  const [logos, setLogos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentLogoId, setCurrentLogoId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLogos();
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const fetchLogos = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/api/client-logos');
      setLogos(res.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load client logos');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      if (selectedFile) formData.append('logo', selectedFile);
      formData.append('CompanyName', companyName);

      if (editMode) {
        await axiosClient.put(`/api/client-logos/${currentLogoId}`, formData);
        toast.success('Logo updated successfully');
      } else {
        await axios.post(`${axiosClient.defaults.baseURL}/api/client-logos`, formData);
        toast.success('Logo uploaded successfully');
      }

      setCompanyName('');
      setSelectedFile(null);
      setPreview(null);
      setEditMode(false);
      setCurrentLogoId(null);
      fetchLogos();
    } catch (error) {
      toast.error(editMode ? 'Failed to update logo' : 'Failed to upload logo');
      setLoading(false);
    }
  };

  const handleEdit = (logo) => {
    setCompanyName(logo.CompanyName);
    setCurrentLogoId(logo.LogoId);
    setEditMode(true);
    setSelectedFile(null);
    setPreview(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this logo?')) return;
    try {
      setLoading(true);
      await axiosClient.delete(`/api/client-logos/${id}`);
      toast.success('Logo deleted successfully');
      fetchLogos();
    } catch (error) {
      toast.error('Failed to delete logo');
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setCompanyName('');
    setSelectedFile(null);
    setPreview(null);
    setEditMode(false);
    setCurrentLogoId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black/20 to-purple-300 text-white">
      <Navbar />
      <div className="p-6 pt-[120px] max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">{editMode ? 'Edit Client Logo' : 'Add New Client Logo'}</h2>

        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl shadow-lg mb-10">
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter company name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Logo Image {editMode && <span className="text-gray-400 text-sm">(optional)</span>}
            </label>
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="w-full bg-gray-800 border border-gray-600 rounded-md px-4 py-2 text-white"
              accept="image/*"
              {...(!editMode && { required: true })}
            />
          </div>

          {preview && (
            <div className="mb-4 text-center">
              <p className="text-sm text-gray-400 mb-2">Preview:</p>
              <img src={preview} alt="Preview" className="w-32 h-32 object-contain mx-auto rounded-md border" />
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-md"
            >
              {loading ? 'Processing...' : editMode ? 'Update Logo' : 'Upload Logo'}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded-md"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <h3 className="text-2xl font-bold mb-4 text-gray-900">Client Logos</h3>

        {loading && !logos.length ? (
          <p className="text-center text-gray-300">Loading logos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {logos.map((logo) => (
              <div key={logo.LogoId} className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
                <div className="h-32 flex items-center justify-center bg-gray-900 rounded mb-4">
                  <img
                    src={`${axiosClient.defaults.baseURL}${logo.LogoPath}`}
                    alt={logo.CompanyName}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h4 className="font-semibold text-lg mb-2 text-center">{logo.CompanyName}</h4>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => handleEdit(logo)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(logo.LogoId)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {!loading && logos.length === 0 && (
              <p className="text-center col-span-full text-gray-400">No logos found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientLogo;

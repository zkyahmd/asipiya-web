import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Admin/Navbar';
import { FaRegImages, FaBlog, FaStar } from 'react-icons/fa';

const AdminHome = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-black/20 via-purple-700/30 to-purple-900 text-white">
      <Navbar />

      <main className="pt-[100px] px-4 sm:px-8 lg:px-12 pb-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Welcome, Admin 👋</h1>
          <p className="text-lg text-white/80">Here’s your dashboard overview.</p>
        </header>

        {/* Dashboard Widgets */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            className="bg-gray-800 hover:bg-gray-700 transition-colors p-6 rounded-xl shadow-lg cursor-pointer"
            onClick={() => navigate('/admin/client-logo')}
          >
            <div className="flex items-center gap-4 mb-3">
              <FaRegImages className="text-purple-400 text-2xl" />
              <h2 className="text-xl font-semibold">Clients Logos</h2>
            </div>
            <p className="text-sm text-white/70">Manage and view uploaded client logos.</p>
          </div>

          <div 
            className="bg-gray-800 hover:bg-gray-700 transition-colors p-6 rounded-xl shadow-lg cursor-pointer"
            onClick={() => navigate('/admin/blog')}
          >
            <div className="flex items-center gap-4 mb-3">
              <FaBlog className="text-purple-400 text-2xl" />
              <h2 className="text-xl font-semibold">View Blogs</h2>
            </div>
            <p className="text-sm text-white/70">Edit, publish or archive blog posts.</p>
          </div>

          <div 
            className="bg-gray-800 hover:bg-gray-700 transition-colors p-6 rounded-xl shadow-lg cursor-pointer"
            onClick={() => navigate('/admin/client-review')}
          >
            <div className="flex items-center gap-4 mb-3">
              <FaStar className="text-purple-400 text-2xl" />
              <h2 className="text-xl font-semibold">Client Reviews</h2>
            </div>
            <p className="text-sm text-white/70">See what clients are saying about you.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminHome;

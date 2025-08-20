// src/components/CategoryFilter.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { mockCategories } from '../data/mockData';

function CategoryFilter() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const currentFilter = new URLSearchParams(location.search).get('filter');

  useEffect(() => {
    const simulateFetch = () => {
      setCategories(mockCategories);
      setLoading(false);
    };
    simulateFetch();
  }, []);

  if (loading) {
    return <div className="mb-6 text-center text-gray-600">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-red-600 mb-6 text-center">{error}</div>;
  }

  return (
    <div className="mb-10 pb-6 border-b border-gray-200">
      <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">Filter by Category:</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {/* "All Posts" link */}
        <Link
          to="/blog"
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${currentFilter === null ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'}`}
        >
          All Posts
        </Link>

        {/* Dynamic category links */}
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/blog?filter=${category.slug}`}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${currentFilter === category.slug ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'}`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
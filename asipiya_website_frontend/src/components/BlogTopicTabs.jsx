// src/components/BlogTopicTabs.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { mockCategories } from '../data/mockData';

function BlogTopicTabs() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentFilterCategory = queryParams.get('filter');
  const currentTopic = queryParams.get('topic') || 'trending'; // 'trending' or 'industry-related'

  useEffect(() => {
    // Simulate fetching categories
    setCategories(mockCategories);
    setLoading(false);
  }, []);

  return (
    <div className="mb-10 pb-6 border-b border-gray-200">
      <div className="flex justify-center md:justify-start space-x-6 mb-6">
        {/* Trending Tab */}
        <Link
          to={`/blog?topic=trending${currentFilterCategory ? `&filter=${currentFilterCategory}` : ''}`} // Keep category filter if present
          className={`px-4 py-2 text-lg font-semibold border-b-2 transition-colors duration-200
            ${currentTopic === 'trending' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-600 hover:text-purple-800'}`}
        >
          Trending
        </Link>

        
      </div>

      {currentTopic === 'industry-related' && (
        <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
          {loading ? (
            <div className="text-purple-600">Loading categories...</div>
          ) : (
            <>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default BlogTopicTabs;
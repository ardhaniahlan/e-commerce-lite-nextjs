import React from 'react';

interface TopBarProps {
  totalProducts: number;
  showingCount: number;
  onSortChange: (sortOption: string) => void;
}

const TopBarDashboard = ({ totalProducts, showingCount, onSortChange }: TopBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-100">
      
      <div className="text-sm font-semibold tracking-wider text-slate-800 uppercase">
        <span className="text-gray-400 cursor-pointer hover:text-blue-600 transition-colors">Home</span> 
        <span className="mx-2 text-gray-400">&gt;</span> 
        All Products
      </div>
      
      <div className="flex items-center gap-4 mt-4 sm:mt-0">
        <span className="text-sm text-gray-500">
          Showing 1-{showingCount} of {totalProducts} products
        </span>
        
        <select 
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-white border border-gray-200 text-sm text-slate-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm hover:border-blue-300 transition-all"
        >
          <option value="featured">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rating</option>
        </select>
      </div>

    </div>
  );
};

export default TopBarDashboard;
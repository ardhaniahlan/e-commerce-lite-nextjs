"use client";

import RatingFilter from "./RatingFilter";

interface SidebarFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  priceRange: number;
  onPriceChange: (price: number) => void;
  selectedRating: number;
  onSelectRating: (rating: number) => void;
}

const SidebarFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceChange,
  selectedRating,
  onSelectRating,
}: SidebarFilterProps) => {
  return (
    <div className="w-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
      <div>
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
          Categories
        </h3>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === ""}
              onChange={() => onSelectCategory("")}
              className="w-4 h-4 text-blue-700 border-gray-300 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-sm text-gray-700 group-hover:text-blue-700 transition-colors capitalize">
              All Products
            </span>
          </label>

          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat}
                onChange={() => onSelectCategory(cat)}
                className="w-4 h-4 text-blue-700 border-gray-300 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-blue-700 transition-colors capitalize">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Price Range
          </h3>
          <span className="text-sm font-semibold text-blue-700">
            ${priceRange}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={priceRange}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-700"
        />

        <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
          <span>$0</span>
          <span>$1000+</span>
        </div>
      </div>

      <hr className="border-gray-100" />

      <RatingFilter
        selectedRating={selectedRating}
        onSelectRating={onSelectRating}
      />
    </div>
  );
};

export default SidebarFilter;

"use client";

import React, { useState } from "react";

interface RatingFilterProps {
  selectedRating: number;
  onSelectRating: (rating: number) => void;
}

const RatingFilter = ({ selectedRating, onSelectRating }: RatingFilterProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div>
      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
        Customer Rating
      </h3>
      
      <div className="flex items-center gap-1.5">

        {[1, 2, 3, 4, 5].map((star) => {

          const isFilled = (hoverRating || selectedRating) >= star;

          return (
            <button
              key={star}
              type="button"
              onClick={() => onSelectRating(star)}  
              onMouseEnter={() => setHoverRating(star)} 
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none transition-transform hover:scale-110"
              aria-label={`Rate ${star} stars`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-6 h-6 ${isFilled ? "text-amber-500" : "text-gray-200"}`}
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="odd"
                />
              </svg>
            </button>
          );
        })}
        
        <span className="text-xs text-gray-500 ml-2 font-medium">
          {selectedRating > 0 ? `${selectedRating} & Up` : "All"}
        </span>
      </div>
    </div>
  );
};

export default RatingFilter;
"use client";

import React from "react";

interface ResultImageProps {
  resultImage: string | null;
  isLoading?: boolean;
}

const ResultImage: React.FC<ResultImageProps> = ({
  resultImage,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-6">
        {/* Simple spinner */}
        <svg
          className="animate-spin h-8 w-8 text-indigo-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      </div>
    );
  }

  if (resultImage) {
    return (
      <img
        src={`data:image/jpeg;base64,${resultImage}`}
        alt="Detection result"
        className="mt-6 rounded-lg shadow-md max-w-full"
      />
    );
  }

  // Render nothing if no loading or resultImage
  return null;
};

export default ResultImage;

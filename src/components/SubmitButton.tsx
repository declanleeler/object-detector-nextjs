"use client";

import React from "react";

interface SubmitButtonProps {
  onSubmit: () => void;
  label?: string;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  onSubmit,
  label = "Submit",
  disabled = false,
}) => {
  return (
    <button
      onClick={onSubmit}
      disabled={disabled}
      className={`px-6 py-2 w-full max-w-lg rounded-md text-white font-semibold transition-colors duration-200
        ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-500 hover:bg-indigo-700"
        }`}
    >
      {label}
    </button>
  );
};

export default SubmitButton;

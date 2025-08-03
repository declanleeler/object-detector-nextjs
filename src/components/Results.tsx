"use client";

import Spinner from "./Spinner";

interface ResultsProps {
  isLoading: boolean;
  isError: boolean;
  resultImage: string | null;
}

const Results: React.FC<ResultsProps> = ({
  isLoading,
  isError,
  resultImage,
}) => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg justify-center">
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <p className="text-red-500 mt-6">
            Something went wrong. Please try again.
          </p>
        ) : resultImage ? (
          <img
            src={resultImage}
            alt="Detection result"
            className="mt-6 rounded-lg shadow-md max-w-full"
          />
        ) : null}
      </div>
    </div>
  );
};

export default Results;

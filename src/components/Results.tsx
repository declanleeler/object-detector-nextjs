"use client";

import Spinner from "./Spinner";

interface ResultsProps {
  isLoading: boolean;
  resultImage: string | null;
}

const Results: React.FC<ResultsProps> = ({ isLoading, resultImage }) => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg justify-center">
        {isLoading ? (
          <Spinner />
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

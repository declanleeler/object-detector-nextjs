"use client";

import Spinner from "./Spinner";

interface ResultsProps {
  resultRef: React.RefObject<HTMLDivElement | null>;
  isLoading: boolean;
  resultImage: string | null;
}

const Results: React.FC<ResultsProps> = ({
  resultRef,
  isLoading,
  resultImage,
}) => {
  const onImageLoad = () => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  return (
    <div ref={resultRef} className="flex justify-center">
      <div className="w-full max-w-lg justify-center">
        {isLoading ? (
          <Spinner />
        ) : (
          <img
            src={`data:image/jpeg;base64,${resultImage}`}
            alt="Detection result"
            className="mt-6 rounded-lg shadow-md max-w-full"
            onLoad={onImageLoad}
          />
        )}
      </div>
    </div>
  );
};

export default Results;

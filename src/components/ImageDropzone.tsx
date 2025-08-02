"use client";

import { ImagePlus } from "lucide-react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type ImageDropzoneProps = {
  onDropAccepted: (files: File[]) => void;
};

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onDropAccepted }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onDropAccepted(acceptedFiles);
    },
    [onDropAccepted]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: { "image/*": [] },
      maxFiles: 1,
    });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed w-full max-w-lg rounded-xl p-6 text-center cursor-pointer transition-colors duration-200
        ${
          isDragReject
            ? "border-red-400 bg-red-50"
            : isDragActive
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
    >
      <input {...getInputProps()} />
      {isDragReject ? (
        <p className="text-red-500">Only image files are accepted.</p>
      ) : isDragActive ? (
        <p className="text-blue-500">Drop your image here...</p>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <ImagePlus className="w-8 h-8 text-white opacity-80" />
          <p className="heading3">Upload Image</p>
          <p className="body2 ">
            Drag and drop an image, or click to select a file
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;

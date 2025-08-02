"use client";

import { ImagePlus, X } from "lucide-react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type ImageDropzoneProps = {
  onDropAccepted: (files: File[]) => void;
  uploadedImage: File | null;
  onRemoveImage?: () => void;
};

const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  onDropAccepted,
  uploadedImage = null,
  onRemoveImage,
}) => {
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
      className={`border-2 border-dashed w-full max-w-lg h-56 rounded-xl p-6 text-center cursor-pointer transition-colors duration-200 flex flex-col items-center justify-center
        ${
          isDragReject
            ? "border-red-400 bg-red-50"
            : isDragActive
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
    >
      <input {...getInputProps()} />
      {uploadedImage ? (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <img
            src={URL.createObjectURL(uploadedImage)}
            alt="Uploaded preview"
            className="max-h-full max-w-full rounded-lg object-contain"
          />
          {onRemoveImage && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering dropzone click
                onRemoveImage();
              }}
              className="absolute top-1 right-1 bg-white bg-opacity-70 rounded-full p-1 hover:bg-opacity-100 transition"
              aria-label="Remove image"
            >
              <X
                className="w-5 h-5 text-gray-700 cursor-pointer hover:text-red-600 transition-colors"
                strokeWidth={3}
              />
            </button>
          )}
        </div>
      ) : isDragReject ? (
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

"use client";

import ImageDropzone from "@/components/ImageDropzone";
import ProbabilitySlider from "@/components/ProbabilitySlider";
import ResultImage from "@/components/ResultImage";
import SubmitButton from "@/components/SubmitButton";
import { analyzeImage } from "@/utils/api/analyzeImage";
import _ from "lodash";
import React, { useState } from "react";

const Home: React.FC = () => {
  const [threshold, setThreshold] = useState<number>(0.5);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleImageDrop = (files: File[]): void => {
    const file = files[0]; // there will only be 1 file
    if (!file) return;
    setUploadedImage(file);
    console.log("helloooooo");
    console.log(uploadedImage);
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      if (!_.isNil(uploadedImage)) {
        const base64Image = await analyzeImage(uploadedImage, threshold);
        setResultImage(base64Image);
      }

      return undefined;
    } catch (err) {
      console.error("Error analyzing image:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-8 gap-6 items-center">
      <h1 className="heading1">Object Detection</h1>
      <p className="body1">Identify objects in your image with AI</p>
      <ImageDropzone
        onDropAccepted={handleImageDrop}
        uploadedImage={uploadedImage}
        onRemoveImage={handleRemoveImage}
      />
      <ProbabilitySlider value={threshold} onChange={setThreshold} />
      <SubmitButton onSubmit={handleSubmit} />
      <ResultImage resultImage={resultImage} />
    </div>
  );
};

export default Home;

"use client";

import ImageDropzone from "@/components/ImageDropzone";
import ProbabilitySlider from "@/components/ProbabilitySlider";
import SubmitButton from "@/components/SubmitButton";
import React, { useState } from "react";

const Home: React.FC = () => {
  const [threshold, setThreshold] = useState(0.5);

  const handleImageDrop = (files: File[]): void => {
    const file = files[0]; // there will only be 1 file
    if (!file) return;

    console.log("Uploading file:", file);
  };

  const handleSubmit = (): void => {};

  return (
    <div className="flex flex-col min-h-screen p-8 gap-6 items-center">
      <h1 className="heading1">Object Detection</h1>
      <p className="body1">Identify objects in your image with AI</p>
      <ImageDropzone onDropAccepted={handleImageDrop} />
      <ProbabilitySlider value={threshold} onChange={setThreshold} />
      <SubmitButton onSubmit={handleSubmit} />
    </div>
  );
};

export default Home;

"use client";

import ImageDropzone from "@/components/ImageDropzone";
import ProbabilitySlider from "@/components/ProbabilitySlider";
import Results from "@/components/Results";
import SubmitButton from "@/components/SubmitButton";
import { analyzeImage } from "@/utils/api/analyzeImage";
import { useMutation } from "@tanstack/react-query";
import _ from "lodash";
import React, { useRef, useState } from "react";

const Home: React.FC = () => {
  const [threshold, setThreshold] = useState<number>(0.5);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const analyzeImageMutation = useMutation({
    mutationFn: async () => {
      if (!uploadedImage) throw new Error("No image uploaded");
      return await analyzeImage(uploadedImage, threshold);
    },
    onSuccess: (base64Image: string) => {
      setResultImage(base64Image);
    },
    onError: (error: Error) => {
      console.error("Error analyzing image:", error.message);
    },
  });

  const handleUploadImage = (files: File[]): void => {
    const file = files[0]; // there will only be 1 file
    if (!file) return;
    setUploadedImage(file);
  };

  const handleRemoveImage = (): void => {
    setUploadedImage(null);
  };

  const handleSubmit = (): void => {
    analyzeImageMutation.mutate();
    resultRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen p-8 gap-6 items-center">
      <h1 className="heading1">Object Detection</h1>
      <p className="body1">Identify objects in your image with AI</p>
      <ImageDropzone
        onDropAccepted={handleUploadImage}
        uploadedImage={uploadedImage}
        onRemoveImage={handleRemoveImage}
      />
      <ProbabilitySlider value={threshold} onChange={setThreshold} />
      <SubmitButton onSubmit={handleSubmit} disabled={_.isNil(uploadedImage)} />
      <Results
        resultRef={resultRef}
        isLoading={analyzeImageMutation.isPending}
        resultImage={resultImage}
      />
    </div>
  );
};

export default Home;

"use client";

import React, { useState, useEffect } from "react";

type ProbabilitySliderProps = {
  value?: number;
  onChange?: (value: number) => void;
};

const ProbabilitySlider: React.FC<ProbabilitySliderProps> = ({
  value = 0.5,
  onChange,
}) => {
  const [probability, setProbability] = useState(value);

  useEffect(() => {
    setProbability(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setProbability(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-slate-900 rounded-lg text-white">
      <label htmlFor="probability-slider" className="heading3">
        Set prediction confidence threshold: {Math.round(probability * 100)}%
      </label>
      <p className="body2 pb-2">
        Higher thresholds show only the most confident detections.
      </p>
      <input
        id="probability-slider"
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={probability}
        onChange={handleChange}
        style={{ "--value": probability } as React.CSSProperties}
        className="range-slider"
      />
      <div className="flex justify-between text-xs my-1">
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default ProbabilitySlider;

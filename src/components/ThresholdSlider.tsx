"use client";

import React, { useState, useEffect } from "react";

type ThresholdSliderProps = {
  value: number;
  onChange?: (value: number) => void;
};

const ThresholdSlider: React.FC<ThresholdSliderProps> = ({
  value,
  onChange,
}) => {
  const [threshold, setThreshold] = useState(value);

  useEffect(() => {
    setThreshold(value);
  }, [value]);

  useEffect(() => {
    setThreshold(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setThreshold(newValue);
    onChange?.(newValue);
  };
  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-slate-900 rounded-lg text-white">
      <label htmlFor="probability-slider" className="heading3">
        Set prediction confidence threshold: {Math.round(threshold * 100)}%
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
        value={threshold}
        onChange={handleChange}
        style={{ "--value": threshold } as React.CSSProperties}
        className="range-slider"
      />
      <div className="flex justify-between text-xs my-1">
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default ThresholdSlider;

import { callHuggingFaceAPI } from "@/services/huggingface";
import {
  fileToBuffer,
  bufferToBase64,
  drawBoundingBoxes,
} from "@/utils/imageUtils";
import { NextRequest, NextResponse } from "next/server";

type ValidatedInput = {
  file: File;
  threshold: number;
};

export async function POST(req: NextRequest) {
  try {
    const formData = await parseAnalyzeRequest(req);
    const { file, threshold } = validateAnalyzeFormData(formData);
    const imageBuffer = await fileToBuffer(file);
    const base64Image = bufferToBase64(imageBuffer);
    const detections = await callHuggingFaceAPI(base64Image, threshold);
    const base64Result = await drawBoundingBoxes(imageBuffer, detections);
    return NextResponse.json({
      result: base64Result,
    });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 400 }
    );
  }
}

async function parseAnalyzeRequest(req: NextRequest): Promise<FormData> {
  return req.formData();
}

function validateAnalyzeFormData(formData: FormData): ValidatedInput {
  const file = formData.get("file");
  const thresholdRaw = formData.get("threshold");

  if (!file || !(file instanceof File)) {
    throw new Error("Missing or invalid file.");
  }

  const threshold = Number(thresholdRaw);
  if (isNaN(threshold) || threshold < 0 || threshold > 100) {
    throw new Error("Threshold must be a number between 0 and 100.");
  }

  return { file, threshold };
}

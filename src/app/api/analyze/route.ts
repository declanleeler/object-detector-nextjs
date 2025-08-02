import { callHuggingFaceAPI } from "@/backend_utils/api/huggingface";
import { NextRequest, NextResponse } from "next/server";

type ValidatedInput = {
  file: File;
  threshold: number;
};

export async function POST(req: NextRequest) {
  try {
    const formData = await parseAnalyzeRequest(req);
    const { file, threshold } = validateAnalyzeFormData(formData);
    const base64Image = await encodeFileToBase64(file);
    const result = await callHuggingFaceAPI(base64Image, threshold / 100);
    console.log(threshold);
    console.log(result);
    const base64String = Buffer.from(JSON.stringify(result)).toString("base64");

    return NextResponse.json({
      result: base64String,
    });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 400 }
    );
  }
}

async function encodeFileToBase64(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer).toString("base64");
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

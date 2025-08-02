import { HuggingFaceResponse } from "@/backend_utils/api/types";

const HF_API_URL =
  "https://api-inference.huggingface.co/models/facebook/detr-resnet-50";
const HF_API_KEY = process.env.HF_API_KEY;

if (!HF_API_KEY) {
  throw new Error("Missing Hugging Face API key in environment variables");
}

export async function callHuggingFaceAPI(
  imageBase64: string,
  threshold: number
): Promise<HuggingFaceResponse> {
  const response = await fetch(HF_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: imageBase64,
      parameters: {
        threshold,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Hugging Face API error: ${errorText}`);
  }

  const data = await response.json();
  return data;
}

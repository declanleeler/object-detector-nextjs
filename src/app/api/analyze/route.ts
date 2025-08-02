import { NextRequest, NextResponse } from "next/server";

type ValidatedInput = {
  file: File;
  threshold?: number;
};

export async function POST(req: NextRequest) {
  try {
    const formData = await parseAnalyzeRequest(req);
    const { file, threshold } = validateAnalyzeFormData(formData);

    const arrayBuffer = await file.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString("base64");

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

async function parseAnalyzeRequest(req: NextRequest): Promise<FormData> {
  return req.formData();
}

function validateAnalyzeFormData(formData: FormData): ValidatedInput {
  const file = formData.get("file");
  const thresholdRaw = formData.get("threshold");

  if (!file || !(file instanceof File)) {
    throw new Error("Missing or invalid file.");
  }

  let threshold: number | undefined = undefined;
  if (thresholdRaw !== null) {
    const parsed = Number(thresholdRaw);
    if (isNaN(parsed) || parsed < 0 || parsed > 100) {
      throw new Error("Threshold must be a number between 0 and 100.");
    }
    threshold = parsed;
  }

  return { file, threshold };
}

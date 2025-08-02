export async function analyzeImage(
  file: File,
  threshold: number
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("threshold", threshold.toString());

  const res = await fetch("/api/analyze", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Unknown error");
  }

  const data = await res.json();
  return data.result as string;
}

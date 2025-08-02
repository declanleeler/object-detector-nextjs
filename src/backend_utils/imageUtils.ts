import { createCanvas, loadImage } from "canvas";
import { Detection } from "./api/types";

export async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export function bufferToBase64(buffer: Buffer): string {
  return buffer.toString("base64");
}

export async function drawBoundingBoxes(
  imageBuffer: Buffer,
  detections: Detection[]
): Promise<string> {
  // Load image from buffer
  const img = await loadImage(imageBuffer);

  // Create canvas same size as image
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d");

  // Draw original image on canvas
  ctx.drawImage(img, 0, 0);

  // Set style for boxes and labels
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  ctx.font = "16px Arial";
  ctx.fillStyle = "red";

  // Draw each bounding box
  for (const det of detections) {
    const { xmin, ymin, xmax, ymax } = det.box;
    const width = xmax - xmin;
    const height = ymax - ymin;

    // Draw rectangle
    ctx.strokeRect(xmin, ymin, width, height);

    // Draw label and score text
    const text = `${det.label} (${(det.score * 100).toFixed(1)}%)`;
    ctx.fillText(text, xmin, ymin > 20 ? ymin - 5 : ymin + 15);
  }

  // Export to base64 PNG
  const base64 = canvas.toDataURL("image/png");

  return base64;
}

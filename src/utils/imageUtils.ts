import { createCanvas, loadImage } from "canvas";
import { Detection } from "../types/types";

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
  const img = await loadImage(imageBuffer);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(img, 0, 0);

  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  ctx.font = "16px Arial";

  for (const det of detections) {
    const { xmin, ymin, xmax, ymax } = det.box;
    const width = xmax - xmin;
    const height = ymax - ymin;

    // Draw bounding box
    ctx.strokeRect(xmin, ymin, width, height);

    // Format label
    const text = `${det.label} (${(det.score * 100).toFixed(1)}%)`;

    // Measure text width/height
    const textMetrics = ctx.measureText(text);
    const padding = 4;
    const textWidth = textMetrics.width + padding * 2;
    const textHeight = 20; // approximate height

    // Determine text position
    const textX = xmin;
    const textY = ymin > 20 ? ymin - 5 : ymin + 15;

    // Draw opaque background
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(
      textX - padding,
      textY - textHeight + 4,
      textWidth,
      textHeight
    );

    // Draw text
    ctx.fillStyle = "white";
    ctx.fillText(text, textX, textY);
  }

  return canvas.toDataURL("image/png");
}

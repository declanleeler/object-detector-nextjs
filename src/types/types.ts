export interface BoundingBox {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
}

export interface Detection {
  label: string;
  score: number;
  box: BoundingBox;
}

export type HuggingFaceResponse = Detection[];

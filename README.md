# 🧠 Object Detection App

This is a full-stack object detection web application built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **FastAPI**-like API routes (via Next.js API routes). It uses **Hugging Face’s DETR model** (`facebook/detr-resnet-50`) to detect and label objects in uploaded images.

## ✨ Features

- 🖼️ Drag-and-drop image upload
- 🎯 Adjustable detection confidence threshold
- 📦 Server-side call to Hugging Face inference API
- 🖌️ Overlaid bounding boxes rendered on image

---

## 🚀 Getting Started

### 1. Clone the Repo

### 2. CD into the folder

### 3. Install dependencies

- `npm install`

### 4. Setup environment variables

- create a `.env` file in the root level of the repo
- add `HF_API_KEY=your_huggingface_token_here`

### 5. Run the development server

- `npm run dev`

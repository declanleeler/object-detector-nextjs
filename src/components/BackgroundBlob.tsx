// src/components/BackgroundBlob.tsx
export default function BackgroundBlob() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none select-none">
      <div className="absolute w-[600px] h-[600px] bg-pink-300 opacity-30 rounded-full blur-3xl top-[-100px] left-[-100px] animate-blob" />
      <div className="absolute w-[500px] h-[500px] bg-blue-300 opacity-30 rounded-full blur-3xl bottom-[-150px] right-[-100px] animate-blob animation-delay-2000" />
      <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
    </div>
  );
}

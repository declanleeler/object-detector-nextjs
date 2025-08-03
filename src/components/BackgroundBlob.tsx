export default function BackgroundBlob() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none select-none">
      <div
        className="absolute top-[-100px] left-[-100px] w-[600px] h-[600px] rounded-full"
        style={{
          backgroundColor: "rgba(249, 168, 212, 0.3)",
          filter: "blur(60px)",
          willChange: "transform",
        }}
      />
      <div
        className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] rounded-full"
        style={{
          backgroundColor: "rgba(147, 197, 253, 0.3)",
          filter: "blur(60px)",
          willChange: "transform",
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/20 to-transparent" />
    </div>
  );
}

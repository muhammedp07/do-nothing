export function DotLogo({ size = 80 }: { size?: number }) {
  const dot = size / 13;
  return (
    <div
      className="grid grid-cols-5 gap-[2px]"
      style={{ width: size, height: size }}
    >
      {/* Letter "N" in dot matrix */}
      {[
        1,0,0,0,1,
        1,1,0,0,1,
        1,0,1,0,1,
        1,0,0,1,1,
        1,0,0,0,1,
      ].map((on, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: dot,
            height: dot,
            background: on ? "var(--color-primary)" : "var(--color-dot)",
          }}
        />
      ))}
    </div>
  );
}

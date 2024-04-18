export function FullPill({ color }: { color: string }) {
  return (
    <span
      className="inline-block bg-blue-500 rounded-full h-6 w-10 rotate-45 mb-4"
      style={{ backgroundColor: `#${color}` }}
    ></span>
  );
}

export function HalfPill({ color }: { color: string }) {
  return (
    <span
      className="inline-block bg-blue-500 rounded-r-full h-6 w-7 rotate-45 mb-4 ml-1"
      style={{ backgroundColor: `#${color}` }}
    ></span>
  );
}

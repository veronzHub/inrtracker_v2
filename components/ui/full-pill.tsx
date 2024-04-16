export default function FullPill({ color }) {
  return (
    <span
      className="inline-block bg-blue-500 rounded-full h-4 w-8 rotate-45 mb-4"
      style={{ backgroundColor: `#${color}` }}
    ></span>
  );
}

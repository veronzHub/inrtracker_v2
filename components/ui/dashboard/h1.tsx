export default function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-4xl md:text-5xl font-bold mb-10 text-sky-700">
      {children}
    </h1>
  );
}

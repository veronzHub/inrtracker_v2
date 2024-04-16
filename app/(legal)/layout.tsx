export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen">
      <div className="pr-10 py-10 pl-24">{children}</div>
    </main>
  );
}

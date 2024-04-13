import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-r from-sky-300 to-sky-700">
      {children}
    </div>
  );
}

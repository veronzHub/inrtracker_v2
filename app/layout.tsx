import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    template: "%s | INRTracker",
    default: "INRTracker",
  },
  description: "Keep track of your INR's, vitamin K, weight and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-slate-100 text-foreground">{children}</body>
    </html>
  );
}

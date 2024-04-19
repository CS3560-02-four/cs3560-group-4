import type { Metadata } from "next";
import "./ui/globals.css";

export const metadata: Metadata = {
  title: "CS3560 Group Project"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CS3560 Group Project",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

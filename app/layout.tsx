import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pawsibly Rin",
  description:
    "Explore the innovative portfolio of Sunchuangyu Huang, a seasoned Data Scientist and Full Stack Developer, showcasing expertise in data-driven solutions and modern web technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className=" font-poppins">{children}</body>
    </html>
  );
}

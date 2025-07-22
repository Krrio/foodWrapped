import type { Metadata } from "next";
import "./globals.css";
import { circularStd } from "./fonts";

export const metadata: Metadata = {
  title: "Food wrapped",
  description: "zoba ile dobre jedzonka miałeś w tym roku",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${circularStd.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

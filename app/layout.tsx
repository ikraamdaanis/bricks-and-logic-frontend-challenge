import { QueryProvider } from "components/providers/QueryProvider";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import { Header } from "components/Header";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rick and Morty",
  description: "Rick and Morty"
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <QueryProvider>
      <html lang="en">
        <body className={manrope.className}>
          <Header />
          {children}
        </body>
      </html>
    </QueryProvider>
  );
}

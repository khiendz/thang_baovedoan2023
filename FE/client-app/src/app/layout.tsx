import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LayoutDefault from "@/components/layouts/LayoutDefault";
import type { PropsWithChildren } from 'react'
import { RootStyleRegistry } from '../modules/shared/components/Root-style-registry';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Đặt tour du lịch trực tuyến",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vn">
    <head />
    <body>
      <RootStyleRegistry>{children}</RootStyleRegistry>
    </body>
  </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EasyCompliance - Gestão de Compliance",
  description: "Sistema de Gestão de Compliance Multi-Tenant",
};

export default function RootLayout({
  children,
}: {
  children: React.Node;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

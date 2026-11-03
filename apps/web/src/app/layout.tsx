import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpotMe",
  description: "Suas estatísticas do Spotify, sem esperar dezembro.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Artistas" };

export default function Page() {
  return (
    <ComingSoon
      title="Artistas"
      issue="MAD-29"
      description="Ranking completo e a página de cada artista: horas ouvidas, evolução e músicas dele."
    />
  );
}

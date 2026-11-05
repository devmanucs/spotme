import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Histórico" };

export default function Page() {
  return (
    <ComingSoon
      title="Histórico"
      issue="MAD-29"
      description="Tudo o que tocou, dia a dia, com filtro por fonte (coletor ou histórico importado)."
    />
  );
}

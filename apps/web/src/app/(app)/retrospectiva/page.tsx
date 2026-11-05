import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Retrospectiva" };

export default function Page() {
  return (
    <ComingSoon
      title="Retrospectiva"
      issue="MAD-30"
      description="O ano inteiro em um calendário, mês a mês e os seus top 5 em blocos estilo Wrapped."
    />
  );
}

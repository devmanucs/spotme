import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Importar histórico" };

export default function Page() {
  return (
    <ComingSoon
      title="Importar histórico"
      issue="MAD-25"
      description="Solte aqui os arquivos do Extended Streaming History para trazer anos de escuta."
    />
  );
}

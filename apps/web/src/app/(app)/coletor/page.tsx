import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Coletor" };

export default function Page() {
  return (
    <ComingSoon
      title="Coletor"
      issue="MAD-31"
      description="Última coleta, lacunas e a conta conectada."
    />
  );
}

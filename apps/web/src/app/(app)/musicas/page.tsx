import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Músicas" };

export default function Page() {
  return (
    <ComingSoon
      title="Músicas"
      issue="MAD-29"
      description="Ranking completo e a página de cada música: reproduções, primeira e última vez."
    />
  );
}

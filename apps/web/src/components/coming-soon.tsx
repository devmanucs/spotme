import { DsButton } from "@spotme/ui/components/ds/button";
import Link from "next/link";
import { PageHero } from "./page-hero";

/** Página de rota que ainda não existe: cabeçalho cinza + frase + ação, como os vazios do Spotify. */
export function ComingSoon({
  title,
  description,
  issue,
}: {
  title: string;
  description: string;
  issue: string;
}) {
  return (
    <>
      <PageHero label="Em breve" title={title} meta={`Entra na ${issue}`} />
      <div className="flex flex-col items-start gap-4 px-4 py-6 md:px-6">
        <p className="max-w-prose text-muted-foreground">{description}</p>
        <DsButton variant="inverse" nativeButton={false} render={<Link href="/" />}>
          Voltar ao início
        </DsButton>
      </div>
    </>
  );
}

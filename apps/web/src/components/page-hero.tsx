import { cn } from "@spotme/ui/lib/utils";
import type { CSSProperties, ReactNode } from "react";
import { EstimateBadge } from "./estimate-badge";

export interface PageHeroProps {
  /** Rótulo pequeno acima do título ("Tempo ouvido · novembro"). */
  label: string;
  /** Número ou nome gigante. */
  title: ReactNode;
  /** Linha de metadado em cinza ("1.204 reproduções · 312 músicas"). */
  meta?: ReactNode;
  /** Cor dominante (oklch, já com L 0.35–0.55). Sem cor = cinza neutro. */
  color?: string | null;
  /** Capa ou foto à esquerda (CoverArt). */
  media?: ReactNode;
  /** O título contém tempo estimado. */
  estimated?: boolean;
  className?: string;
}

/** Cabeçalho de página estilo artista/playlist do Spotify: degradê + número herói. */
export function PageHero({
  label,
  title,
  meta,
  color,
  media,
  estimated,
  className,
}: PageHeroProps) {
  const style = color ? ({ "--hero": color } as CSSProperties) : undefined;

  return (
    <header
      style={style}
      className={cn(
        "bg-hero flex flex-col gap-6 px-4 pt-8 pb-6 sm:flex-row sm:items-end sm:pt-16 md:px-6",
        className,
      )}
    >
      {media ? <div className="w-36 shrink-0 sm:w-48 lg:w-56">{media}</div> : null}
      <div className="flex min-w-0 flex-col gap-2">
        <p className="font-medium text-sm">{label}</p>
        <h1 className="tabular flex items-baseline gap-3 font-extrabold text-[clamp(48px,7vw,96px)] leading-[0.95] tracking-[-0.04em]">
          <span className="truncate">{title}</span>
          {estimated ? <EstimateBadge className="self-center" /> : null}
        </h1>
        {meta ? <p className="tabular font-medium text-muted-foreground text-sm">{meta}</p> : null}
      </div>
    </header>
  );
}

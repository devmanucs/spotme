import { PlayIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { dsButtonVariants } from "@spotme/ui/components/ds/button";
import { cn } from "@spotme/ui/lib/utils";
import Link from "next/link";
import { CoverArt } from "./cover-art";

export interface MediaCardProps {
  title: string;
  subtitle: string;
  /** Página do item dentro do SpotMe. */
  href: string;
  shape?: "square" | "round";
  cover?: { src?: string | null; color?: string | null };
  /** Link para abrir o item no Spotify (botão verde no hover). Fase 2: vira "tocar". */
  spotifyUrl?: string;
  className?: string;
}

/** Card de álbum/artista: fundo que clareia no hover e botão verde subindo. */
export function MediaCard({
  title,
  subtitle,
  href,
  shape = "square",
  cover,
  spotifyUrl,
  className,
}: MediaCardProps) {
  return (
    <article
      className={cn(
        "group relative flex w-44 shrink-0 snap-start flex-col gap-2 rounded-lg p-3 transition-colors duration-150 hover:bg-elevated md:w-auto",
        className,
      )}
    >
      <div className="relative">
        <CoverArt src={cover?.src} color={cover?.color} alt={title} shape={shape} />
        {spotifyUrl ? (
          <a
            href={spotifyUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Abrir ${title} no Spotify`}
            className={cn(
              dsButtonVariants({ variant: "primary", size: "icon-lg" }),
              "absolute right-2 bottom-2 z-10 translate-y-2 opacity-0 shadow-[0_8px_8px_oklch(0_0_0/30%)] group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100",
            )}
          >
            <HugeiconsIcon icon={PlayIcon} strokeWidth={2} className="fill-current" />
          </a>
        ) : null}
      </div>
      <div className="min-w-0">
        <Link
          href={href}
          className="block truncate font-bold text-base after:absolute after:inset-0 after:rounded-lg"
        >
          {title}
        </Link>
        <p className="truncate text-muted-foreground text-sm">{subtitle}</p>
      </div>
    </article>
  );
}

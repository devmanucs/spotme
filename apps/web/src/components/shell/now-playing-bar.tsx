import { NextIcon, PlayIcon, PreviousIcon, VolumeHighIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { DsButton } from "@spotme/ui/components/ds/button";
import { cn } from "@spotme/ui/lib/utils";
import Link from "next/link";
import { CoverArt } from "../cover-art";

export interface LastPlayed {
  trackId: string;
  title: string;
  artist: string;
  /** "há 12 min" — já formatado no servidor, no fuso da conta. */
  playedAgo: string;
  cover?: { src?: string | null; color?: string | null };
}

/**
 * Rodapé do app. Fase 1: "Tocou por último" lido do banco; os controles ficam
 * visíveis mas desligados até o player da Fase 2.
 */
export function NowPlayingBar({
  last,
  className,
}: {
  last: LastPlayed | null;
  className?: string;
}) {
  return (
    <section
      aria-label="Tocou por último"
      className={cn(
        "grid h-[72px] shrink-0 grid-cols-[1fr_auto] items-center gap-4 px-2 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1fr)]",
        "max-md:mx-2 max-md:h-14 max-md:rounded-md max-md:bg-elevated max-md:px-2",
        className,
      )}
    >
      {last ? (
        <div className="flex min-w-0 items-center gap-3">
          <CoverArt
            src={last.cover?.src}
            color={last.cover?.color}
            alt={last.title}
            className="size-10 md:size-14"
            sizes="56px"
          />
          <div className="min-w-0">
            <Link
              href={`/musicas/${last.trackId}`}
              className="block truncate font-medium text-sm hover:underline"
            >
              {last.title}
            </Link>
            <p className="truncate text-muted-foreground text-xs">
              {last.artist} · tocou {last.playedAgo}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">Nada tocou ainda.</p>
      )}

      <div className="flex flex-col items-center gap-1 max-md:hidden">
        <div className="flex items-center gap-4">
          <DsButton variant="ghost" size="icon-sm" disabled aria-label="Anterior">
            <HugeiconsIcon icon={PreviousIcon} strokeWidth={2} className="fill-current" />
          </DsButton>
          <DsButton variant="inverse" size="icon-sm" disabled aria-label="Tocar">
            <HugeiconsIcon icon={PlayIcon} strokeWidth={2} className="fill-current" />
          </DsButton>
          <DsButton variant="ghost" size="icon-sm" disabled aria-label="Próxima">
            <HugeiconsIcon icon={NextIcon} strokeWidth={2} className="fill-current" />
          </DsButton>
        </div>
        <div className="flex w-full max-w-[560px] items-center gap-2 text-muted-foreground text-xs">
          <span className="tabular">-:--</span>
          <div className="h-1 flex-1 rounded-full bg-pressed" aria-hidden />
          <span className="tabular">-:--</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 text-muted-foreground max-md:hidden">
        <span className="text-xs">Player chega na Fase 2</span>
        <HugeiconsIcon
          icon={VolumeHighIcon}
          strokeWidth={2}
          className="size-4 opacity-40"
          aria-hidden
        />
        <div className="h-1 w-24 rounded-full bg-pressed" aria-hidden />
      </div>
    </section>
  );
}

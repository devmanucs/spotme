import { PlayIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { formatCount, formatDuration, formatTrackLength } from "@spotme/core";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@spotme/ui/components/ui/table";
import { cn } from "@spotme/ui/lib/utils";
import Link from "next/link";
import { CoverArt } from "./cover-art";
import { EstimateBadge } from "./estimate-badge";

export interface TrackRow {
  id: string;
  title: string;
  artist: string;
  album: string;
  plays: number;
  msPlayed: number;
  durationMs: number;
  estimated?: boolean;
  cover?: { src?: string | null; color?: string | null };
}

export interface TrackTableProps {
  tracks: readonly TrackRow[];
  caption: string;
  className?: string;
}

/** Lista de faixas estilo playlist do Spotify. O `#` vira play no hover. */
export function TrackTable({ tracks, caption, className }: TrackTableProps) {
  return (
    <Table className={cn("table-fixed", className)}>
      <caption className="sr-only">{caption}</caption>
      <TableHeader className="[&_tr]:border-border">
        <TableRow className="text-muted-foreground text-sm hover:bg-transparent">
          <TableHead className="w-10 text-right font-normal text-muted-foreground">#</TableHead>
          <TableHead className="font-normal text-muted-foreground">Título</TableHead>
          <TableHead className="hidden font-normal text-muted-foreground lg:table-cell">
            Álbum
          </TableHead>
          <TableHead className="hidden w-28 text-right font-normal text-muted-foreground sm:table-cell">
            Reproduções
          </TableHead>
          <TableHead className="w-32 text-right font-normal text-muted-foreground">
            Tempo ouvido
          </TableHead>
          <TableHead className="hidden w-20 text-right font-normal text-muted-foreground md:table-cell">
            Duração
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tracks.map((track, index) => (
          <TableRow
            key={track.id}
            className="group tabular border-0 text-muted-foreground text-sm hover:bg-highlight [&>td:first-child]:rounded-l-md [&>td:last-child]:rounded-r-md"
          >
            <TableCell className="text-right">
              <span className="group-hover:hidden">{index + 1}</span>
              <HugeiconsIcon
                icon={PlayIcon}
                strokeWidth={2}
                className="ml-auto hidden size-4 fill-current text-foreground group-hover:block"
                aria-hidden
              />
            </TableCell>
            <TableCell>
              <div className="flex min-w-0 items-center gap-3">
                <CoverArt
                  src={track.cover?.src}
                  color={track.cover?.color}
                  alt={track.album}
                  className="size-10 shadow-none"
                  sizes="40px"
                />
                <div className="min-w-0">
                  <Link
                    href={`/musicas/${track.id}`}
                    className="block truncate font-medium text-base text-foreground hover:underline"
                  >
                    {track.title}
                  </Link>
                  <p className="truncate">{track.artist}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="hidden truncate lg:table-cell">{track.album}</TableCell>
            <TableCell className="hidden text-right sm:table-cell">
              {formatCount(track.plays)}
            </TableCell>
            <TableCell className="text-right">
              <span className="inline-flex items-center gap-1">
                {formatDuration(track.msPlayed)}
                {track.estimated ? <EstimateBadge /> : null}
              </span>
            </TableCell>
            <TableCell className="hidden text-right md:table-cell">
              {formatTrackLength(track.durationMs)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

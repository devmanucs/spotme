import { formatCount, formatDuration } from "@spotme/core";
import { CoverArt } from "@/components/cover-art";
import { MediaCard } from "@/components/media-card";
import { PageHero } from "@/components/page-hero";
import { Shelf } from "@/components/shelf";
import { TrackTable } from "@/components/track-table";
import {
  SHOWCASE_ALBUMS,
  SHOWCASE_ARTISTS,
  SHOWCASE_TRACKS,
  SHOWCASE_SUMMARY as summary,
} from "@/features/showcase/data";
import { DesignTokens } from "@/features/showcase/design-tokens";
import { PeriodSwitcherDemo } from "@/features/showcase/period-switcher-demo";

/** Vitrine do design system com dados fictícios (MAD-19). O Início real é a MAD-28. */
export default function Home() {
  return (
    <>
      <PageHero
        label={summary.label}
        title={formatDuration(summary.msPlayed, { precise: true })}
        estimated={summary.estimated}
        color={summary.color}
        media={
          <CoverArt alt="Capa do álbum mais ouvido do mês" color={summary.color} large priority />
        }
        meta={`${formatCount(summary.plays)} reproduções · ${formatCount(summary.tracks)} músicas · ${formatCount(summary.artists)} artistas`}
      />

      <div className="flex flex-col gap-10 px-4 pt-4 pb-10 md:px-6">
        <div className="flex flex-col gap-3">
          <p className="w-fit rounded-full bg-warning/15 px-3 py-1 font-medium text-warning text-xs">
            Dados de exemplo — artistas e músicas fictícios
          </p>
          <PeriodSwitcherDemo />
        </div>

        <Shelf title="Seus artistas do mês" href="/artistas">
          {SHOWCASE_ARTISTS.map((artist) => (
            <MediaCard key={artist.href} {...artist} />
          ))}
        </Shelf>

        <section aria-labelledby="top-musicas" className="flex flex-col gap-3">
          <h2 id="top-musicas" className="font-bold text-2xl tracking-tight">
            Músicas mais ouvidas
          </h2>
          <TrackTable tracks={SHOWCASE_TRACKS} caption="Músicas mais ouvidas no mês" />
        </section>

        <Shelf title="Álbuns em alta" href="/musicas">
          {SHOWCASE_ALBUMS.map((album) => (
            <MediaCard key={album.href} {...album} />
          ))}
        </Shelf>

        <DesignTokens />
      </div>
    </>
  );
}

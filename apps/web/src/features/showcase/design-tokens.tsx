import { PlayIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { DsButton } from "@spotme/ui/components/ds/button";
import { DsChip } from "@spotme/ui/components/ds/chip";
import { EstimateBadge } from "@/components/estimate-badge";

const SURFACES = [
  ["bg-background", "background · #000"],
  ["bg-card", "card · #121212"],
  ["bg-elevated", "elevated · #1F1F1F"],
  ["bg-highlight", "highlight · #2A2A2A"],
  ["bg-pressed", "pressed · #3E3E3E"],
] as const;

const ACCENTS = [
  ["bg-primary", "primary · #1ED760"],
  ["bg-info", "info · #539DF5"],
  ["bg-warning", "warning · #FFA42B"],
  ["bg-destructive", "destructive · #F3727F"],
  ["bg-chart-5", "chart-5"],
] as const;

const HEAT = ["bg-heat-0", "bg-heat-1", "bg-heat-2", "bg-heat-3", "bg-heat-4"] as const;

/** Vitrine interna dos tokens e Ds* (some quando o dashboard real chegar). */
export function DesignTokens() {
  return (
    <section aria-labelledby="ds-title" className="flex flex-col gap-6">
      <h2 id="ds-title" className="font-bold text-2xl tracking-tight">
        Design system
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <Swatches title="Superfícies" items={SURFACES} />
        <Swatches title="Acentos" items={ACCENTS} />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-muted-foreground text-sm">Heatmap</h3>
        <div className="flex gap-1">
          {HEAT.map((cls) => (
            <div key={cls} className={`size-6 rounded-sm ${cls}`} title={cls} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-muted-foreground text-sm">Botões e chips</h3>
        <div className="flex flex-wrap items-center gap-3">
          <DsButton variant="primary" size="play" aria-label="Tocar">
            <HugeiconsIcon icon={PlayIcon} strokeWidth={2} className="fill-current" />
          </DsButton>
          <DsButton variant="primary">Conectar Spotify</DsButton>
          <DsButton variant="inverse">Importar histórico</DsButton>
          <DsButton variant="outline">Ver tudo</DsButton>
          <DsButton variant="ghost">Cancelar</DsButton>
          <DsButton variant="primary" disabled>
            Desligado
          </DsButton>
          <DsChip selected>Músicas</DsChip>
          <DsChip>Artistas</DsChip>
          <DsChip>Álbuns</DsChip>
          <span className="inline-flex items-center gap-1 text-muted-foreground text-sm">
            12 h 05 min <EstimateBadge />
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-muted-foreground text-sm">Tipografia (Figtree)</h3>
        <p className="tabular font-extrabold text-6xl tracking-[-0.04em]">1.284,5 h</p>
        <p className="font-bold text-2xl tracking-tight">Título de seção · 24/700</p>
        <p className="font-bold text-base">Título de card · 16/700</p>
        <p className="text-base">Corpo · 16/400 — números sempre com tabular-nums: 0123456789</p>
        <p className="font-medium text-muted-foreground text-sm">Metadado · 14/500</p>
      </div>
    </section>
  );
}

function Swatches({
  title,
  items,
}: {
  title: string;
  items: readonly (readonly [string, string])[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold text-muted-foreground text-sm">{title}</h3>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map(([cls, label]) => (
          <li key={cls} className="flex items-center gap-2 text-sm">
            <span className={`size-8 shrink-0 rounded-md ring-1 ring-border ${cls}`} />
            <span className="text-muted-foreground">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

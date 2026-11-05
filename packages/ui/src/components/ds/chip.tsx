import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn } from "@spotme/ui/lib/utils";

type DsChipProps = ButtonPrimitive.Props & {
  /** Selecionado = fundo branco e texto preto, como os filtros do Spotify. */
  selected?: boolean;
};

/** Pílula de filtro ("Músicas · Artistas · Álbuns", período do dashboard). */
function DsChip({ className, selected = false, ...props }: DsChipProps) {
  return (
    <ButtonPrimitive
      data-slot="ds-chip"
      data-selected={selected || undefined}
      aria-pressed={selected}
      className={cn(
        "inline-flex h-8 shrink-0 select-none items-center rounded-full px-3 font-medium text-sm transition-colors duration-150",
        selected
          ? "bg-foreground text-background"
          : "bg-elevated text-foreground hover:bg-highlight",
        className,
      )}
      {...props}
    />
  );
}

export { DsChip };
export type { DsChipProps };

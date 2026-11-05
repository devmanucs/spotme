import { MusicNote01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@spotme/ui/lib/utils";
import Image from "next/image";

export interface CoverArtProps {
  /** Caminho servido pelo SpotMe (Storage). Nunca o CDN do Spotify. */
  src?: string | null;
  alt: string;
  /** `square` = álbum/faixa, `round` = artista. */
  shape?: "square" | "round";
  /** Cor dominante (oklch) usada no placeholder enquanto não há imagem. */
  color?: string | null;
  /** Capas ≥ 160px usam o raio maior. */
  large?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Capa de álbum ou foto de artista. Sem recorte, filtro ou texto por cima
 * (diretrizes do Spotify); raio pequeno em capas, redondo em artistas.
 */
export function CoverArt({
  src,
  alt,
  shape = "square",
  color,
  large = false,
  className,
  sizes = "160px",
  priority,
}: CoverArtProps) {
  const radius = shape === "round" ? "rounded-full" : large ? "rounded-cover-lg" : "rounded-cover";

  return (
    <div
      className={cn(
        "relative aspect-square shrink-0 overflow-hidden bg-elevated shadow-[0_8px_24px_oklch(0_0_0/50%)]",
        radius,
        className,
      )}
      style={color ? { backgroundColor: color } : undefined}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div role="img" aria-label={alt} className="grid size-full place-items-center">
          <HugeiconsIcon
            icon={shape === "round" ? UserIcon : MusicNote01Icon}
            strokeWidth={2}
            className="size-[38%] text-foreground/70"
          />
        </div>
      )}
    </div>
  );
}

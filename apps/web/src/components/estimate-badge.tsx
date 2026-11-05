"use client";

import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@spotme/ui/components/ui/tooltip";
import { cn } from "@spotme/ui/lib/utils";

/**
 * Marca números que contêm tempo estimado (PRODUCT.md › Métricas).
 * Nunca só cor: ícone + texto para leitor de tela + tooltip.
 */
export function EstimateBadge({ className }: { className?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          "inline-flex items-center gap-1 rounded-full text-muted-foreground transition-colors hover:text-foreground",
          className,
        )}
      >
        <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} className="size-4" />
        <span className="sr-only">Inclui tempo estimado</span>
      </TooltipTrigger>
      <TooltipContent className="max-w-64">
        Inclui tempo estimado: a API de tocadas recentes não informa quanto foi ouvido, então usamos
        a duração da faixa limitada pelo intervalo até a próxima.
      </TooltipContent>
    </Tooltip>
  );
}

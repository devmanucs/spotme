"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@spotme/ui/components/ui/command";
import { useRouter } from "next/navigation";
import { ALL_NAV_ITEMS } from "./nav";

/**
 * Paleta Ctrl K. Por enquanto só navegação; a busca de músicas/artistas/álbuns
 * no banco do SpotMe entra na MAD-29 (nunca na API do Spotify).
 */
export function SearchCommand({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Buscar no SpotMe"
      description="Vá para uma página. Busca de músicas e artistas chega em breve."
      className="rounded-lg! bg-popover"
    >
      {/* O CommandDialog do shadcn/Base UI não cria a raiz do cmdk: ela vem aqui. */}
      <Command className="bg-popover">
        <CommandInput placeholder="O que você quer ver?" />
        <CommandList>
          <CommandEmpty>Busca de músicas e artistas chega em breve.</CommandEmpty>
          <CommandGroup heading="Ir para">
            {ALL_NAV_ITEMS.map((item) => (
              <CommandItem
                key={item.href}
                value={item.label}
                onSelect={() => {
                  onOpenChange(false);
                  router.push(item.href);
                }}
              >
                <HugeiconsIcon icon={item.icon} strokeWidth={2} />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}

"use client";

import { Analytics01Icon, Home01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { DsButton } from "@spotme/ui/components/ds/button";
import { Avatar, AvatarFallback } from "@spotme/ui/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@spotme/ui/components/ui/dropdown-menu";
import { Kbd } from "@spotme/ui/components/ui/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@spotme/ui/components/ui/tooltip";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PathnameBoundary } from "./pathname-boundary";

export interface TopBarProps {
  onOpenSearch: () => void;
}

/** Barra superior sobre a moldura preta: marca · Início · busca em pílula · avatar. */
export function TopBar({ onOpenSearch }: TopBarProps) {
  const router = useRouter();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-2 max-md:h-14 max-md:bg-card max-md:px-4">
      <Link
        href="/"
        className="flex items-center gap-2 font-extrabold text-xl tracking-tight md:w-[264px] md:pl-2"
      >
        <HugeiconsIcon icon={Analytics01Icon} strokeWidth={2.5} className="size-7" />
        SpotMe
      </Link>

      <div className="flex flex-1 items-center justify-center gap-2">
        <PathnameBoundary>
          {(pathname) => (
            <Tooltip>
              <TooltipTrigger
                render={
                  <DsButton
                    variant="elevated"
                    size="icon-lg"
                    className="max-md:hidden"
                    aria-label="Início"
                    aria-current={pathname === "/" ? "page" : undefined}
                    onClick={() => router.push("/")}
                  />
                }
              >
                <HugeiconsIcon icon={Home01Icon} strokeWidth={pathname === "/" ? 2.5 : 2} />
              </TooltipTrigger>
              <TooltipContent>Início</TooltipContent>
            </Tooltip>
          )}
        </PathnameBoundary>

        <button
          type="button"
          onClick={onOpenSearch}
          className="group flex h-12 w-full max-w-[480px] items-center gap-3 rounded-full bg-elevated px-3 text-left text-muted-foreground transition-colors hover:bg-highlight hover:ring-1 hover:ring-pressed max-md:hidden"
        >
          <HugeiconsIcon
            icon={Search01Icon}
            strokeWidth={2}
            className="size-6 shrink-0 group-hover:text-foreground"
          />
          <span className="flex-1 truncate">O que você quer ver?</span>
          <Kbd className="border-0 bg-transparent">Ctrl K</Kbd>
        </button>
      </div>

      <DsButton
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label="Buscar"
        onClick={onOpenSearch}
      >
        <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
      </DsButton>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <DsButton variant="elevated" size="icon-lg" aria-label="Conta" className="md:mr-2" />
          }
        >
          <Avatar className="size-8">
            <AvatarFallback className="bg-info font-bold text-background">M</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-52">
          <DropdownMenuItem onClick={() => router.push("/coletor")}>
            Coletor e configurações
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>Sair (chega com o login)</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

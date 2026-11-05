"use client";

import { Calendar03Icon, Clock01Icon, Home01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@spotme/ui/lib/utils";
import Link from "next/link";
import { isActive } from "./nav";
import { PathnameBoundary } from "./pathname-boundary";

const ITEMS = [
  { href: "/", label: "Início", icon: Home01Icon },
  { href: "/historico", label: "Histórico", icon: Clock01Icon },
  { href: "/retrospectiva", label: "Retrospectiva", icon: Calendar03Icon },
] as const;

/** Navegação inferior em telas < 768px (Início · Histórico · Busca · Retrospectiva). */
export function MobileNav({
  onOpenSearch,
  className,
}: {
  onOpenSearch: () => void;
  className?: string;
}) {
  const [home, history, retro] = ITEMS;

  const tab = "flex flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium";

  return (
    <nav
      aria-label="Navegação"
      className={cn(
        "flex h-16 shrink-0 bg-gradient-to-t from-background via-background/95 to-background/60 text-muted-foreground",
        className,
      )}
    >
      <PathnameBoundary>
        {(pathname) =>
          [home, history].map((item) => (
            <MobileTab
              key={item.href}
              {...item}
              active={isActive(pathname, item.href)}
              className={tab}
            />
          ))
        }
      </PathnameBoundary>
      <button type="button" onClick={onOpenSearch} className={cn(tab, "hover:text-foreground")}>
        <HugeiconsIcon icon={Search01Icon} strokeWidth={2} className="size-6" />
        Buscar
      </button>
      <PathnameBoundary>
        {(pathname) => (
          <MobileTab {...retro} active={isActive(pathname, retro.href)} className={tab} />
        )}
      </PathnameBoundary>
    </nav>
  );
}

function MobileTab({
  href,
  label,
  icon,
  active,
  className,
}: (typeof ITEMS)[number] & { active: boolean; className: string }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(className, active ? "text-foreground" : "hover:text-foreground")}
    >
      <HugeiconsIcon icon={icon} strokeWidth={active ? 2.5 : 2} className="size-6" />
      {label}
    </Link>
  );
}

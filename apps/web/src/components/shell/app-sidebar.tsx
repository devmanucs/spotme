"use client";

import { SidebarLeftIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { DsButton } from "@spotme/ui/components/ds/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@spotme/ui/components/ui/tooltip";
import { cn } from "@spotme/ui/lib/utils";
import Link from "next/link";
import { isActive, NAV_GROUPS, type NavItem } from "./nav";
import { PathnameBoundary } from "./pathname-boundary";

export interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  className?: string;
}

/** Painel esquerdo, como "Sua Biblioteca": colapsa para ícones (Ctrl+B). */
export function AppSidebar({ collapsed, onToggle, className }: AppSidebarProps) {
  return (
    <nav
      aria-label="Navegação principal"
      data-collapsed={collapsed || undefined}
      className={cn(
        "flex shrink-0 flex-col gap-4 overflow-y-auto rounded-lg bg-card px-2 py-3 transition-[width] duration-200",
        collapsed ? "w-[72px]" : "w-[264px]",
        className,
      )}
    >
      <div
        className={cn("flex items-center px-2", collapsed ? "justify-center" : "justify-between")}
      >
        {collapsed ? null : <span className="font-bold text-muted-foreground">Sua escuta</span>}
        <Tooltip>
          <TooltipTrigger
            render={
              <DsButton
                variant="ghost"
                size="icon-sm"
                onClick={onToggle}
                aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
                aria-expanded={!collapsed}
              />
            }
          >
            <HugeiconsIcon icon={SidebarLeftIcon} strokeWidth={2} />
          </TooltipTrigger>
          <TooltipContent side="right">
            {collapsed ? "Expandir" : "Recolher"} <kbd className="ml-1 opacity-70">Ctrl B</kbd>
          </TooltipContent>
        </Tooltip>
      </div>

      <PathnameBoundary>
        {(pathname) =>
          NAV_GROUPS.map((group) => (
            <div key={group.label} className="flex flex-col gap-1">
              {collapsed ? (
                <div className="mx-auto my-1 h-px w-8 bg-border" aria-hidden />
              ) : (
                <p className="px-3 pt-1 font-bold text-muted-foreground text-xs uppercase tracking-wider">
                  {group.label}
                </p>
              )}
              <ul className="flex flex-col gap-1">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <SidebarLink
                      item={item}
                      active={isActive(pathname, item.href)}
                      collapsed={collapsed}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))
        }
      </PathnameBoundary>
    </nav>
  );
}

function SidebarLink({
  item,
  active,
  collapsed,
}: {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
}) {
  const link = (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      aria-label={collapsed ? item.label : undefined}
      className={cn(
        "flex h-11 items-center gap-4 rounded-md px-3 font-bold transition-colors duration-150",
        collapsed && "justify-center px-0",
        active
          ? "bg-elevated text-foreground"
          : "text-muted-foreground hover:bg-elevated/60 hover:text-foreground",
      )}
    >
      <HugeiconsIcon icon={item.icon} strokeWidth={active ? 2.5 : 2} className="size-6 shrink-0" />
      {collapsed ? null : <span className="truncate">{item.label}</span>}
    </Link>
  );

  if (!collapsed) return link;

  return (
    <Tooltip>
      <TooltipTrigger render={link} />
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
}

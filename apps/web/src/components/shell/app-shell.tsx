"use client";

import { TooltipProvider } from "@spotme/ui/components/ui/tooltip";
import { type ReactNode, useCallback, useEffect, useState } from "react";
import { AppSidebar } from "./app-sidebar";
import { MobileNav } from "./mobile-nav";
import { SearchCommand } from "./search-command";
import { TopBar } from "./top-bar";

const COLLAPSED_KEY = "spotme:sidebar-collapsed";

/**
 * Layout do Spotify desktop: moldura preta, painéis arredondados com 8px de
 * espaço, conteúdo com rolagem própria e barra no rodapé.
 */
export function AppShell({ children, footer }: { children: ReactNode; footer: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(COLLAPSED_KEY) === "1");
    } catch {
      // armazenamento indisponível (aba privada): fica expandido
    }
  }, []);

  const toggleSidebar = useCallback(() => {
    setCollapsed((value) => {
      try {
        localStorage.setItem(COLLAPSED_KEY, value ? "0" : "1");
      } catch {}
      return !value;
    });
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!(event.ctrlKey || event.metaKey)) return;
      const key = event.key.toLowerCase();
      if (key === "k") {
        event.preventDefault();
        setSearchOpen((open) => !open);
      } else if (key === "b") {
        event.preventDefault();
        toggleSidebar();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleSidebar]);

  const openSearch = useCallback(() => setSearchOpen(true), []);

  return (
    <TooltipProvider delay={300}>
      <a
        href="#conteudo"
        className="sr-only z-50 rounded-full bg-foreground px-4 py-2 font-bold text-background focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Pular para o conteúdo
      </a>
      <div className="flex h-dvh flex-col bg-background md:gap-2 md:p-2 md:pt-0">
        <TopBar onOpenSearch={openSearch} />
        <div className="flex min-h-0 flex-1 gap-2">
          <AppSidebar collapsed={collapsed} onToggle={toggleSidebar} className="max-md:hidden" />
          <main
            id="conteudo"
            className="relative min-w-0 flex-1 overflow-y-auto bg-card md:rounded-lg"
          >
            {children}
          </main>
        </div>
        {footer}
        <MobileNav onOpenSearch={openSearch} className="md:hidden" />
      </div>
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    </TooltipProvider>
  );
}

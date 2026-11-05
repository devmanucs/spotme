import { cn } from "@spotme/ui/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

export interface ShelfProps {
  title: string;
  /** Link de "Mostrar tudo". */
  href?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Prateleira da home do Spotify: título + "Mostrar tudo" + uma linha de cards.
 * Desktop: uma linha do grid (o que não cabe some). Mobile: rolagem horizontal.
 */
export function Shelf({ title, href, children, className }: ShelfProps) {
  return (
    <section className={cn("flex flex-col gap-3", className)} aria-label={title}>
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-bold text-2xl tracking-tight">
          {href ? (
            <Link href={href} className="hover:underline">
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        {href ? (
          <Link
            href={href}
            className="shrink-0 font-bold text-muted-foreground text-sm hover:underline"
          >
            Mostrar tudo
          </Link>
        ) : null}
      </div>
      <div className="-mx-3 flex snap-x gap-0 overflow-x-auto md:grid md:auto-rows-[0] md:grid-cols-[repeat(auto-fill,minmax(176px,1fr))] md:grid-rows-1 md:overflow-hidden">
        {children}
      </div>
    </section>
  );
}

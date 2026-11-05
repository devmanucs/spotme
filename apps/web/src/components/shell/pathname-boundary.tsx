"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, Suspense } from "react";

type RenderWithPathname = (pathname: string | null) => ReactNode;

function WithPathname({ children }: { children: RenderWithPathname }) {
  return children(usePathname());
}

/**
 * Com Cache Components, `usePathname()` suspende em rotas com parâmetro dinâmico
 * desconhecido no build (ex.: /artistas/[id]). Isolar aqui mantém o resto do shell
 * pré-renderizado: o fallback é a mesma UI sem item ativo (`pathname = null`).
 */
export function PathnameBoundary({ children }: { children: RenderWithPathname }) {
  return (
    <Suspense fallback={children(null)}>
      <WithPathname>{children}</WithPathname>
    </Suspense>
  );
}

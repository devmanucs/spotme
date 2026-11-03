import { DEFAULT_TIMEZONE } from "@spotme/core";
import { cn } from "@spotme/ui/lib/utils";

/** Placeholder até o shell da MAD-19. */
export default function Home() {
  return (
    <main className="grid min-h-dvh place-items-center p-6">
      <div className={cn("rounded-lg bg-card p-8 text-center")}>
        <h1 className="font-bold text-5xl tracking-tight">SpotMe</h1>
        <p className="mt-2 text-muted-foreground">
          Monorepo de pé. Fuso padrão: <span className="text-primary">{DEFAULT_TIMEZONE}</span>
        </p>
      </div>
    </main>
  );
}

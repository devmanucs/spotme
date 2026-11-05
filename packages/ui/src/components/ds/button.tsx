import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn } from "@spotme/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

/**
 * Botões na linguagem do Spotify: pílula ou círculo, verde só para ação principal.
 * Para link, use `render={<Link href="…" />}` + `nativeButton={false}`.
 */
const dsButtonVariants = cva(
  "inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold transition-[background-color,color,transform] duration-150 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Ação principal: verde, cresce 4% no hover. */
        primary:
          "bg-primary text-primary-foreground hover:scale-[1.04] hover:bg-primary-hover active:scale-100",
        /** Branco sobre escuro (ex.: "Entrar"). */
        inverse: "bg-foreground text-background hover:scale-[1.04] active:scale-100",
        /** Contorno cinza que clareia no hover. */
        outline:
          "border border-muted-foreground/60 text-foreground hover:scale-[1.04] hover:border-foreground active:scale-100",
        /** Ícone/texto cinza que fica branco no hover (navegação, controles). */
        ghost: "text-muted-foreground hover:text-foreground",
        /** Fundo elevado (ex.: botão Início redondo da TopBar). */
        elevated: "bg-elevated text-foreground hover:scale-[1.04] hover:bg-highlight",
      },
      size: {
        sm: "h-8 px-4 text-sm [&_svg:not([class*='size-'])]:size-4",
        md: "h-10 px-6 text-sm [&_svg:not([class*='size-'])]:size-4",
        lg: "h-12 px-8 text-base [&_svg:not([class*='size-'])]:size-5",
        "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-4",
        icon: "size-10 [&_svg:not([class*='size-'])]:size-5",
        "icon-lg": "size-12 [&_svg:not([class*='size-'])]:size-6",
        /** Botão de play grande do ActionBar. */
        play: "size-14 [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type DsButtonProps = ButtonPrimitive.Props & VariantProps<typeof dsButtonVariants>;

function DsButton({ className, variant, size, ...props }: DsButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="ds-button"
      className={cn(dsButtonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { DsButton, dsButtonVariants };
export type { DsButtonProps };

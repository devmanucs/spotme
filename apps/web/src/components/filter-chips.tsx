"use client";

import { DsChip } from "@spotme/ui/components/ds/chip";
import { cn } from "@spotme/ui/lib/utils";

export interface FilterChipOption<T extends string> {
  value: T;
  label: string;
}

export interface FilterChipsProps<T extends string> {
  options: readonly FilterChipOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  label: string;
  className?: string;
}

/**
 * Seletor em pílulas (período, tipo de item). Controlado: quem usa decide se o
 * estado vai para a URL (`?p=month`) — ver MAD-28.
 */
export function FilterChips<T extends string>({
  options,
  value,
  onValueChange,
  label,
  className,
}: FilterChipsProps<T>) {
  return (
    <fieldset className={cn("flex gap-2 overflow-x-auto", className)}>
      <legend className="sr-only">{label}</legend>
      {options.map((option) => (
        <DsChip
          key={option.value}
          selected={option.value === value}
          onClick={() => onValueChange(option.value)}
        >
          {option.label}
        </DsChip>
      ))}
    </fieldset>
  );
}

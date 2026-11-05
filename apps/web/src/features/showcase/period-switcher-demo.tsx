"use client";

import { useState } from "react";
import { FilterChips } from "@/components/filter-chips";

const PERIODS = [
  { value: "today", label: "Hoje" },
  { value: "week", label: "Semana" },
  { value: "month", label: "Mês" },
  { value: "year", label: "Ano" },
  { value: "custom", label: "Personalizado" },
] as const;

type Period = (typeof PERIODS)[number]["value"];

/** Só para a vitrine: no dashboard real o período vai para a URL (MAD-28). */
export function PeriodSwitcherDemo() {
  const [period, setPeriod] = useState<Period>("month");
  return <FilterChips label="Período" options={PERIODS} value={period} onValueChange={setPeriod} />;
}

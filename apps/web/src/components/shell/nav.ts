import {
  Calendar03Icon,
  Clock01Icon,
  DatabaseIcon,
  FileImportIcon,
  Home01Icon,
  Mic01Icon,
  MusicNote01Icon,
} from "@hugeicons/core-free-icons";

export type NavIcon = typeof Home01Icon;

export interface NavItem {
  href: string;
  label: string;
  icon: NavIcon;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

/** Navegação da sidebar — DESIGN.md › Shell da aplicação. */
export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Explorar",
    items: [
      { href: "/", label: "Início", icon: Home01Icon },
      { href: "/historico", label: "Histórico", icon: Clock01Icon },
      { href: "/artistas", label: "Artistas", icon: Mic01Icon },
      { href: "/musicas", label: "Músicas", icon: MusicNote01Icon },
      { href: "/retrospectiva", label: "Retrospectiva", icon: Calendar03Icon },
    ],
  },
  {
    label: "Dados",
    items: [
      { href: "/importar", label: "Importar", icon: FileImportIcon },
      { href: "/coletor", label: "Coletor", icon: DatabaseIcon },
    ],
  },
];

export const ALL_NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

export function isActive(pathname: string | null, href: string): boolean {
  if (pathname === null) return false;
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

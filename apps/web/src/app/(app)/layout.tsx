import { AppShell } from "@/components/shell/app-shell";
import { NowPlayingBar } from "@/components/shell/now-playing-bar";
import { SHOWCASE_LAST_PLAYED } from "@/features/showcase/data";

export default function AppLayout({ children }: LayoutProps<"/">) {
  // "Tocou por último" vem do banco a partir da MAD-28; até lá, dado de exemplo.
  return <AppShell footer={<NowPlayingBar last={SHOWCASE_LAST_PLAYED} />}>{children}</AppShell>;
}

import { setRequestLocale } from "next-intl/server";
import { BrainstormingEngine } from "@/components/brainstorming/BrainstormingEngine";
import type { Locale } from "@/lib/types";

export default async function BrainstormingEnginePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BrainstormingEngine locale={locale as Locale} />;
}

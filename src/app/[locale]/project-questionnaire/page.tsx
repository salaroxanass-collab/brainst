import { setRequestLocale } from "next-intl/server";
import { ProjectQuestionnaire } from "@/components/questionnaire/ProjectQuestionnaire";
import { questionnaireText as t } from "@/components/questionnaire/questionnaire-ro";

export default async function ProjectQuestionnairePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-offwhite pt-32 md:pt-40">
      <div className="mx-auto max-w-[1500px] px-6 pb-24 md:px-10 md:pb-36">
        <header className="grid gap-8 pb-14 md:grid-cols-12 md:pb-20">
          <p className="font-display text-xs tracking-[0.25em] text-clay uppercase md:col-span-3">{t(locale, "Start a project")}</p>
          <div className="md:col-span-8">
            <h1 className="font-serif text-5xl leading-[0.95] text-forest md:text-7xl">{t(locale, "Tell us about your place.")}</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-charcoal-muted md:text-lg">{t(locale, "Begin with what you know. The questions will adapt to your project and help us arrive at the first conversation with a clear understanding of your needs.")}</p>
          </div>
        </header>
        <ProjectQuestionnaire locale={locale} />
      </div>
    </div>
  );
}

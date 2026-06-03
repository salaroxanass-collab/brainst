import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { AnimatedMap } from "@/components/ui/AnimatedMap";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <div className="bg-offwhite pt-28 md:pt-36">
      <div className="mx-auto grid max-w-[1800px] gap-16 px-6 pb-24 md:grid-cols-12 md:gap-20 md:px-10 md:pb-40">
        <div className="md:col-span-5">
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />
          <a
            href={`mailto:${t("email")}`}
            className="mt-10 inline-block font-display text-2xl tracking-[0.08em] text-clay uppercase transition hover:text-forest"
          >
            {t("email")}
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block font-display text-xs tracking-[0.25em] text-charcoal uppercase hover:text-clay"
          >
            LinkedIn →
          </a>
        </div>
        <div className="md:col-span-7">
          <ContactForm
            labels={{
              name: t("form.name"),
              email: t("form.email"),
              message: t("form.message"),
              send: t("form.send"),
              sending: t("form.sending"),
              success: t("form.success"),
            }}
          />
        </div>
        <div className="md:col-span-12">
          <AnimatedMap center={[11.3426, 44.4949]} zoom={12} interactive />
        </div>
      </div>
    </div>
  );
}

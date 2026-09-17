"use client";

import { useEffect, useState } from "react";
import { questionnaireText as t } from "./questionnaire-ro";

type Option = { value: string; label: string };
type Question = {
  id: string;
  label: string;
  help?: string;
  type: "single" | "multi" | "text" | "textarea" | "number";
  options?: Option[];
  placeholder?: string;
};

type Answers = Record<string, string | string[]>;

const projectTypes: Option[] = [
  { value: "school", label: "School space / schoolyard" },
  { value: "private-garden", label: "Private garden" },
  { value: "public-park", label: "Public park" },
  { value: "event", label: "Outdoor event installation" },
  { value: "medical", label: "Medical centre outdoor area" },
  { value: "healing", label: "Healing garden" },
  { value: "elderly", label: "Elderly home garden" },
  { value: "inclusive", label: "Inclusive park" },
  { value: "intergenerational", label: "Intergenerational space" },
];

const baseQuestions: Question[][] = [
  [
    { id: "name", label: "What is your name?", type: "text", placeholder: "Your full name" },
    { id: "email", label: "What is your email address?", type: "text", placeholder: "name@example.com" },
    { id: "organisation", label: "Organisation or institution", help: "Leave blank if this is a personal project.", type: "text", placeholder: "Organisation name" },
  ],
  [
    { id: "country", label: "In which country is the project?", type: "text", placeholder: "Country" },
    { id: "location", label: "Where is the site?", help: "City, town, region or address if known.", type: "text", placeholder: "City or region" },
    {
      id: "entity",
      label: "Who is commissioning the project?",
      type: "single",
      options: [
        { value: "private", label: "Private individual or family" },
        { value: "business", label: "Private company or developer" },
        { value: "public", label: "Public authority" },
        { value: "education", label: "School or education organisation" },
        { value: "health", label: "Health or care organisation" },
        { value: "nonprofit", label: "Charity or non-profit" },
        { value: "community", label: "Community group" },
      ],
    },
    { id: "area", label: "What is the estimated site area in square metres (m²)?", help: "An approximate figure is enough.", type: "number", placeholder: "Area in m²" },
  ],
  [
    { id: "projectType", label: "What type of project do you want to create?", help: "Your choice determines the next questions.", type: "single", options: projectTypes },
  ],
];

const schoolQuestions: Question[][] = [
  [
    {
      id: "schoolStage",
      label: "Which learners will use the space?",
      type: "multi",
      options: ["Nursery / preschool", "Primary school", "Middle school", "Secondary school", "Special education", "Mixed ages", "Community after school"].map(label => ({ value: label, label })),
    },
    { id: "pupilCount", label: "Approximately how many pupils use the site?", type: "number", placeholder: "Number of pupils" },
  ],
  [
    {
      id: "schoolNeeds",
      label: "What should the schoolyard make possible?",
      help: "Choose everything that matters.",
      type: "multi",
      options: ["Active play", "Nature play", "Outdoor learning", "Sports", "Quiet retreat", "Social spaces", "Sensory play", "Gardening and food growing", "Performance and gathering", "Covered all-weather use", "Community use"].map(label => ({ value: label, label })),
    },
    {
      id: "schoolChallenges",
      label: "What problems should the design solve?",
      type: "multi",
      options: ["Too much asphalt", "Overheating / lack of shade", "Poor drainage or flooding", "Not enough biodiversity", "Limited play variety", "Bullying or social conflict", "Difficult supervision", "Accessibility barriers", "Noise", "Unsafe arrival and traffic", "Limited space", "High maintenance"].map(label => ({ value: label, label })),
    },
  ],
  [
    {
      id: "inclusion",
      label: "Are there particular access or sensory needs?",
      type: "multi",
      options: ["Step-free access", "Wheelchair play", "Visual impairment", "Hearing impairment", "Autism-friendly spaces", "Low-stimulation retreat", "Mobility support", "No specific requirements yet"].map(label => ({ value: label, label })),
    },
    { id: "schoolRoutine", label: "How is the outdoor space used now?", help: "Describe break times, lessons, supervision, after-school use and any spaces that do not work.", type: "textarea", placeholder: "Tell us about a typical day outside..." },
  ],
];

const gardenQuestions: Question[][] = [
  [
    {
      id: "gardenUsers",
      label: "Who will use the garden?",
      type: "multi",
      options: ["One person", "Couple", "Young children", "Teenagers", "Older people", "Regular guests", "Wheelchair user", "Dog", "Other pets"].map(label => ({ value: label, label })),
    },
    {
      id: "gardenUse",
      label: "How would you like to use it?",
      type: "multi",
      options: ["Quiet retreat", "Outdoor dining", "Entertaining", "Children's play", "Swimming or spa", "Food growing", "Gardening", "Exercise or yoga", "Working outdoors", "Displaying art", "Wildlife watching"].map(label => ({ value: label, label })),
    },
  ],
  [
    {
      id: "gardenCharacter",
      label: "How should the garden feel?",
      type: "multi",
      options: ["Calm", "Private", "Cool and shaded", "Lush", "Naturalistic", "Wild", "Formal", "Minimal", "Colourful", "Romantic", "Playful", "Sculptural", "Connected to the architecture"].map(label => ({ value: label, label })),
    },
    {
      id: "gardenFeatures",
      label: "Which elements interest you?",
      type: "multi",
      options: ["Terrace or patio", "Outdoor kitchen", "Pool", "Pond or water", "Lawn", "Meadow", "Trees for shade", "Privacy screening", "Pergola", "Fire pit", "Kitchen garden", "Sculpture", "Lighting", "Storage"].map(label => ({ value: label, label })),
    },
  ],
  [
    {
      id: "gardenConcerns",
      label: "What needs to improve?",
      type: "multi",
      options: ["Lack of privacy", "Too much sun or heat", "Too much shade", "Poor drainage", "Drought", "Noise", "Difficult slope", "Limited space", "Unsafe for children", "Not pet-friendly", "Too much maintenance", "No clear identity"].map(label => ({ value: label, label })),
    },
    { id: "gardenExisting", label: "What is already on the site?", help: "Mention buildings, mature trees, walls, views or features you want to keep.", type: "textarea", placeholder: "Describe the existing garden..." },
  ],
];

const sharedDetailQuestions: Question[][] = [
  [
    {
      id: "priorities",
      label: "What are your most important priorities?",
      type: "multi",
      options: ["Beauty and identity", "Everyday usability", "Accessibility", "Biodiversity", "Climate resilience", "Low maintenance", "Health and wellbeing", "Safety", "Community value", "Measurable performance"].map(label => ({ value: label, label })),
    },
    { id: "inspiration", label: "Is there a place, style or project you admire?", type: "textarea", placeholder: "Names, links or a short description..." },
  ],
  [
    {
      id: "budget",
      label: "What budget range are you considering?",
      type: "single",
      options: ["Not established yet", "Under €25,000", "€25,000–€75,000", "€75,000–€200,000", "€200,000–€500,000", "Over €500,000"].map(label => ({ value: label, label })),
    },
    {
      id: "timeline",
      label: "When would you like the project to be ready?",
      type: "single",
      options: ["Exploring ideas", "Within 6 months", "6–12 months", "1–2 years", "More than 2 years", "Fixed event or funding deadline"].map(label => ({ value: label, label })),
    },
    { id: "anythingElse", label: "What else should we understand before our first conversation?", type: "textarea", placeholder: "Constraints, hopes, approvals, partners or questions..." },
  ],
];

const otherBranchQuestions: Record<string, Question[][]> = {
  "public-park": [[{ id: "publicParkNeeds", label: "What should this public park provide?", type: "multi", options: ["Nature", "Play", "Sport", "Gathering", "Events", "Quiet space", "Walking and cycling", "Climate adaptation", "Culture and heritage"].map(label => ({ value: label, label })) }, { id: "community", label: "Who are the principal communities and stakeholders?", type: "textarea" }]],
  event: [[{ id: "eventNeeds", label: "What kind of event or installation is planned?", type: "multi", options: ["Festival", "Exhibition", "Performance", "Brand experience", "Temporary garden", "Public art", "Community event"].map(label => ({ value: label, label })) }, { id: "eventDates", label: "What are the installation and event dates?", type: "text" }]],
  medical: [[{ id: "medicalUsers", label: "Who will use the outdoor area?", type: "multi", options: ["Patients", "Visitors", "Clinical staff", "Children", "Rehabilitation patients", "People with limited mobility"].map(label => ({ value: label, label })) }, { id: "medicalGoals", label: "What therapeutic or operational outcomes matter most?", type: "textarea" }]],
  healing: [[{ id: "healingNeeds", label: "What should the healing garden support?", type: "multi", options: ["Stress reduction", "Private reflection", "Social support", "Rehabilitation", "Sensory engagement", "Grief and remembrance", "Staff restoration"].map(label => ({ value: label, label })) }, { id: "healingUsers", label: "Describe the users and care context", type: "textarea" }]],
  elderly: [[{ id: "elderlyNeeds", label: "What should residents be able to do outdoors?", type: "multi", options: ["Walk safely", "Sit socially", "Garden", "Meet family", "Exercise", "Experience nature", "Find quiet", "Use the space with dementia"].map(label => ({ value: label, label })) }, { id: "careNeeds", label: "What mobility, dementia or care requirements should shape the space?", type: "textarea" }]],
  inclusive: [[{ id: "inclusiveNeeds", label: "Which forms of inclusion are priorities?", type: "multi", options: ["Physical access", "Sensory inclusion", "Neurodiversity", "All-age play", "Gender equity", "Cultural inclusion", "Affordable access"].map(label => ({ value: label, label })) }, { id: "inclusiveUsers", label: "Which communities should be involved in co-design?", type: "textarea" }]],
  intergenerational: [[{ id: "generations", label: "Which generations and activities should come together?", type: "multi", options: ["Young children", "Teenagers", "Parents", "Adults", "Older people", "Care residents", "Schools", "Community groups"].map(label => ({ value: label, label })) }, { id: "sharedActivities", label: "What should people be able to do together?", type: "textarea" }]],
};

function isAnswered(question: Question, value: Answers[string]) {
  if (question.id === "organisation") return true;
  return Array.isArray(value) ? value.length > 0 : Boolean(String(value ?? "").trim());
}

export function ProjectQuestionnaire({ locale }: { locale: string }) {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("brainst-project-brief");
    if (saved) setAnswers(JSON.parse(saved));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("brainst-project-brief", JSON.stringify(answers));
  }, [answers]);

  const branch = answers.projectType === "school"
    ? schoolQuestions
    : answers.projectType === "private-garden"
      ? gardenQuestions
      : otherBranchQuestions[String(answers.projectType)] ?? [];
  const steps = [...baseQuestions, ...branch, ...sharedDetailQuestions];
  const questions = steps[step] ?? [];
  const canContinue = questions.every(question => isAnswered(question, answers[question.id]));

  const update = (id: string, value: string) => setAnswers(current => ({ ...current, [id]: value }));
  const toggle = (id: string, value: string) => setAnswers(current => {
    const values = Array.isArray(current[id]) ? current[id] as string[] : [];
    return { ...current, [id]: values.includes(value) ? values.filter(item => item !== value) : [...values, value] };
  });

  const restart = () => {
    setAnswers({});
    setStep(0);
    setSubmitted(false);
    window.localStorage.removeItem("brainst-project-brief");
  };

  if (submitted) {
    const allQuestions = steps.flat();
    const questionLabel = (key: string) => t(locale, allQuestions.find(question => question.id === key)?.label ?? key.replace(/([A-Z])/g, " $1"));
    const answerLabel = (value: string | string[]) => Array.isArray(value) ? value.map(item => t(locale, item)).join(", ") : t(locale, value);
    const readable = Object.entries(answers).map(([key, value]) => `${questionLabel(key)}: ${answerLabel(value)}`).join("\n");
    const mail = `mailto:hello@brainst.studio?subject=${encodeURIComponent(`New project brief: ${answers.projectType}`)}&body=${encodeURIComponent(readable)}`;
    return (
      <section className="border-t border-charcoal/15 py-14" aria-live="polite">
        <p className="font-display text-xs tracking-[0.22em] text-clay uppercase">{locale === "ro" ? "Prezentarea proiectului este gata" : "Brief ready"}</p>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl text-forest md:text-6xl">{locale === "ro" ? "Va multumim" : "Thank you"}, {answers.name}.</h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-charcoal-muted">{locale === "ro" ? "Raspunsurile sunt salvate pe acest dispozitiv. Verificati prezentarea de mai jos, apoi trimiteti-o pentru a incepe conversatia." : "Your answers are saved on this device. Review the project brief below, then send it to start the conversation."}</p>
        <dl className="mt-10 divide-y divide-charcoal/10 border-y border-charcoal/10">
          {Object.entries(answers).filter(([, value]) => Array.isArray(value) ? value.length : value).map(([key, value]) => (
            <div key={key} className="grid gap-2 py-4 md:grid-cols-[220px_1fr]">
              <dt className="font-display text-[11px] tracking-[0.16em] text-charcoal-muted uppercase">{questionLabel(key)}</dt>
              <dd className="font-serif text-xl text-charcoal">{answerLabel(value)}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={mail} className="bg-forest px-7 py-4 font-display text-xs tracking-[0.2em] text-offwhite uppercase transition hover:bg-clay">{locale === "ro" ? "Trimite prezentarea proiectului" : "Send project brief"}</a>
          <button type="button" onClick={() => setSubmitted(false)} className="border border-charcoal/25 px-7 py-4 font-display text-xs tracking-[0.2em] uppercase">{locale === "ro" ? "Editeaza raspunsurile" : "Edit answers"}</button>
          <button type="button" onClick={restart} className="px-4 py-4 font-display text-xs tracking-[0.2em] text-charcoal-muted uppercase">{locale === "ro" ? "Incepe din nou" : "Start again"}</button>
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-10 border-t border-charcoal/15 py-12 lg:grid-cols-[260px_1fr] lg:gap-20">
      <aside>
        <p className="font-display text-xs tracking-[0.2em] text-clay uppercase">{locale === "ro" ? "Prezentarea proiectului" : "Project brief"}</p>
        <p className="mt-3 font-serif text-2xl text-forest">{locale === "ro" ? "Pasul" : "Step"} {step + 1} {locale === "ro" ? "din" : "of"} {steps.length}</p>
        <div className="mt-5 h-1 bg-charcoal/10"><div className="h-full bg-clay transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
        <p className="mt-5 text-sm leading-6 text-charcoal-muted">{locale === "ro" ? "Chestionarul se adapteaza proiectului. Progresul este salvat automat pe acest dispozitiv." : "The questionnaire adapts to your project. Your progress is saved automatically on this device."}</p>
      </aside>

      <div className="min-w-0">
        <div className="space-y-12">
          {questions.map(question => (
            <fieldset key={question.id}>
              <legend className="font-serif text-3xl text-charcoal md:text-4xl">{t(locale, question.label)}</legend>
              {question.help && <p className="mt-2 text-sm text-charcoal-muted">{t(locale, question.help)}</p>}
              {(question.type === "single" || question.type === "multi") && (
                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  {question.options?.map(option => {
                    const selected = question.type === "multi" ? (answers[question.id] ?? []).includes(option.value) : answers[question.id] === option.value;
                    return (
                      <button key={option.value} type="button" aria-pressed={selected} onClick={() => question.type === "multi" ? toggle(question.id, option.value) : update(question.id, option.value)} className={`min-h-14 border px-4 py-3 text-left font-display text-sm transition ${selected ? "border-forest bg-forest text-offwhite" : "border-charcoal/20 bg-transparent text-charcoal hover:border-clay"}`}>
                        {t(locale, option.label)}
                      </button>
                    );
                  })}
                </div>
              )}
              {(question.type === "text" || question.type === "number") && (
                <input type={question.type} value={String(answers[question.id] ?? "")} onChange={event => update(question.id, event.target.value)} placeholder={t(locale, question.placeholder)} className="mt-5 w-full border-b border-charcoal/25 bg-transparent py-3 font-serif text-2xl outline-none placeholder:text-charcoal/30 focus:border-clay" />
              )}
              {question.type === "textarea" && (
                <textarea rows={4} value={String(answers[question.id] ?? "")} onChange={event => update(question.id, event.target.value)} placeholder={t(locale, question.placeholder)} className="mt-5 w-full resize-y border border-charcoal/20 bg-transparent p-4 font-serif text-xl outline-none placeholder:text-charcoal/30 focus:border-clay" />
              )}
            </fieldset>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-charcoal/15 pt-6">
          <button type="button" disabled={step === 0} onClick={() => setStep(value => value - 1)} className="font-display text-xs tracking-[0.18em] uppercase disabled:opacity-30">← {locale === "ro" ? "Inapoi" : "Back"}</button>
          {step < steps.length - 1 ? (
            <button type="button" disabled={!canContinue} onClick={() => setStep(value => value + 1)} className="bg-forest px-7 py-4 font-display text-xs tracking-[0.2em] text-offwhite uppercase transition hover:bg-clay disabled:cursor-not-allowed disabled:opacity-30">{locale === "ro" ? "Continua" : "Continue"} →</button>
          ) : (
            <button type="button" disabled={!canContinue} onClick={() => setSubmitted(true)} className="bg-clay px-7 py-4 font-display text-xs tracking-[0.2em] text-offwhite uppercase disabled:opacity-30">{locale === "ro" ? "Verifica prezentarea proiectului" : "Review project brief"}</button>
          )}
        </div>
        <p className="mt-5 text-xs text-charcoal-muted">{locale === "ro" ? "Limba" : "Language"}: {locale.toUpperCase()} · {locale === "ro" ? "Raspunsurile nu sunt trimise pana cand nu alegeti «Trimite prezentarea proiectului»." : "Your answers are not sent until you choose “Send project brief”."}</p>
      </div>
    </section>
  );
}

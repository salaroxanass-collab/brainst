"use client";

import { useState, FormEvent } from "react";

export function ContactForm({
  labels,
}: {
  labels: {
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    success: string;
  };
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("success"), 800);
  };

  if (status === "success") {
    return (
      <p className="font-serif text-2xl text-forest" role="status">
        {labels.success}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label htmlFor="name" className="font-display text-[10px] tracking-[0.2em] text-charcoal-muted uppercase">
          {labels.name}
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-2 w-full border-b border-charcoal/20 bg-transparent py-3 font-serif text-xl outline-none focus:border-clay"
        />
      </div>
      <div>
        <label htmlFor="email" className="font-display text-[10px] tracking-[0.2em] text-charcoal-muted uppercase">
          {labels.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full border-b border-charcoal/20 bg-transparent py-3 font-serif text-xl outline-none focus:border-clay"
        />
      </div>
      <div>
        <label htmlFor="message" className="font-display text-[10px] tracking-[0.2em] text-charcoal-muted uppercase">
          {labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full resize-none border-b border-charcoal/20 bg-transparent py-3 font-serif text-xl outline-none focus:border-clay"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full border border-forest bg-forest px-8 py-4 font-display text-xs tracking-[0.25em] text-offwhite uppercase transition hover:bg-clay hover:border-clay disabled:opacity-60"
      >
        {status === "sending" ? labels.sending : labels.send}
      </button>
    </form>
  );
}

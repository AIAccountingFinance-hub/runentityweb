"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import AnnouncementBanner from "@/components/sections/AnnouncementBanner";
import Navigation from "@/components/sections/Navigation";
import StarField from "@/components/ui/StarField";
import { EntityMark } from "@/components/entity-mark";
import { useDemoModal } from "@/components/ui/DemoModalProvider";

const sections = [
  {
    heading: "Accounting software lied to you.",
    paragraphs: [
      "For thirty years, the pitch has been the same: \"We'll automate your accounting.\" Tally said it. QuickBooks said it. Zoho, Xero, FreshBooks \u2014 they all said it. They sold the dream of liberation. What they delivered was a new kind of captivity.",
      "They didn't automate accounting. They digitized data entry. They replaced paper ledgers with digital ledgers and called it a revolution. They gave accountants faster ways to do the same manual work \u2014 and then buried them under menus, modules, and compliance updates that made the work even harder.",
      "The average accountant today spends 80% of their time feeding software. Punching in entries. Reconciling numbers the system should have reconciled itself. Chasing invoices. Running reports that should run themselves.",
      "This isn't automation. This is servitude with a better interface.",
      "We refused to accept that.",
    ],
  },
  {
    heading: "Accounting is not data entry. It never was.",
    paragraphs: [
      "The hard part of accounting was never the bookkeeping. It was never the journal entries or the trial balance or the GST filing.",
      "The hard part is understanding. Knowing what the numbers mean. Spotting the anomaly before it becomes a crisis. Closing the books with confidence, not anxiety. Advising a business owner on a decision that could change the trajectory of their company.",
      "That's accounting. That's the craft. That's what accountants trained for years to do.",
      "But they never get to do it. Because they're too busy being typists for software that was supposed to set them free.",
      "We think that's a tragedy. And we think it ends now.",
    ],
  },
  {
    heading: "The world doesn't need better accounting software. It needs an accounting mind.",
    paragraphs: [
      "Every generation of accounting software has asked the same question: \"How do we make it easier for humans to do accounting tasks?\" Wrong question.",
      "The right question is: \"What if the software actually understood accounting?\" Not the way a database understands a schema. The way a seasoned CFO understands a balance sheet \u2014 with context, with judgment, with the ability to see what matters and act on it.",
      "Entity is an accounting intelligence \u2014 a system that doesn't wait for instructions, but understands the work, executes it autonomously, and surfaces what actually needs human attention.",
      "It reads your transactions and knows what they mean. It reconciles not because you clicked a button, but because it understood the match. It closes your books not because you followed a 47-step checklist, but because it ran the checklist itself and flagged the three things that need your judgment.",
    ],
  },
  {
    heading: "We're building for accountants who are tired of their tools.",
    paragraphs: [
      "There are millions of accountants, CFOs, and business owners who have quietly resigned themselves to the grind. Who spend their Sundays closing books. Who dread month-end. Who know their software is holding them back.",
      "They've tried the upgrades. They've migrated from one legacy system to another, hoping this time it'll be different. It never is. Because the architecture is the same. The philosophy is the same. The assumption is always: the human does the work, the software holds the data.",
      "Entity breaks that assumption entirely. Accounting work should be done by AI, reviewed by humans. Not the other way around.",
    ],
  },
  {
    heading: "The age of the AI accountant has begun.",
    paragraphs: [
      "Entity already automates the work that eats up your day: transaction categorization, reconciliation, compliance checks, close management, reporting. It does this with an intelligence layer that learns your business, adapts to your context, and gets sharper over time.",
      "What we're building toward is an AI accounting agent \u2014 an autonomous intelligence that manages the entire financial lifecycle of a business. From the first invoice to the final audit trail. Always on. Always accurate. Always learning.",
      "Not a copilot. Not an assistant. An agent.",
    ],
  },
  {
    heading: "This is bigger than software. This is the next era of accounting.",
    paragraphs: [
      "Accounting has evolved in lockstep with civilization. Clay tablets. Double-entry bookkeeping. Spreadsheets. ERP systems. Each leap unlocked a new level of economic complexity.",
      "But the last real leap was decades ago. The world got exponentially more complex \u2014 global supply chains, digital economies, layered regulation \u2014 and the tools stayed fundamentally the same.",
      "Entity is the next leap. Not an incremental improvement on what exists, but a fundamentally new architecture for how accounting gets done in the age of AI.",
      "We're not here to compete with Tally or QuickBooks. We're here to make them obsolete.",
    ],
  },
];

function ManifestoSection({
  heading,
  paragraphs,
}: {
  heading: string;
  paragraphs: string[];
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="py-10 lg:py-14 border-t border-white/5 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="font-display text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold text-white leading-[1.2] tracking-[-0.01em] mb-5"
      >
        {heading}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="space-y-5 text-[16px] text-white/45 leading-[1.8] font-body max-w-[600px] mx-auto"
      >
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </motion.div>
    </div>
  );
}

export default function AboutPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const { openModal } = useDemoModal();

  return (
    <main className="overflow-x-hidden bg-[#0A0A0A]">
      <AnnouncementBanner />
      <Navigation />

      <section className="relative cosmos-bg overflow-hidden" ref={heroRef}>
        <StarField starCount={100} />

        <div className="container-narrow px-5 sm:px-6 lg:px-8 relative z-10">
          {/* Hero */}
          <div className="py-14 lg:py-20 text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="text-[12px] font-body font-medium uppercase tracking-[3px] text-white/30 mb-6"
            >
              MANIFESTO
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-white leading-[1.15] tracking-[-0.02em] mb-6"
            >
              The accounting tool that finally{" "}
              <span className="text-gradient">does the accounting.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-body text-[16px] text-white/40 leading-relaxed max-w-[520px] mx-auto"
            >
              Why we started Entity, what we believe, and where we&apos;re going.
            </motion.p>
          </div>

          {/* Manifesto sections */}
          {sections.map((section, i) => (
            <ManifestoSection
              key={i}
              heading={section.heading}
              paragraphs={section.paragraphs}
            />
          ))}

          {/* Closing CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="py-14 lg:py-20 border-t border-white/5 text-center"
          >
            <h2 className="font-display text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold text-white leading-[1.2] tracking-[-0.01em] mb-3">
              Entity
            </h2>
            <p className="font-display text-[18px] md:text-[20px] italic text-white/30 mb-10">
              The accounting tool that finally does the accounting.
            </p>
            <button
              onClick={() => openModal("demo")}
              className="inline-flex items-center gap-3 px-8 py-3.5 border border-white/25 rounded-xl text-white text-[15px] font-body font-medium hover:bg-white hover:text-[#0A0A0A] transition-all duration-300"
            >
              Book a demo
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] border-t border-white/5 py-8">
        <div className="container-content px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <EntityMark size={24} state="idle" theme="dark" />
            <span className="font-body font-bold text-[15px] text-white tracking-tight">
              Entity
            </span>
          </div>
          <div className="flex items-center gap-6 text-[13px] text-white/35 font-body">
            <a href="/terms" className="hover:text-white/60 transition-colors underline underline-offset-2">
              Terms of Service
            </a>
            <a href="/privacy" className="hover:text-white/60 transition-colors underline underline-offset-2">
              Privacy Policy
            </a>
            <span>&copy; Entity 2026</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnnouncementBanner from "@/components/sections/AnnouncementBanner";
import Navigation from "@/components/sections/Navigation";
import { EntityMark } from "@/components/entity-mark";

const sections = [
  {
    title: "1. Information We Collect",
    content:
      "We collect information you provide directly — such as your name, email address, phone number, and business details when you register, book a demo, or contact us. We also collect financial data that you upload or connect to Entity for processing, including transactions, invoices, bank statements, and accounting records.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "We use your information to provide and improve the Service, process your financial data using our AI engine, communicate with you about your account and the Service, ensure compliance with applicable laws, and develop new features. We do not sell your personal data to third parties.",
  },
  {
    title: "3. AI Processing",
    content:
      "Entity's AI processes your financial data to automate accounting tasks such as categorization, reconciliation, and compliance checks. This processing occurs on secure servers. Your data may be used in aggregated, anonymized form to improve our AI models, but individual financial records are never shared externally.",
  },
  {
    title: "4. Data Security",
    content:
      "We implement industry-standard security measures to protect your data, including encryption in transit (TLS 1.3) and at rest (AES-256), regular security audits, role-based access controls, and SOC 2 Type II compliance. Financial data is stored in isolated, encrypted databases with strict access controls.",
  },
  {
    title: "5. Data Retention",
    content:
      "We retain your data for as long as your account is active or as needed to provide the Service. Financial data is retained in accordance with applicable accounting and tax regulations. You may request deletion of your data at any time, subject to legal retention requirements.",
  },
  {
    title: "6. Data Sharing",
    content:
      "We may share your information with trusted service providers who assist in operating our Service (e.g., cloud hosting, payment processing), but only to the extent necessary for them to perform their functions. We may also share information if required by law, regulation, or legal process.",
  },
  {
    title: "7. Your Rights",
    content:
      "You have the right to access, correct, or delete your personal data. You may export your financial data at any time. You can opt out of non-essential communications. To exercise these rights, contact us at privacy@runentity.com.",
  },
  {
    title: "8. Cookies and Analytics",
    content:
      "We use essential cookies to operate the Service and analytics cookies to understand usage patterns. You can control cookie preferences through your browser settings. We use privacy-respecting analytics and do not use invasive tracking technologies.",
  },
  {
    title: "9. International Data Transfers",
    content:
      "Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for international data transfers, including standard contractual clauses and data processing agreements.",
  },
  {
    title: "10. Children's Privacy",
    content:
      "The Service is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children.",
  },
  {
    title: "11. Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. We will notify you of significant changes through the Service or via email. Your continued use of the Service after changes constitutes acceptance of the updated policy.",
  },
  {
    title: "12. Contact Us",
    content:
      "If you have questions or concerns about this Privacy Policy or our data practices, contact us at privacy@runentity.com.",
  },
];

export default function PrivacyPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });

  return (
    <main className="overflow-x-hidden">
      <AnnouncementBanner />
      <Navigation />

      {/* Hero */}
      <section className="bg-[#FAFAF8] py-16 lg:py-20" ref={heroRef}>
        <div className="container-narrow px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow mb-4">LEGAL</p>
            <h1 className="font-display text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#1A1A1A] leading-[1.15] tracking-[-0.02em] mb-4">
              Privacy Policy
            </h1>
            <p className="font-body text-[15px] text-[#6B6B6B]">
              Last updated: February 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-14 lg:py-20 border-t border-[#E5E5E0]">
        <div className="container-narrow px-6 lg:px-8 max-w-[680px] mx-auto">
          {sections.map((section, i) => (
            <Section key={i} title={section.title} content={section.content} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] py-8">
        <div className="container-content px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <EntityMark size={24} state="idle" theme="dark" />
            <span className="font-body font-bold text-[15px] text-white tracking-tight">
              Entity
            </span>
          </div>
          <div className="flex items-center gap-6 text-[13px] text-white/35 font-body">
            <a
              href="/terms"
              className="hover:text-white/60 transition-colors underline underline-offset-2"
            >
              Terms of Service
            </a>
            <a
              href="/privacy"
              className="hover:text-white/60 transition-colors underline underline-offset-2"
            >
              Privacy Policy
            </a>
            <span>&copy; Entity 2026</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h2 className="font-display text-[18px] font-semibold text-[#1A1A1A] mb-2">
        {title}
      </h2>
      <p className="font-body text-[15px] text-[#6B6B6B] leading-[1.8]">
        {content}
      </p>
    </motion.div>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnnouncementBanner from "@/components/sections/AnnouncementBanner";
import Navigation from "@/components/sections/Navigation";
import { EntityMark } from "@/components/entity-mark";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using Entity's services, website, or application (collectively, the \"Service\"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Service.",
  },
  {
    title: "2. Description of Service",
    content:
      "Entity provides an AI-native accounting platform that automates transaction recording, categorization, reconciliation, and compliance workflows. The Service is designed for accountants, businesses, and financial professionals.",
  },
  {
    title: "3. Account Registration",
    content:
      "To use certain features, you must register for an account. You agree to provide accurate and complete information during registration and to keep your account information up to date. You are responsible for maintaining the confidentiality of your account credentials.",
  },
  {
    title: "4. Use of Service",
    content:
      "You agree to use the Service only for lawful purposes and in accordance with these Terms. You shall not use the Service to upload, transmit, or distribute any content that is unlawful, harmful, fraudulent, or infringes on the rights of others.",
  },
  {
    title: "5. Data and Privacy",
    content:
      "Your use of the Service is also governed by our Privacy Policy. By using the Service, you consent to the collection and use of your data as described in the Privacy Policy. We implement industry-standard security measures to protect your financial data.",
  },
  {
    title: "6. AI-Generated Outputs",
    content:
      "Entity uses artificial intelligence to process and analyze financial data. While we strive for accuracy, AI-generated outputs are provided as suggestions and should be reviewed by qualified professionals. Entity is not a substitute for professional accounting advice.",
  },
  {
    title: "7. Intellectual Property",
    content:
      "All content, features, and functionality of the Service — including but not limited to text, graphics, logos, icons, software, and the underlying AI models — are the exclusive property of Entity and are protected by international copyright, trademark, and intellectual property laws.",
  },
  {
    title: "8. Limitation of Liability",
    content:
      "To the maximum extent permitted by law, Entity shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, arising from your use of or inability to use the Service.",
  },
  {
    title: "9. Termination",
    content:
      "We may terminate or suspend your access to the Service immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use the Service will cease immediately. You may export your data before termination.",
  },
  {
    title: "10. Changes to Terms",
    content:
      "We reserve the right to modify these Terms at any time. We will provide notice of significant changes through the Service or via email. Your continued use of the Service after changes constitutes acceptance of the new Terms.",
  },
  {
    title: "11. Governing Law",
    content:
      "These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Bangalore, India.",
  },
  {
    title: "12. Contact",
    content:
      "If you have questions about these Terms, please contact us at legal@runentity.com.",
  },
];

export default function TermsPage() {
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
              Terms of Service
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

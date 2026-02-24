// Entity Marketing Website — Content Constants
// All copy, features, pricing, and navigation data

export const SITE = {
  name: "Entity",
  tagline: "The AI-Native Accounting Platform",
  description:
    "Entity replaces legacy accounting software with AI-powered automation. Multi-entity management, intelligent bill processing, and real-time insights — all in one platform.",
  url: "https://entity.inc",
  cta: "Schedule Demo",
  ctaSecondary: "Watch Demo",
  login: "Login",
};

export const NAV_LINKS = {
  products: {
    label: "Products",
    sections: [
      {
        title: "Core Financials",
        items: [
          { name: "General Ledger", href: "/core-financials/general-ledger", description: "Customizable GL with unlimited classifications" },
          { name: "Accounts Receivable", href: "/core-financials/accounts-receivable", description: "Automated invoicing and collections" },
          { name: "Accounts Payable", href: "/core-financials/accounts-payable", description: "AI-powered bill processing and payments" },
          { name: "Cash Management", href: "/core-financials/cash-management", description: "Real-time cash flow visibility" },
          { name: "Tax Management", href: "/core-financials/tax-management", description: "GST, TDS, and compliance automation" },
          { name: "Purchase Orders", href: "/core-financials/purchase-orders", description: "Streamlined procurement workflows" },
          { name: "Reconciliation", href: "/core-financials/reconciliation", description: "Automated bank and account reconciliation" },
          { name: "Close Management", href: "/core-financials/close-management", description: "Accelerated month-end close" },
          { name: "Order Management", href: "/core-financials/order-management", description: "End-to-end order lifecycle tracking" },
          { name: "Cost Allocation", href: "/core-financials/cost-allocation", description: "Multi-dimensional cost distribution" },
        ],
      },
      {
        title: "Advanced Accounting",
        items: [
          { name: "Revenue Recognition", href: "/advanced/revenue-recognition", description: "ASC 606 / Ind AS 115 compliance" },
          { name: "Flux Analysis", href: "/advanced/flux-analysis", description: "Automated variance analysis" },
          { name: "Prepaid Amortization", href: "/advanced/prepaid-amortization", description: "Schedule-based expense recognition" },
          { name: "Subscription Billing", href: "/advanced/subscription-billing", description: "Usage metering and billing automation" },
          { name: "Fixed Assets", href: "/advanced/fixed-assets", description: "Depreciation and asset lifecycle management" },
        ],
      },
    ],
  },
  platform: {
    label: "Platform",
    items: [
      { name: "Multi-Entity Accounting", href: "/platform/multi-entity", description: "Manage subsidiaries from one place" },
      { name: "Multi-Currency", href: "/platform/multi-currency", description: "Automatic forex handling" },
      { name: "AI Automation", href: "/platform/ai-automation", description: "Intelligent processing engine" },
      { name: "Integrations", href: "/platform/integrations", description: "13,000+ native integrations" },
      { name: "Dashboards", href: "/platform/dashboards", description: "Custom real-time dashboards" },
      { name: "Reporting & Analytics", href: "/platform/reporting", description: "Dynamic pivot reports" },
      { name: "Planning & Budgeting", href: "/platform/planning", description: "Forward-looking financial planning" },
      { name: "Security", href: "/platform/security", description: "SOC 2, GDPR, enterprise-grade" },
      { name: "Audit Automation", href: "/platform/audit", description: "Streamlined audit workflows" },
      { name: "Treasury Management", href: "/platform/treasury", description: "Centralized cash and investment management" },
    ],
  },
  resources: {
    label: "Resources",
    items: [
      { name: "Resource Center", href: "/resources" },
      { name: "Blog", href: "/blog" },
      { name: "ERP Cost Calculator", href: "/erp-cost-calculator" },
    ],
  },
  company: {
    label: "Company",
    items: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Newsroom", href: "/newsroom" },
      { name: "Contact", href: "/contact" },
    ],
  },
  compare: {
    label: "Compare",
    items: [
      { name: "vs Tally", href: "/versus/tally" },
      { name: "vs NetSuite", href: "/versus/netsuite" },
      { name: "vs QuickBooks", href: "/versus/quickbooks" },
      { name: "vs Xero", href: "/versus/xero" },
      { name: "vs Sage Intacct", href: "/versus/sage-intacct" },
      { name: "vs Zoho Books", href: "/versus/zoho-books" },
    ],
  },
};

export const HERO = {
  headline: "The AI-Native",
  headlineAccent: "Accounting Platform",
  subheadline:
    "Replace legacy accounting software with intelligent automation. Entity gives mid-market businesses the power of AI-driven bookkeeping, real-time insights, and seamless multi-entity management — from startup to IPO.",
  stats: [
    { value: "25x", label: "Faster Bill Processing" },
    { value: "13,000+", label: "Native Integrations" },
    { value: "24hrs", label: "Data Migration" },
  ],
};

export const PARTNER_LOGOS = [
  "Stripe",
  "Razorpay",
  "Salesforce",
  "Gusto",
  "Ramp",
  "Avalara",
  "Brex",
  "JustWorks",
  "Plaid",
  "Shopify",
];

export const CORE_FEATURES = [
  {
    title: "Multi-Entity Management",
    description:
      "Manage unlimited subsidiaries, divisions, and entities from a single platform. Consolidated reporting, intercompany transactions, and multi-currency support built in.",
    icon: "building",
  },
  {
    title: "13,000+ Integrations",
    description:
      "Connect your entire financial stack — banks, payment processors, payroll, CRM, and more. Native integrations that sync in real-time.",
    icon: "plug",
  },
  {
    title: "Customizable General Ledger",
    description:
      "Unlimited chart of accounts classifications, custom dimensions, and flexible reporting hierarchies. Your GL, your way.",
    icon: "layers",
  },
  {
    title: "AI-Powered Automation",
    description:
      "From bill extraction to bank reconciliation, Entity's AI handles the tedious work. Smart suggestions learn from your corrections and get better over time.",
    icon: "sparkles",
  },
];

export const SUITE_MODULES = [
  {
    title: "Accounts Payable",
    description:
      "Upload 50 bills, review each in 5 seconds. AI extracts vendor details, line items, GST, and TDS — then proposes journal entries for one-click posting.",
    features: ["AI bill extraction", "3-way matching", "Approval workflows", "Scheduled payments"],
  },
  {
    title: "Purchase Orders",
    description:
      "Streamlined procurement with budget controls, multi-level approvals, and automatic conversion to bills on receipt.",
    features: ["Budget tracking", "Approval chains", "Auto-conversion", "Vendor management"],
  },
  {
    title: "Close Management",
    description:
      "Reduce month-end close from weeks to days. Task checklists, automated reconciliations, and real-time status tracking.",
    features: ["Task templates", "Status dashboard", "Reconciliation", "Audit trail"],
  },
  {
    title: "Revenue Recognition",
    description:
      "ASC 606 and Ind AS 115 compliant revenue recognition. Automated schedules, contract modifications, and disclosure reports.",
    features: ["ASC 606 / Ind AS 115", "Contract management", "Schedule automation", "Disclosure reports"],
  },
  {
    title: "Custom Dashboards",
    description:
      "Build real-time financial dashboards with drag-and-drop. KPIs, charts, and drill-down reports — all from your live data.",
    features: ["Drag-and-drop builder", "Real-time data", "Drill-down", "Shareable views"],
  },
  {
    title: "Approval Controls",
    description:
      "Configure multi-level approval workflows for any financial transaction. Role-based access with complete audit trails.",
    features: ["Multi-level approvals", "Role-based access", "Audit trail", "Mobile approvals"],
  },
  {
    title: "Cash Management",
    description:
      "Real-time cash positions across all accounts and entities. Forecast cash flow, optimize working capital, and manage liquidity.",
    features: ["Real-time positions", "Cash forecasting", "Working capital", "Bank connectivity"],
  },
  {
    title: "Subscription Billing",
    description:
      "Usage metering, tiered pricing, and automated invoicing for subscription businesses. Seamless revenue recognition integration.",
    features: ["Usage metering", "Tiered pricing", "Auto-invoicing", "Rev rec integration"],
  },
];

export const AI_CAPABILITIES = [
  {
    title: "Intelligent Document Reading",
    description:
      "AI-powered OCR extracts data from invoices, receipts, and financial documents — including handwritten notes and multi-page PDFs.",
    tag: "OCR",
  },
  {
    title: "Smart Bank Matching",
    description:
      "Automatically matches bank transactions to accounting entries with 97%+ accuracy. Learns from your corrections over time.",
    tag: "Matching",
  },
  {
    title: "AI Report Builder",
    description:
      "Describe the report you need in plain English. Entity's AI builds custom financial reports with the right dimensions, filters, and calculations.",
    tag: "Reports",
  },
  {
    title: "Smart Suggestions",
    description:
      "AI suggests account codes, tax treatments, and cost centers based on historical patterns. Accept with a single keystroke.",
    tag: "Suggestions",
  },
  {
    title: "Intercompany Allocations",
    description:
      "Automated cost allocation across entities based on configurable rules. Eliminate manual spreadsheet work.",
    tag: "Allocations",
  },
  {
    title: "Anomaly Detection",
    description:
      "Proactively flags unusual transactions, duplicate entries, and potential errors before they hit your books.",
    tag: "Coming Soon",
  },
  {
    title: "Intercompany Transactions",
    description:
      "Automated intercompany journal entries with configurable elimination rules for consolidated reporting.",
    tag: "Coming Soon",
  },
];

export const OPTIMIZATION_FEATURES = [
  { title: "Automated Bank Feeds", description: "Real-time bank transaction sync across all accounts" },
  { title: "Smart Reconciliation", description: "AI-powered matching with configurable rules" },
  { title: "Transaction Categorization", description: "Automatic GL coding based on learned patterns" },
  { title: "Document Interpretation", description: "Extract structured data from any financial document" },
  { title: "Anomaly Detection", description: "Flag unusual patterns and potential errors" },
  { title: "Duplicate Prevention", description: "Catch duplicate entries before they post" },
  { title: "GST Auto-Computation", description: "Automatic tax calculation and return preparation" },
  { title: "TDS Management", description: "Automated TDS deduction, payment, and filing" },
  { title: "Multi-Currency Revaluation", description: "Automated forex gain/loss calculation" },
  { title: "Approval Routing", description: "Rules-based routing to the right approver" },
  { title: "Audit Trail", description: "Complete history of every change, by whom and when" },
];

export const MIGRATION = {
  headline: "Sign Up Today.",
  headlineAccent: "Data In Tomorrow.",
  description:
    "Entity's 24-hour migration engine imports your entire chart of accounts, open balances, and historical data from Tally, QuickBooks, or any legacy system. Full implementation in 4 weeks.",
  steps: [
    { step: "1", title: "Connect", description: "Link your existing accounting system" },
    { step: "2", title: "Migrate", description: "AI maps and transfers your data in 24 hours" },
    { step: "3", title: "Go Live", description: "Full implementation with training in 4 weeks" },
  ],
};

export const TESTIMONIALS = [
  {
    quote:
      "Entity cut our month-end close from 12 days to 3. The AI bill processing alone saves our team 40 hours a week.",
    name: "Priya Sharma",
    title: "CFO",
    company: "ScaleUp Technologies",
  },
  {
    quote:
      "We migrated from Tally in 24 hours. The multi-entity management is exactly what we needed as we expanded to 5 subsidiaries.",
    name: "Arjun Mehta",
    title: "VP Finance & Operations",
    company: "GrowthStack",
  },
  {
    quote:
      "The AI suggestions are incredibly accurate. After the first month, it was predicting our account codes with 95% accuracy.",
    name: "Ravi Krishnan",
    title: "CEO",
    company: "Nexus Digital",
  },
];

export const SECURITY_BADGES = [
  { name: "SOC 2", description: "Type II Certified" },
  { name: "GDPR", description: "Compliant" },
  { name: "AES-256", description: "Encryption" },
  { name: "SSL", description: "Secure" },
  { name: "ISO 27001", description: "Certified" },
];

export const FAQ_ITEMS = [
  {
    question: "How does Entity compare to Tally, QuickBooks, and NetSuite?",
    answer:
      "Entity is built from the ground up as an AI-native platform, unlike legacy tools that bolt on AI features. We offer the data density and keyboard-first speed of Tally, the modern UX of cloud accounting, and the multi-entity power of enterprise ERPs — at a fraction of the cost.",
  },
  {
    question: "How is Entity priced?",
    answer:
      "Entity offers transparent per-entity pricing with no hidden fees. Contact our sales team for a custom quote based on your entity count and feature requirements.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Data migration happens in 24 hours. Full implementation — including training, custom configuration, and go-live support — takes approximately 4 weeks.",
  },
  {
    question: "Is implementation included in the price?",
    answer:
      "Yes. Every Entity subscription includes dedicated implementation support, data migration, and team training at no additional cost.",
  },
  {
    question: "How does the AI bill processing work?",
    answer:
      "Upload bills in any format — PDF, image, or scanned document. Entity's AI extracts vendor details, line items, amounts, GST, and TDS, then proposes complete journal entries. Review and post each bill in under 5 seconds.",
  },
  {
    question: "What integrations are available?",
    answer:
      "Entity offers 13,000+ native integrations including banks, payment processors (Stripe, Razorpay), payroll (Gusto, JustWorks), CRM (Salesforce), and more. Custom API integrations are also available.",
  },
  {
    question: "How secure is my financial data?",
    answer:
      "Entity is SOC 2 Type II certified with AES-256 encryption, SSL transport security, and GDPR compliance. Your data is hosted on enterprise-grade infrastructure with 99.99% uptime SLA.",
  },
  {
    question: "Can I export my data if I leave?",
    answer:
      "Absolutely. Entity ensures full data portability. Export your complete chart of accounts, transactions, and reports in standard formats at any time.",
  },
];

export const PRICING_TIERS = [
  {
    name: "Starter",
    price: "Contact Us",
    description: "For growing businesses with single-entity needs",
    features: [
      "Single entity",
      "Core financials (GL, AR, AP)",
      "AI bill processing",
      "Bank reconciliation",
      "GST compliance",
      "Standard integrations",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "Contact Us",
    description: "For mid-market businesses scaling operations",
    features: [
      "Up to 10 entities",
      "All core + advanced modules",
      "AI automation suite",
      "Custom dashboards",
      "Multi-currency support",
      "Approval workflows",
      "Priority support",
      "Dedicated CSM",
    ],
    cta: "Schedule Demo",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with complex needs",
    features: [
      "Unlimited entities",
      "Full platform access",
      "Custom integrations",
      "Advanced security",
      "Treasury management",
      "Revenue recognition",
      "24/7 support",
      "On-premise option",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export const FOOTER_LINKS = {
  products: {
    title: "Products",
    links: [
      { name: "General Ledger", href: "/core-financials/general-ledger" },
      { name: "Accounts Payable", href: "/core-financials/accounts-payable" },
      { name: "Accounts Receivable", href: "/core-financials/accounts-receivable" },
      { name: "Cash Management", href: "/core-financials/cash-management" },
      { name: "Tax Management", href: "/core-financials/tax-management" },
      { name: "Revenue Recognition", href: "/advanced/revenue-recognition" },
      { name: "Fixed Assets", href: "/advanced/fixed-assets" },
    ],
  },
  platform: {
    title: "Platform",
    links: [
      { name: "Multi-Entity", href: "/platform/multi-entity" },
      { name: "AI Automation", href: "/platform/ai-automation" },
      { name: "Integrations", href: "/platform/integrations" },
      { name: "Dashboards", href: "/platform/dashboards" },
      { name: "Security", href: "/platform/security" },
      { name: "Reporting", href: "/platform/reporting" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "Resource Center", href: "/resources" },
      { name: "ERP Cost Calculator", href: "/erp-cost-calculator" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Newsroom", href: "/newsroom" },
      { name: "Contact", href: "/contact" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/legal/privacy-policy" },
      { name: "Terms of Use", href: "/legal/terms" },
      { name: "Data Processing", href: "/legal/data-processing" },
    ],
  },
};

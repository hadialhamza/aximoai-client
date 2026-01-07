import React from "react";
import { Link } from "react-router";
import {
  UserPlus,
  LogIn,
  Rocket,
  CheckCircle2,
  Search,
  CreditCard,
  LayoutDashboard,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Container from "@/components/ui/container/Container";
import SectionHeading from "@/components/ui/sectionHeading/SectionHeading";
import MyBtn from "@/components/ui/buttons/MyBtn";

const GetStarted = () => {
  return (
    <section className="py-16 md:py-24 bg-base-200/30">
      <Container>
        {/* 1. Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <SectionHeading
            badge="Start Your Journey"
            icon={Rocket}
            title={
              <span className="leading-tight">
                Launch your AI Portfolio with <br className="hidden md:block" />
                <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  AximoAI
                </span>
              </span>
            }
            description="From registration to your first model deployment—experience a streamlined workflow designed for developers and data scientists."
            align="center"
          />
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link to="/register">
              <MyBtn className="h-12 px-8 text-base shadow-lg shadow-primary/25">
                <UserPlus className="w-5 h-5 mr-2" /> Create Free Account
              </MyBtn>
            </Link>
            <Link to="/login">
              <MyBtn
                variant="outline"
                className="h-12 px-8 text-base bg-base-100"
              >
                <LogIn className="w-5 h-5 mr-2" /> Login to Dashboard
              </MyBtn>
            </Link>
          </div>
        </div>

        {/* 2. Value Proposition (Bento Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {/* Card 1: Centralized */}
          <div className="md:col-span-2 bg-base-100 border border-border rounded-3xl p-8 shadow-sm relative overflow-hidden group hover:border-primary/30 transition-all">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <LayoutDashboard size={120} className="text-primary" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <Search size={24} />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-3">
                Centralized Model Catalog
              </h3>
              <p className="text-muted text-lg max-w-lg mb-6">
                Stop hunting through scattered notebooks. Store model metadata,
                frameworks, datasets, and use cases in one searchable registry.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge>Framework Filters</Badge>
                <Badge>Use Case Tags</Badge>
                <Badge>Instant Search</Badge>
              </div>
            </div>
          </div>

          {/* Card 2: Team Ready */}
          <div className="bg-base-100 border border-border rounded-3xl p-8 shadow-sm relative overflow-hidden group hover:border-primary/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold font-heading mb-3">
              Trust & Quality
            </h3>
            <p className="text-muted mb-6">
              Purchase counts and verified creator badges help you identify
              production-ready models instantly.
            </p>
            <div className="space-y-2">
              <CheckItem text="Verified Creators" />
              <CheckItem text="Popularity Signals" />
            </div>
          </div>

          {/* Card 3: Practical (Full Width Mobile, Third on Desktop) */}
          <div className="md:col-span-3 bg-gradient-to-r from-base-100 to-base-200 border border-border rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-primary/30 transition-all">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Zap size={20} />
                </div>
                <h3 className="text-xl font-bold font-heading">
                  Built for Speed
                </h3>
              </div>
              <p className="text-muted">
                Clean UI, straightforward APIs, and zero configuration required.
                Just sign up and start managing your AI assets immediately.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="px-4 py-2 rounded-lg bg-base-100 border border-border text-xs font-semibold uppercase tracking-wider text-muted">
                No Credit Card
              </span>
              <span className="px-4 py-2 rounded-lg bg-base-100 border border-border text-xs font-semibold uppercase tracking-wider text-muted">
                Education Friendly
              </span>
            </div>
          </div>
        </div>

        {/* 3. Steps Visualization (The Pipeline) */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading">How it Works</h2>
            <p className="text-muted mt-2">
              Three simple steps to organize your AI workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent z-0"></div>

            <StepCard
              step="01"
              icon={UserPlus}
              title="Create Account"
              desc="Sign up in seconds using Email or Google Authentication. No complex onboarding."
            />
            <StepCard
              step="02"
              icon={LayoutDashboard}
              title="Add Inventory"
              desc="Upload your model details. We automatically format metadata for discovery."
            />
            <StepCard
              step="03"
              icon={CreditCard}
              title="Purchase & Track"
              desc="Acquire models for your projects. Track everything in your personal dashboard."
            />
          </div>
        </div>

        {/* 4. FAQ Accordion (Modern) */}
        <div className="max-w-3xl mx-auto mb-20">
          <h3 className="text-2xl font-bold font-heading mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            <FaqItem
              q="Do I need an account to browse?"
              a="You can view the public marketplace freely. However, to see pricing details, purchase models, or manage your own inventory, an account is required."
            />
            <FaqItem
              q="Is this platform free to use?"
              a="Yes! AximoAI is currently free for all users. You can add unlimited models and simulate purchases without any actual payment processing."
            />
            <FaqItem
              q="Can I edit my models later?"
              a="Absolutely. You have full control over your inventory. You can update descriptions, datasets, or use cases at any time from your dashboard."
            />
          </div>
        </div>

        {/* 5. Final Call to Action */}
        <div className="relative rounded-3xl overflow-hidden bg-primary text-primary-content p-8 md:p-16 text-center">
          {/* Abstract Background Pattern */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold font-heading">
              Ready to get started?
            </h2>
            <p className="text-primary-content/80 text-lg max-w-xl mx-auto">
              Join a community of developers organizing the world's AI models.
            </p>
            <Link to="/register" className="inline-block mt-4">
              <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/90 transition-transform hover:scale-105 shadow-xl">
                Create Your Account Now
              </button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

// --- Helper Components ---

const Badge = ({ children }) => (
  <span className="px-3 py-1 rounded-full bg-base-200 border border-border text-xs font-semibold text-foreground">
    {children}
  </span>
);

const CheckItem = ({ text }) => (
  <div className="flex items-center gap-2 text-sm text-muted">
    <CheckCircle2 size={16} className="text-primary" />
    {text}
  </div>
);

const StepCard = ({ step, icon: Icon, title, desc }) => (
  <div className="bg-base-100 border border-border rounded-2xl p-6 relative z-10 text-center hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-lg">
    <div className="w-16 h-16 rounded-2xl bg-base-200 mx-auto flex items-center justify-center mb-6 relative">
      <Icon size={32} className="text-primary" />
      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md border-2 border-base-100">
        {step}
      </div>
    </div>
    <h4 className="text-lg font-bold font-heading mb-2">{title}</h4>
    <p className="text-sm text-muted leading-relaxed">{desc}</p>
  </div>
);

const FaqItem = ({ q, a }) => (
  <details className="group bg-base-100 border border-border rounded-2xl overflow-hidden transition-all duration-300 open:shadow-md open:border-primary/30">
    <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
      <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
        {q}
      </span>
      <span className="transform group-open:rotate-180 transition-transform duration-300 text-muted">
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </span>
    </summary>
    <div className="px-5 pb-5 text-muted text-sm leading-relaxed border-t border-border/50 pt-3 animate-in fade-in slide-in-from-top-1">
      {a}
    </div>
  </details>
);

export default GetStarted;

import React from "react";
import { Link } from "react-router";
import {
  Rocket,
  BrainCircuit,
  Database,
  Layers,
  GitBranch,
  ShoppingCart,
  CheckCircle2,
  Code2,
} from "lucide-react";
import Container from "@/components/ui/container/Container";
import SectionHeading from "@/components/ui/sectionHeading/SectionHeading";
import MyBtn from "@/components/ui/buttons/MyBtn";

const AboutAiModels = () => {
  return (
    <section className="py-16 md:py-24 bg-base-200/30">
      <Container>
        {/* 1. Header Section */}
        <div className="mb-16">
          <SectionHeading
            badge="Knowledge Base"
            icon={BrainCircuit}
            title={
              <span className="leading-tight">
                Understanding{" "}
                <span className="text-primary">
                  AI Models
                </span>
              </span>
            }
            description="Explore the architecture, lifecycle, and value of AI models in the AximoAI ecosystem."
            align="left"
          />
        </div>

        {/* 2. Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Explainer (Large Card) */}
          <div className="col-span-1 md:col-span-7 lg:col-span-8 bg-base-100 border border-border rounded-3xl p-8 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>

            <h3 className="text-2xl font-bold font-heading mb-4 relative z-10">
              What is an AI Model?
            </h3>
            <p className="text-muted text-lg leading-relaxed relative z-10">
              Think of an AI model as a{" "}
              <span className="text-primary font-medium">
                reusable intelligence block
              </span>
              . Just like a function in code, it takes input (data) and produces
              output (predictions). Instead of being explicitly programmed with
              rules, it learns patterns from datasets like{" "}
              <span className="text-foreground font-medium">ImageNet</span> or{" "}
              <span className="text-foreground font-medium">Common Crawl</span>.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              <FeatureItem
                icon={Layers}
                title="Frameworks"
                desc="Built on PyTorch, TensorFlow, Keras"
              />
              <FeatureItem
                icon={Database}
                title="Datasets"
                desc="Trained on massive structured data"
              />
              <FeatureItem
                icon={GitBranch}
                title="Use Cases"
                desc="NLP, Vision, Audio, Tabular"
              />
              <FeatureItem
                icon={ShoppingCart}
                title="Marketplace"
                desc="Buy, sell, and license models"
              />
            </div>
          </div>

          {/* Visual Metadata Card (Side Card) */}
          <div className="col-span-1 md:col-span-5 lg:col-span-4 bg-base-100 border border-border rounded-3xl p-6 shadow-sm flex flex-col justify-center relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 rounded-3xl"></div>

            <div className="text-xs font-bold text-primary uppercase tracking-wider mb-4">
              Structure Preview
            </div>

            {/* Mock Code Block / JSON View */}
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs text-slate-300 shadow-inner overflow-hidden border border-slate-700">
              <div className="flex gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
              <div>
                <span className="text-purple-400">const</span>{" "}
                <span className="text-yellow-400">Model</span> = {"{"}
              </div>
              <div className="pl-4">
                <span className="text-sky-400">name</span>:{" "}
                <span className="text-green-400">"GPT-4 Omni"</span>,
              </div>
              <div className="pl-4">
                <span className="text-sky-400">framework</span>:{" "}
                <span className="text-green-400">"PyTorch"</span>,
              </div>
              <div className="pl-4">
                <span className="text-sky-400">downloads</span>:{" "}
                <span className="text-orange-400">10,420</span>,
              </div>
              <div className="pl-4">
                <span className="text-sky-400">verified</span>:{" "}
                <span className="text-blue-400">true</span>
              </div>
              <div>{"}"}</div>
            </div>
            <p className="mt-4 text-sm text-muted text-center">
              Every model in AximoAI follows a strict schema for easy
              integration.
            </p>
          </div>

          {/* 3. Lifecycle Steps (Full Width) */}
          <div className="col-span-1 md:col-span-12 bg-base-100 border border-border rounded-3xl p-8 shadow-sm mt-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="md:w-1/3">
                <h3 className="text-xl font-bold font-heading mb-2">
                  The Lifecycle
                </h3>
                <p className="text-muted text-sm">
                  From creation to deployment, how a model flows through our
                  system.
                </p>
              </div>

              <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StepCard
                  number="01"
                  title="Upload"
                  desc="Define metadata & upload weights"
                />
                <StepCard
                  number="02"
                  title="Verify"
                  desc="Automated checks for security"
                />
                <StepCard
                  number="03"
                  title="Monetize"
                  desc="Earn from every download"
                />
              </div>
            </div>
          </div>

          {/* 4. CTA Card */}
          <div className="col-span-1 md:col-span-12 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 mt-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/30">
                <Rocket size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-foreground">
                  Ready to explore?
                </h4>
                <p className="text-muted text-sm max-w-md">
                  Dive into our curated list of models. Filter by framework, use
                  case, and popularity to find exactly what you need.
                </p>
              </div>
            </div>
            <Link to="/models">
              <MyBtn className="shadow-lg shadow-primary/20">
                Browse Models
              </MyBtn>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

// --- Helper Components ---

const FeatureItem = ({ icon: Icon, title, desc }) => (
  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-base-200/50 transition-colors">
    <div className="mt-1 text-primary">
      <Icon size={18} />
    </div>
    <div>
      <h5 className="font-semibold text-sm text-foreground">{title}</h5>
      <p className="text-xs text-muted">{desc}</p>
    </div>
  </div>
);

const StepCard = ({ number, title, desc }) => (
  <div className="bg-base-200/50 border border-border p-4 rounded-xl relative overflow-hidden group hover:border-primary/30 transition-all">
    <span className="absolute -bottom-4 -right-2 text-6xl font-black text-base-300/50 group-hover:text-primary/10 transition-colors select-none">
      {number}
    </span>
    <h5 className="font-bold text-foreground mb-1">{title}</h5>
    <p className="text-xs text-muted relative z-10">{desc}</p>
  </div>
);

export default AboutAiModels;

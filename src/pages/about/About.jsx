import React from "react";
import {
  Info,
  Cpu,
  Globe,
  ShieldCheck,
  Zap,
  Users,
  ArrowRight,
} from "lucide-react";
import Container from "@/components/ui/container/Container";
import SectionHeading from "@/components/ui/sectionHeading/SectionHeading";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <Container className="space-y-24">
        {/* 1. Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <SectionHeading
            badge="Our Mission"
            title={
              <span className="leading-tight">
                Empowering the Future with <br className="hidden md:block" />
                <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Intelligent Solutions
                </span>
              </span>
            }
            align="center"
            icon={Info}
          />
          <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl mx-auto">
            AximoAI bridges the gap between complex machine learning research
            and real-world application. We provide a curated marketplace for
            high-performance AI models, datasets, and tools.
          </p>
        </div>

        {/* 2. Stats Section (Trust Indicators) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 bg-base-200/50 border border-border rounded-3xl p-8 md:p-12">
          <StatItem value="10k+" label="Active Users" />
          <StatItem value="500+" label="Verified Models" />
          <StatItem value="99%" label="Uptime Guarantee" />
          <StatItem value="24/7" label="Expert Support" />
        </div>

        {/* 3. Our Story / Vision (Split Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Globe size={14} /> Who we are
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground">
              Building the Ecosystem for{" "}
              <span className="text-primary">Next-Gen AI</span>
            </h2>
            <div className="space-y-4 text-muted text-lg">
              <p>
                Founded in 2024, AximoAI started with a simple idea: making
                advanced AI accessible to everyone. Whether you are a solo
                developer or a large enterprise, finding the right model
                shouldn't be a hassle.
              </p>
              <p>
                We vet every model on our platform for performance, security,
                and scalability, ensuring that you can build with confidence.
              </p>
            </div>
            <div className="pt-4">
              <Link
                to="/contact"
                className="text-primary font-medium hover:underline flex items-center gap-2"
              >
                Meet our team <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Abstract Graphic / Image Placeholder */}
          <div className="relative h-[400px] w-full bg-linear-to-br from-base-200 to-base-300 rounded-3xl overflow-hidden border border-border shadow-lg group">
            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/30 blur-[100px] rounded-full group-hover:bg-primary/40 transition-all duration-700"></div>

            {/* Floating Card */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-3/4 bg-white/20 rounded"></div>
                <div className="h-2 w-1/2 bg-white/20 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Core Values (Grid) */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold font-heading mb-4">
              Why Choose AximoAI?
            </h2>
            <p className="text-muted">
              We don't just host models; we provide the infrastructure and trust
              you need to deploy them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ValueCard
              icon={ShieldCheck}
              title="Secure & Vetted"
              desc="Every model undergoes rigorous security checks to prevent vulnerabilities."
            />
            <ValueCard
              icon={Zap}
              title="High Performance"
              desc="Optimized for speed and efficiency, ensuring low latency in your apps."
            />
            <ValueCard
              icon={Cpu}
              title="Scalable Infrastructure"
              desc="From prototypes to millions of users, our platform scales with you."
            />
          </div>
        </div>

        {/* 5. CTA Section */}
        <div className="bg-primary text-primary-content rounded-3xl p-8 md:p-16 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Ready to Accelerate Your AI Journey?
            </h2>
            <p className="text-primary-content/80 text-lg max-w-xl mx-auto mb-8">
              Join thousands of developers building the future with AximoAI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/models"
                className="px-8 py-3 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-colors shadow-lg"
              >
                Explore Models
              </Link>
              <Link
                to="/register"
                className="px-8 py-3 bg-primary-content/20 text-white font-bold rounded-xl hover:bg-primary-content/30 transition-colors backdrop-blur-sm"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

// --- Helper Components ---

const StatItem = ({ value, label }) => (
  <div className="text-center space-y-1">
    <h3 className="text-3xl md:text-4xl font-bold text-primary font-heading">
      {value}
    </h3>
    <p className="text-sm md:text-base text-muted font-medium">{label}</p>
  </div>
);

const ValueCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-base-100 border border-border p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group">
    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
    <p className="text-muted leading-relaxed text-sm">{desc}</p>
  </div>
);

export default About;

import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import Container from "@/components/ui/container/Container";
import SectionHeading from "@/components/ui/sectionHeading/SectionHeading";
import MyBtn from "@/components/ui/buttons/MyBtn";
import Input from "@/components/ui/input/Input";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact Us | AximoAI";
    window.scrollTo(0, 0);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Contact Support"
          title={
            <span>
              We&apos;d love to{" "}
              <span className="text-primary">hear from you</span>
            </span>
          }
          description="Have questions about our AI models, pricing, or just want to say hello? Drop us a message below."
          icon={Mail}
          className="mb-12"
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Left Column: Contact Info */}
          <motion.div variants={item} className="space-y-8">
            <div className="bg-white/80 dark:bg-slate-950/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-8 shadow-lg dark:shadow-emerald-900/10">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-6 flex items-center gap-2">
                Get in touch
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      Email Us
                    </p>
                    <a
                      href="mailto:support@aximo.ai"
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-colors"
                    >
                      support@aximo.ai
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      Call Us
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center shrink-0 text-pink-600 dark:text-pink-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      Visit HQ
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      123 Innovation Drive, Tech City, CA 94043
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800/50">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">
                  Follow us
                </p>
                <div className="flex gap-3">
                  {[Github, Twitter, Linkedin].map((Icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500 hover:text-emerald-500 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all flex items-center justify-center"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div variants={item}>
            <div className="bg-white/95 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-8 shadow-xl dark:shadow-emerald-900/20">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input label="First Name" placeholder="John" required />
                  <Input label="Last Name" placeholder="Doe" required />
                </div>

                <Input
                  type="email"
                  label="Email Address"
                  placeholder="john@example.com"
                  icon={Mail}
                  required
                />

                <Input
                  label="Subject"
                  placeholder="How can we help?"
                  required
                />

                <Input
                  label="Message"
                  placeholder="Tell us more about your inquiry..."
                  multiline
                  rows={4}
                  required
                />

                <MyBtn
                  type="submit"
                  className="w-full justify-center shadow-lg shadow-emerald-500/25 mt-2"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </MyBtn>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Contact;

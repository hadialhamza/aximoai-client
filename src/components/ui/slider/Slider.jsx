import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Sparkles, Rocket, PlusSquare } from "lucide-react";
import MyBtn from "@/components/ui/buttons/MyBtn";
import Container from "@/components/ui/container/Container";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    image: "https://i.ibb.co.com/MD7xwG62/slide-1.png",
    title: "Manage Your AI Model Inventory",
    subtitle:
      "Keep all your AI models organized in one place with clean analytics and quick access.",
    features: [
      "Centralized repository",
      "Metadata tracking",
      "Version control",
    ],
    stats: "500+ Models Managed",
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/B5cWBFDf/slide-2.png",
    title: "Visual Dashboards for Every Model",
    subtitle:
      "Understand performance, usage and purchases with beautiful dashboards at a glance.",
    features: ["Real-time metrics", "Purchase analytics", "Usage statistics"],
    stats: "99.8% Uptime",
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/ZtZJBx0/slide-3.png",
    title: "Secure & Structured Model Management",
    subtitle:
      "Track who created, updated and purchased each model with ease and security.",
    features: ["Role-based access", "Audit trail", "Encrypted storage"],
    stats: "Enterprise Security",
  },
  {
    id: 4,
    image: "https://i.ibb.co.com/fdnG8nQm/slide4.png",
    title: "Discover, Filter & Purchase Models",
    subtitle:
      "Search by framework, use case and dataset to find the right AI model instantly.",
    features: ["Advanced filters", "Framework categories", "Use case tagging"],
    stats: "50+ Frameworks",
  },
];

const SlideContent = ({ slide, isActive }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.25,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      className="space-y-3 md:space-y-6"
    >
      <motion.div variants={itemVariants}>
        <span className="font-heading inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          AximoAI
        </span>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h1 className="font-heading text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
          {slide.title}
        </h1>
      </motion.div>

      <motion.div variants={itemVariants}>
        <p className="max-w-2xl text-sm text-slate-200/80 sm:text-base md:text-lg">
          {slide.subtitle}
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="sm:pt-2">
        <div className="space-y-2">
          {slide.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -18 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
              transition={{ delay: 0.45 + index * 0.1, duration: 0.45 }}
              className="flex items-center space-x-2"
            >
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                <svg
                  className="h-3 w-3 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-xs text-slate-200/80 sm:text-sm">
                {feature}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="sm:pt-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-primary sm:text-base">
              {slide.stats}
            </div>
            <div className="flex items-center space-x-3 text-xs text-slate-400">
              <span>✓ Trusted by teams</span>
              <span>✓ Real-time analytics</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/models">
              <MyBtn variant="primary" className="text-slate-950" icon={Rocket}>
                Browse Models
              </MyBtn>
            </Link>
            <Link to="dashboard/add-model">
              <MyBtn
                variant="outline"
                className="bg-slate-900/60 text-slate-100 border-primary/80 hover:bg-slate-900/80 hover:border-primary"
                icon={PlusSquare}
              >
                Add Model
              </MyBtn>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Slider = () => {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 text-white">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        slidesPerView={1}
        loop={true}
        effect="fade"
        speed={900}
        autoplay={{
          delay: 5200,
          disableOnInteraction: false,
        }}
        touchStartPreventDefault={false}
        pagination={{
          clickable: true,
          el: ".hero-pagination",
          renderBullet: (index, className) =>
            `<span class="${className} w-2 h-2 rounded-full bg-primary opacity-50 transition-all duration-300 hover:opacity-100 [&.swiper-pagination-bullet-active]:bg-primary! [&.swiper-pagination-bullet-active]:opacity-100! sm:w-3 sm:h-3"></span>`,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="h-[550px] lg:h-[650px] touch-pan-y"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <div className="relative h-full w-full">
                <motion.div
                  className="h-full w-full"
                  initial={{ scale: 1.08, opacity: 0 }}
                  animate={
                    isActive
                      ? { scale: 1, opacity: 1 }
                      : { scale: 1.03, opacity: 0.65 }
                  }
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <motion.img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover"
                    initial={{ scale: 1.05 }}
                    animate={isActive ? { scale: 1 } : { scale: 1.03 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </motion.div>

                <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/80 to-slate-900/30"></div>

                <div className="absolute inset-0 flex items-center">
                  <Container>
                    <SlideContent slide={slide} isActive={isActive} />
                  </Container>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons in Container */}
      <div className="absolute bottom-5 left-0 right-0 z-10 pointer-events-none">
        <Container className="flex items-center justify-between">
          <div className="swiper-button-prev static! mt-0! rounded-full bg-slate-900/60 p-2 text-primary! transition-all duration-300 hover:scale-110 hover:bg-slate-900/80 pointer-events-auto cursor-pointer after:hidden sm:p-3">
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>

          <div className="swiper-button-next static! mt-0! rounded-full bg-slate-900/60 p-2 text-primary! transition-all duration-300 hover:scale-110 hover:bg-slate-900/80 pointer-events-auto cursor-pointer after:hidden sm:p-3">
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Container>
      </div>

      {/* Pagination - Center Bottom */}
      <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 transform">
        <div className="rounded-full bg-slate-900/60 px-3 py-2 sm:px-4">
          <div className="hero-pagination flex items-center justify-center gap-2" />
        </div>
      </div>
    </section>
  );
};

export default Slider;

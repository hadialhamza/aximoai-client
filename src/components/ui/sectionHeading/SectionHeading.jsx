import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const SectionHeading = ({
  badge,
  icon: Icon,
  title,
  description,
  align = "center",
  className,
  titleClassName,
}) => {
  const alignmentClass = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-4 max-w-3xl",
        alignmentClass[align],
        className
      )}
    >
      {/* Badge */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/60 bg-primary/10 mb-2"
        >
          {Icon ? (
            <Icon className="w-3.5 h-3.5 text-primary" />
          ) : (
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px] shadow-primary/40"></span>
          )}
          <span className="text-xs text-primary tracking-widest uppercase">
            {badge}
          </span>
        </motion.div>
      )}

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={cn(
          "font-heading text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight",
          titleClassName
        )}
      >
        {title}
      </motion.h2>

      {/* Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;

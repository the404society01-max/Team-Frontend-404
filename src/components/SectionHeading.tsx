import { motion } from "framer-motion";

interface Props {
  subtitle?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

const SectionHeading = ({ subtitle, title, description, centered = true }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6 }}
    className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}
  >
    {subtitle && (
      <span className="text-accent font-medium text-sm tracking-widest uppercase mb-2 block">
        {subtitle}
      </span>
    )}
    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
      {title}
    </h2>
    {description && (
      <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    )}
  </motion.div>
);

export default SectionHeading;

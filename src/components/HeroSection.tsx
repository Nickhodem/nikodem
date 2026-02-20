import { motion } from "framer-motion";

const TypewriterLine = ({ text, delay }: { text: string; delay: number }) => (
  <motion.span
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration: 0.3 }}
  >
    {text}
  </motion.span>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 z-10">
      <div className="absolute inset-0 bg-radial-fade pointer-events-none" />
      <div className="max-w-4xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-sm text-muted-foreground mb-8 space-y-1"
        >
          <p>
            <TypewriterLine text="" delay={0.3} />
            <span className="text-primary">class</span>{" "}
            <span className="text-accent">SeniorMLEngineer</span>
            <span className="text-muted-foreground">(nn.Module):</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pl-6"
        >
          <p className="font-mono text-primary text-sm mb-4">"""</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-6 leading-[0.95] tracking-tight">
            <span className="text-foreground">I teach machines</span>
            <br />
            <span className="text-foreground">to </span>
            <span className="text-gradient glow-text">see & think.</span>
          </h1>
          <p className="font-mono text-primary text-sm mb-8">"""</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="pl-6"
        >
          <p className="text-lg md:text-xl text-muted-foreground mb-1 leading-relaxed">
            Senior Machine Learning Engineer @{" "}
            <span className="text-primary font-semibold glow-text">Luxoft / Hayden AI</span>
          </p>
          <p className="text-base text-muted-foreground mb-10 leading-relaxed font-mono">
            <span className="text-secondary-foreground">PhD(RL)</span>{" "}
            <span className="text-muted-foreground">·</span>{" "}
            <span className="text-secondary-foreground">10 years</span>{" "}
            <span className="text-muted-foreground">·</span>{" "}
            <span className="text-secondary-foreground">Vision × Learning</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="pl-6 flex gap-4"
        >
          <a
            href="#projects"
            className="group relative px-7 py-3.5 bg-primary text-primary-foreground font-mono text-sm rounded-lg overflow-hidden glow-strong transition-all hover:scale-105 duration-300"
          >
            <span className="relative z-10">self.projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="#contact"
            className="px-7 py-3.5 border border-primary/30 text-primary font-mono text-sm rounded-lg hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 hover:scale-105"
          >
            self.contact()
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-primary/30 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-primary/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

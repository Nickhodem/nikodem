import { Bus, Brain, Car, Eye, Plane, FlaskConical } from "lucide-react";
import RevealSection from "./RevealSection";

const experience = [
  {
    icon: Bus,
    role: "Senior Machine Learning Engineer",
    org: "Hayden AI",
    detail: "Training CV models for traffic situation awareness; enhancing localization with vision embeddings; AWS/SQL for operational data",
    current: true,
  },
  {
    icon: Car,
    role: "Advanced Machine Learning Engineer",
    org: "Aptiv",
    detail: "RL for vehicle motion planning (ACC, Highway Chauffeur, Valet Parking); sim2real transfer; trajectory prediction; C++/Rust on embedded",
    current: false,
  },
  {
    icon: Plane,
    role: "R&D Developer",
    org: "Flytech UAV",
    detail: "SLAM for UAVs (vision + LiDAR); Ground Control Station; spatial products from UAV imagery",
    current: false,
  },
];

const skills = [
  { icon: Brain, label: "Deep Learning", detail: "PyTorch, CNNs, Transformers, GANs" },
  { icon: Eye, label: "Computer Vision", detail: "Detection, Segmentation, Tracking, Mapping" },
  { icon: FlaskConical, label: "Reinforcement Learning", detail: "PPO, SAC, Sim2Real, Imitation Learning" },
];

const BioSection = () => {
  return (
    <section id="bio" className="relative py-28 px-6 z-10">
      <div className="absolute inset-0 bg-muted/20 pointer-events-none" />
      <div className="max-w-3xl mx-auto relative">
        <RevealSection>
          <p className="font-mono text-primary text-sm mb-3 tracking-wider"># bio</p>
          <h3 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
            10 years of{" "}
            <span className="text-gradient">AI engineering.</span>
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-12 text-lg max-w-2xl">
            From reinforcement learning research to shipping computer vision systems at scale.
            I live at the intersection of research rigor and production pragmatism.
          </p>
        </RevealSection>

        <div className="grid gap-4 mb-12">
          {experience.map(({ icon: Icon, role, org, detail, current }, i) => (
            <RevealSection key={role} delay={i * 0.1}>
              <div className={`border rounded-xl p-6 bg-card flex gap-5 items-start card-hover ${current ? 'border-primary/30 glow' : 'border-border'}`}>
                <div className={`p-2 rounded-lg ${current ? 'bg-primary/10' : 'bg-muted'}`}>
                  <Icon className={`w-5 h-5 ${current ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-heading font-semibold text-foreground">{role}</h4>
                    {current && (
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        current
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-xs text-primary mb-1.5">{org}</p>
                  <p className="text-sm text-muted-foreground">{detail}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>

        <RevealSection delay={0.15}>
          <div className="font-mono text-sm text-muted-foreground mb-5">
            <span className="text-primary">self</span>.skills = <span className="text-accent">[</span>
          </div>
        </RevealSection>
        <div className="grid md:grid-cols-3 gap-4">
          {skills.map(({ icon: Icon, label, detail }, i) => (
            <RevealSection key={label} delay={0.2 + i * 0.1}>
              <div className="border border-border rounded-xl p-6 bg-card card-hover group h-full">
                <div className="p-2 rounded-lg bg-muted w-fit mb-4 group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-heading font-semibold text-foreground mb-1.5">{label}</h4>
                <p className="font-mono text-xs text-muted-foreground">{detail}</p>
              </div>
            </RevealSection>
          ))}
        </div>
        <RevealSection delay={0.4}>
          <div className="font-mono text-sm text-muted-foreground mt-5">
            <span className="text-accent">]</span>
          </div>
        </RevealSection>
      </div>
    </section>
  );
};

export default BioSection;

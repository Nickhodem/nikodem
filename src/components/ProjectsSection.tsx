import { ExternalLink } from "lucide-react";
import RevealSection from "./RevealSection";

const projects = [
  {
    title: "Attribution Analysis of RL-Based Highway Driver",
    description: "Published in Electronics (MDPI), 2022. Attribution analysis using Shapley values of RL policies for highway driving behavior.",
    tags: ["Reinforcement Learning", "Explainability", "PyTorch", "MDPI"],
    status: "paper",
    href: "https://doi.org/10.3390/electronics11213599",
  },
  {
    title: "Highway Pilot Training from Demonstration",
    description: "Published at 25th IEEE MMAR, 2021. Imitation learning approach for training highway driving agents from expert demonstrations.",
    tags: ["Imitation Learning", "PyTorch", "IEEE", "Highway Pilot"],
    status: "paper",
    href: "https://ieeexplore.ieee.org/abstract/document/9528436/",
  },
  {
    title: "Method and System for Planning the Motion of a Vehicle",
    description: "Granted US Patent 11,584,393 (2023). ML-based vehicle trajectory planning for simultaneous nominal and abort trajectory optimization.",
    tags: ["Motion Planning", "C++", "Automotive", "US Patent"],
    status: "patent",
    href: "https://patents.google.com/patent/US11584393B2",
  },
  {
    title: "Driving Trajectory as Training Data for ML-Based ACC",
    description: "US Patent Application 17/938,232 (2023). Method for generating driving trajectory training data for adaptive cruise control systems.",
    tags: ["Adaptive Cruise", "ML Training", "Trajectory", "US Patent"],
    status: "patent",
    href: "https://patents.google.com/patent/US20230113790A1/en",
  },
];

const statusColors: Record<string, string> = {
  paper: "bg-accent/10 text-accent border-accent/20",
  patent: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative py-28 px-6 z-10">
      <div className="max-w-3xl mx-auto">
        <RevealSection>
          <p className="font-mono text-primary text-sm mb-3 tracking-wider"># projects</p>
          <h3 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-12 leading-tight">
            <a
              href="https://scholar.google.com/citations?user=zxKsQgcAAAAJ&hl=pl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity group"
            >
              Selected{" "}
              <span className="text-gradient">work.</span>
              <ExternalLink className="w-6 h-6 text-primary opacity-50 group-hover:opacity-100 transition-opacity shrink-0" />
            </a>
          </h3>
        </RevealSection>

        <div className="grid gap-5">
          {projects.map((project, i) => (
            <RevealSection key={project.title} delay={i * 0.1}>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-border rounded-xl p-7 bg-card card-hover group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-1">
                  <p className="font-mono text-xs text-muted-foreground">
                    <span className="text-primary">projects</span>[{i}] = {"{"}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
                <h4 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors mb-2 pl-5">
                  &quot;{project.title}&quot;
                </h4>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed pl-5">
                  {project.description}
                </p>
                <div className="flex gap-2 flex-wrap pl-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2.5 py-1 rounded-md bg-muted text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="font-mono text-xs text-muted-foreground mt-4">{"}"}</p>
              </a>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

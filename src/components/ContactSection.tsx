import { Github, Linkedin, Mail } from "lucide-react";
import RevealSection from "./RevealSection";

const links = [
  { icon: Mail, label: "email", href: "mailto:nickhodem@gmail.com" },
  { icon: Github, label: "github", href: "https://github.com/nickhodem" },
  { icon: Linkedin, label: "linkedin", href: "https://linkedin.com/in/nikodem-pankiewicz" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-28 px-6 z-10">
      <div className="absolute inset-0 bg-muted/20 pointer-events-none" />
      <div className="max-w-3xl mx-auto text-center relative">
        <RevealSection>
          <p className="font-mono text-primary text-sm mb-3 tracking-wider"># contact</p>
          <h3 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
            Let's <span className="text-gradient">build</span> future.
          </h3>
          <p className="text-muted-foreground mb-12 max-w-md mx-auto text-lg">
            Open to collaborations in computer vision, robotics, applied AI research and automation.
          </p>
        </RevealSection>

        <RevealSection delay={0.15}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {links.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-3 px-7 py-4 border border-border rounded-xl bg-card card-hover group"
              >
                <Icon className="w-5 h-5 text-primary" />
                <span className="font-mono text-sm text-secondary-foreground group-hover:text-primary transition-colors">
                  self.{label}
                </span>
              </a>
            ))}
          </div>
        </RevealSection>
      </div>
      <RevealSection delay={0.3}>
        <div className="max-w-3xl mx-auto mt-24 pt-8 border-t border-border text-center">
          <p className="font-mono text-xs text-muted-foreground">
            © 2026 · <span className="text-primary">if</span> __name__ == <span className="text-accent">"__main__"</span>: build()
          </p>
        </div>
      </RevealSection>
    </section>
  );
};

export default ContactSection;

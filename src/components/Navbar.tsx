import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  const links = ["mission", "bio", "projects", "contact"];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border"
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-mono text-primary font-bold text-lg tracking-tight hover:glow-text transition-all">
          self.__init__()
        </a>
        <div className="hidden sm:flex gap-8 items-center">
          {links.map((link, i) => (
            <motion.a
              key={link}
              href={`#${link}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors relative group"
            >
              self.{link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
          {/* tools button — hidden for now
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + links.length * 0.1 }}
          >
            <Link
              to="/ike-comparison"
              className="font-mono text-sm px-3 py-1 rounded-md border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
            >
              tools
            </Link>
          </motion.div>
          */}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const links = ["mission", "bio", "projects", "contact"];
  const [open, setOpen] = useState(false);

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

        {/* Desktop nav */}
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
        </div>

        {/* Mobile hamburger button */}
        <button
          className="sm:hidden text-muted-foreground hover:text-primary transition-colors"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden border-t border-border bg-background/80 backdrop-blur-xl overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link}`}
                  onClick={() => setOpen(false)}
                  className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  self.{link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

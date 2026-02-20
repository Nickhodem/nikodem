# Vite Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the Next.js personal site with the Vite + React app from `brainy-bio-box/`, porting IKE Comparison as a routed page.

**Architecture:** Copy brainy-bio-box files to the repo root, making it the canonical site. Add IKE Comparison as a `/ike-comparison` route. Fix placeholder contact links. Configure Vite base path for GitHub Pages (`/nikodem/`). Delete Next.js artifacts.

**Tech Stack:** Vite 5, React 18, TypeScript, Tailwind CSS, shadcn/ui, framer-motion, react-router-dom, Recharts, Vitest

---

## Task 1: Copy tooling/config files from brainy-bio-box to root

**Files:**
- Overwrite/create at root: `package.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `vite.config.ts`, `tailwind.config.ts`, `postcss.config.js`, `components.json`, `eslint.config.js`, `vitest.config.ts`, `index.html`, `bun.lockb`

**Step 1: Copy all config files**

```bash
cp brainy-bio-box/package.json .
cp brainy-bio-box/tsconfig.json .
cp brainy-bio-box/tsconfig.app.json .
cp brainy-bio-box/tsconfig.node.json .
cp brainy-bio-box/vite.config.ts .
cp brainy-bio-box/tailwind.config.ts .
cp brainy-bio-box/postcss.config.js .
cp brainy-bio-box/components.json .
cp brainy-bio-box/eslint.config.js .
cp brainy-bio-box/vitest.config.ts .
cp brainy-bio-box/index.html .
cp brainy-bio-box/bun.lockb .
```

**Step 2: Copy src and public directories**

```bash
cp -r brainy-bio-box/src .
cp -r brainy-bio-box/public .
```

**Step 3: Delete the old root eslint.config.mjs (replaced by .js)**

```bash
rm eslint.config.mjs
```

**Step 4: Verify structure**

```bash
ls src/ public/ vite.config.ts package.json tsconfig.json index.html
```

Expected: all files present, no errors

**Step 5: Commit**

```bash
git add package.json tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts tailwind.config.ts postcss.config.js components.json eslint.config.js vitest.config.ts index.html bun.lockb src/ public/
git rm eslint.config.mjs
git commit -m "chore: copy brainy-bio-box Vite+React app to root"
```

---

## Task 2: Port IKE Comparison component

The component lives at `tools/IkeComparison.tsx`. It uses `"use client"` (Next.js only) and Recharts (already in new package.json).

**Files:**
- Create: `src/pages/IkeComparison.tsx`
- Source: `tools/IkeComparison.tsx`

**Step 1: Copy and strip the Next.js directive**

Copy `tools/IkeComparison.tsx` to `src/pages/IkeComparison.tsx`, then remove the `"use client";` line at the top. The resulting file starts with:

```tsx
import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// ... rest unchanged
```

**Step 2: Verify the file exists**

```bash
head -3 src/pages/IkeComparison.tsx
```

Expected: first line is `import { useState, useMemo } from "react";` (no `"use client"`)

**Step 3: Commit**

```bash
git add src/pages/IkeComparison.tsx
git commit -m "feat: port IkeComparison component to Vite src"
```

---

## Task 3: Add IKE Comparison route to App.tsx

**Files:**
- Modify: `src/App.tsx`

**Step 1: Read the current App.tsx**

Current content at `src/App.tsx`:
```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
// ...
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
```

**Step 2: Add the IKE route and basename**

Edit `src/App.tsx`:
- Add import: `import IkeComparison from "./pages/IkeComparison";`
- Add `basename="/nikodem"` to `<BrowserRouter>`
- Add route before the `*` catch-all:

```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import IkeComparison from "./pages/IkeComparison";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/nikodem">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ike-comparison" element={<IkeComparison />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
```

**Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add /ike-comparison route with basename /nikodem"
```

---

## Task 4: Add Tools link to Navbar

The Navbar at `src/components/Navbar.tsx` renders scroll-anchor links for `mission`, `bio`, `projects`, `contact`. Add a page-route link to `/ike-comparison` using react-router-dom's `Link`.

**Files:**
- Modify: `src/components/Navbar.tsx`

**Step 1: Update Navbar.tsx**

```tsx
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
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
```

**Step 2: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add tools link to navbar"
```

---

## Task 5: Fix ContactSection with real links

**Files:**
- Modify: `src/components/ContactSection.tsx`

Replace the placeholder `links` array at the top of the file:

```tsx
// Replace this:
const links = [
  { icon: Mail, label: "email", href: "mailto:hello@example.com" },
  { icon: Github, label: "github", href: "#" },
  { icon: Linkedin, label: "linkedin", href: "#" },
];

// With this:
const links = [
  { icon: Mail, label: "email", href: "mailto:nickhodem@gmail.com" },
  { icon: Github, label: "github", href: "https://github.com/nickhodem" },
  { icon: Linkedin, label: "linkedin", href: "https://linkedin.com/in/nikodem-pankiewicz" },
];
```

The rest of the file stays unchanged.

**Step 2: Commit**

```bash
git add src/components/ContactSection.tsx
git commit -m "fix: replace placeholder contact links with real ones"
```

---

## Task 6: Configure Vite for GitHub Pages and remove lovable-tagger

The site deploys to `https://<user>.github.io/nikodem/` so Vite needs `base: "/nikodem/"`. Also remove the `lovable-tagger` dev plugin (it's a Lovable.dev tool, not needed here).

**Files:**
- Modify: `vite.config.ts`

**Step 1: Update vite.config.ts**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "/nikodem/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**Step 2: Remove lovable-tagger from package.json devDependencies**

In `package.json`, delete the line:
```
"lovable-tagger": "^1.1.13",
```

**Step 3: Commit**

```bash
git add vite.config.ts package.json
git commit -m "chore: set Vite base path for GitHub Pages, remove lovable-tagger"
```

---

## Task 7: Update Makefile for Vite

**Files:**
- Modify: `Makefile`

```makefile
dev:
	npm run dev

build:
	npm run build

start:
	npm run preview

deploy:
	npm run build && npx gh-pages -d dist --nojekyll

format:
	npx eslint . --fix

.PHONY: dev build start deploy format
```

Note: Vite uses `dist/` (not `out/`). `start` becomes `npm run preview` (Vite's preview server).

**Step 2: Commit**

```bash
git add Makefile
git commit -m "chore: update Makefile for Vite (dist/, preview)"
```

---

## Task 8: Install dependencies

**Step 1: Remove old node_modules and lock file**

```bash
rm -rf node_modules package-lock.json
```

**Step 2: Install**

```bash
npm install
```

Expected: clean install, no errors. A new `package-lock.json` is generated.

**Step 3: Run tests to verify basic setup**

```bash
npm test
```

Expected: `1 passed` (the example.test.ts smoke test)

**Step 4: Commit lock file**

```bash
git add package-lock.json
git commit -m "chore: regenerate package-lock.json for Vite deps"
```

---

## Task 9: Verify dev server and build

**Step 1: Start dev server**

```bash
npm run dev
```

Expected: server starts on `http://localhost:8080`. Open it and verify:
- Neural background animates
- All nav links work (mission, bio, projects, contact scroll correctly)
- `tools` link navigates to `/nikodem/ike-comparison` and renders the IKE calculator
- Contact links point to real addresses
- No console errors

Stop the server with Ctrl+C.

**Step 2: Build for production**

```bash
npm run build
```

Expected: `dist/` folder created, no TypeScript or build errors.

**Step 3: Preview production build**

```bash
npm run preview
```

Open the URL shown and verify the same things as dev server. Stop with Ctrl+C.

---

## Task 10: Delete Next.js artifacts

Only do this after Task 9 confirms the build works.

**Step 1: Remove Next.js files**

```bash
rm -rf app/ components/ tools/ next.config.ts next-env.d.ts out/
```

**Step 2: Verify nothing important was removed**

```bash
ls
```

Expected: `src/`, `public/`, `dist/`, `docs/`, `package.json`, `vite.config.ts`, etc. No `app/`, `next.config.ts`.

**Step 3: Verify build still works**

```bash
npm run build
```

Expected: clean build with no errors.

**Step 4: Commit**

```bash
git rm -r app/ components/ tools/ next.config.ts next-env.d.ts
git add -u
git commit -m "chore: remove Next.js app, components, tools, config"
```

---

## Task 11: Final verification

**Step 1: Run full test suite**

```bash
npm test
```

Expected: all tests pass.

**Step 2: Run lint**

```bash
make format
```

Expected: no errors (exit 0).

**Step 3: Confirm git status is clean**

```bash
git status
```

Expected: `nothing to commit, working tree clean`

// components/Navbar.tsx
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "rgba(15, 23, 42, 0.9)",
      backdropFilter: "blur(8px)",
      borderBottom: "1px solid #1e293b",
      padding: "0 24px",
      height: 56,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontFamily: "system-ui, sans-serif",
    }}>
      <Link href="/" style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 16, textDecoration: "none", letterSpacing: "-0.3px" }}>
        NP
      </Link>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {[
          { label: "About", href: "/#about" },
          { label: "Tools", href: "/#tools" },
          { label: "Blog", href: "/#blog" },
        ].map(({ label, href }) => (
          <Link key={href} href={href} style={{ color: "#94a3b8", fontSize: 14, textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#f1f5f9")}
            onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

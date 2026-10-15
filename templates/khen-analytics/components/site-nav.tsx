"use client";

import * as React from "react";
import { Button, Container } from "@tp/ui";
import { BrandMark } from "./brand-mark";
import { ChevronDown, Menu } from "./icons";

const LINKS = [
  { label: "Home", hasMenu: false },
  { label: "Products", hasMenu: true },
  { label: "Resources", hasMenu: true },
  { label: "Pricing", hasMenu: false },
];

export function SiteNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-neutral-0">
      <Container className="flex h-[72px] items-center gap-10">
        <a href="#" aria-label="Khen home">
          <BrandMark />
        </a>

        <nav className="hidden items-center gap-2 tab:flex">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href="#"
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-[15px] font-semibold text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            >
              {link.label}
              {link.hasMenu && <ChevronDown />}
            </a>
          ))}
        </nav>

        <span className="flex-1" />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/avatar-nav.png"
          alt="Your account"
          className="hidden h-10 w-10 rounded-full border border-neutral-200 object-cover tab:block"
        />

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
          className="p-2 text-neutral-700 tab:hidden"
        >
          <Menu />
        </button>
      </Container>

      {open && (
        <div className="border-t border-neutral-100 py-3 tab:hidden">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href="#"
              className="block px-6 py-3 font-semibold text-neutral-700"
            >
              {link.label}
            </a>
          ))}
          <div className="px-6 py-2">
            <Button className="w-full">Sign up</Button>
          </div>
        </div>
      )}
    </header>
  );
}

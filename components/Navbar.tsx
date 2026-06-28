"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { title } from "node:process";

/* ─── Menu data ────────────────────────────────────────────────────────── */


const simpleLinks = [
  { title: "Solutions", url: "/solutions" },
  { title: "Platform", url: "/platform" },
  { title: "Industries", url: "/industries" },
  { title: "Proof", url: "/proof" },
  { title: "Partners", url: "/partners" },
  { title: "Claim Integrity", url: "/claimintegrity" },
  { title: "Resources", url: "/resources" },
  { title: "Company", url: "/company" },
];

/* ─── Navbar ───────────────────────────────────────────────────────────── */

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pillBg = isScrolled
    ? "bg-[#0B1C30E5] border-white/8 shadow-[0_1px_0_rgba(255,255,255,0.06)]"
    : "bg-[#0B1C30E5] border-transparent";

  const linkCls =
    "inline-flex h-9 items-center px-3 text-sm font-medium text-white/75 hover:text-white hover:bg-white/10 rounded-lg transition-colors";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className={`px-4 md:px-8 lg:px-16 py-5 border-b transition-all duration-500 ${pillBg}`}>
        <div className="mx-auto max-w-7xl flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo.svg" alt="Grelin" className="h-7 w-auto" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-0">


                {/* Simple links */}
                {simpleLinks.map((link) => (
                  <NavigationMenuItem key={link.title}>
                    <NavigationMenuLink asChild>
                      <a href={link.url} className={linkCls}>{link.title}</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}


              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Desktop right: Log in + CTA */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* <a
              href="#"
              className="inline-flex items-center bg-navy-100 px-5 py-2 text-sm font-semibold text-[#ffffff] transition-colors"
              >
              Log In
            </a> */}
            <a
              href="/company?service=request-a-demo"
              className="inline-flex items-center rounded-lg bg-white px-5 py-2 text-sm font-semibold text-[#0B1120] hover:bg-white/90 transition-colors"
            >
              Request Demo
            </a>
          </div>

          {/* Mobile: hamburger → Sheet */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="text-white/80 hover:text-white p-1" aria-label="Open menu">
                  <Menu size={22} />
                </button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    <a href="/" className="flex items-center gap-2">
                      <img src="/logo.svg" alt="Grelin" className="h-6 w-auto" />
                    </a>
                  </SheetTitle>
                </SheetHeader>

                <div className="px-6 mt-4 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    {simpleLinks.map((link) => (
                      <a
                        key={link.title}
                        href={link.url}
                        className="py-2 px-1 text-sm font-medium text-white/80 hover:text-white transition-colors"
                      >
                        {link.title}
                      </a>
                    ))}
                  </div>

                  {/* Mobile auth */}
                  {/* <div className="flex flex-col gap-2.5 pt-4 border-t border-white/10">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-lg bg-[#gdfdfd  ] px-5 py-2.5 text-sm font-semibold text-[#0B1120] hover:bg-white/90 transition-colors"
                    >
                      Login
                    </a>
                  </div> */}
                  <div className="flex flex-col gap-2.5 pt-4 border-t border-white/10">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#0B1120] hover:bg-white/90 transition-colors"
                    >
                      Assess My Revenue Risk
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  );
}

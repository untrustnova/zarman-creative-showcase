import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Boxes,
  Film,
  Info,
  Menu,
  Palette,
  Send,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { HeroScene } from "@/components/HeroScene";
import { VideoFacade } from "@/components/VideoFacade";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { FlagEN, FlagID } from "@/components/FlagIcons";

import zarmanLogo from "@/assets/zarman-logo.png";
import dewaWelcome from "@/assets/dewa-printing/dewa-welcome.jpg";
import dewaOrderGuide from "@/assets/dewa-printing/dewa-order-guide.jpg";
import dewaPromoMmt from "@/assets/dewa-printing/dewa-promo-mmt.jpg";
import dewaMaterialGuide from "@/assets/dewa-printing/dewa-material-guide.jpg";
import dewaSoftwareDesain from "@/assets/dewa-printing/dewa-software-desain.jpg";
import dewaIdulAdha from "@/assets/dewa-printing/dewa-idul-adha.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zarman Studio — Creative Agency" },
      {
        name: "description",
        content:
          "Zarman Studio is an independent creative agency specializing in video editing, graphic design (including Dewa Printing campaign visuals), and 3D animation.",
      },
      { property: "og:title", content: "Zarman Studio — Creative Agency" },
      {
        property: "og:description",
        content:
          "Video editing, graphic design, and 3D animation transforming bold ideas into character-rich visuals.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedWorkId, setSelectedWorkId] = useState<string | null>(null);

  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    document.title = t.meta.title;
  }, [t.meta.title]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let cleanup = () => {};
    const setup = async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);
      let rafId = 0;
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 86%", once: true },
            },
          );
        });
        gsap.to("[data-marquee]", {
          xPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-marquee-wrap]",
            scrub: 1,
            start: "top bottom",
            end: "bottom top",
          },
        });
      }, pageRef);
      cleanup = () => {
        context.revert();
        cancelAnimationFrame(rafId);
        lenis.off("scroll", onScroll);
        lenis.destroy();
      };
    };
    void setup();
    return () => cleanup();
  }, []);

  const dewaPrintingWorks = [
    {
      id: "welcome",
      image: dewaWelcome,
      title: t.graphicDesign.works.welcome.title,
      type: t.graphicDesign.works.welcome.type,
      year: t.graphicDesign.works.welcome.year,
      description: t.graphicDesign.works.welcome.description,
    },
    {
      id: "promoMmt",
      image: dewaPromoMmt,
      title: t.graphicDesign.works.promoMmt.title,
      type: t.graphicDesign.works.promoMmt.type,
      year: t.graphicDesign.works.promoMmt.year,
      description: t.graphicDesign.works.promoMmt.description,
    },
    {
      id: "orderGuide",
      image: dewaOrderGuide,
      title: t.graphicDesign.works.orderGuide.title,
      type: t.graphicDesign.works.orderGuide.type,
      year: t.graphicDesign.works.orderGuide.year,
      description: t.graphicDesign.works.orderGuide.description,
    },
    {
      id: "materialGuide",
      image: dewaMaterialGuide,
      title: t.graphicDesign.works.materialGuide.title,
      type: t.graphicDesign.works.materialGuide.type,
      year: t.graphicDesign.works.materialGuide.year,
      description: t.graphicDesign.works.materialGuide.description,
    },
    {
      id: "softwareDesain",
      image: dewaSoftwareDesain,
      title: t.graphicDesign.works.softwareDesain.title,
      type: t.graphicDesign.works.softwareDesain.type,
      year: t.graphicDesign.works.softwareDesain.year,
      description: t.graphicDesign.works.softwareDesain.description,
    },
    {
      id: "idulAdha",
      image: dewaIdulAdha,
      title: t.graphicDesign.works.idulAdha.title,
      type: t.graphicDesign.works.idulAdha.type,
      year: t.graphicDesign.works.idulAdha.year,
      description: t.graphicDesign.works.idulAdha.description,
    },
  ];

  const selectedWork = selectedWorkId
    ? (dewaPrintingWorks.find((w) => w.id === selectedWorkId) ?? null)
    : null;

  return (
    <div ref={pageRef} className="overflow-clip bg-background text-foreground">
      {/* Navbar: attached at the top, floats when scrolled */}
      <header
        className={cn(
          "fixed inset-x-0 z-50 transition-all duration-300 ease-out",
          isScrolled ? "top-3 md:top-4 px-3 sm:px-6 md:px-8" : "top-0 px-0",
        )}
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between transition-all duration-300",
            isScrolled
              ? "h-16 max-w-[1440px] rounded-xl border border-border/80 bg-background/90 px-5 shadow-2xl shadow-black/40 backdrop-blur-2xl md:px-8"
              : "h-18 max-w-[1600px] border-b border-border/60 bg-background/75 px-5 backdrop-blur-xl md:px-10",
          )}
        >
          <a
            href="#top"
            className="flex items-center gap-3 font-display text-lg font-bold uppercase leading-none transition-opacity hover:opacity-90"
            aria-label="Zarman Studio home"
          >
            <img src={zarmanLogo} alt="Zarman Studio Logo" className="size-8 object-contain" />
            <div>
              Zarman<span className="text-primary">.</span>
              <span className="block text-[9px] font-medium tracking-[0.3em] text-muted-foreground">
                Studio
              </span>
            </div>
          </a>

          <nav
            className="hidden items-center gap-7 text-xs font-semibold uppercase md:flex"
            aria-label="Main navigation"
          >
            <a
              className="flex items-center gap-1.5 transition-colors hover:text-primary"
              href="#work"
            >
              <Film className="size-3.5 text-primary" />
              <span>{t.nav.work}</span>
            </a>
            <a
              className="flex items-center gap-1.5 transition-colors hover:text-primary"
              href="#graphic-design"
            >
              <Palette className="size-3.5 text-primary" />
              <span>{t.nav.graphicDesign}</span>
            </a>
            <a
              className="flex items-center gap-1.5 transition-colors hover:text-primary"
              href="#services"
            >
              <Boxes className="size-3.5 text-primary" />
              <span>{t.nav.services}</span>
            </a>
            <a
              className="flex items-center gap-1.5 transition-colors hover:text-primary"
              href="#about"
            >
              <Info className="size-3.5 text-primary" />
              <span>{t.nav.about}</span>
            </a>

            {/* Single Flag Language Toggle Button */}
            <button
              type="button"
              onClick={toggleLang}
              className="flex items-center justify-center border border-border/80 bg-secondary/30 p-1.5 transition-all hover:border-primary hover:bg-secondary/60 cursor-pointer"
              aria-label={lang === "en" ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
              title={
                lang === "en"
                  ? "Current: English (Click to switch to Indonesia)"
                  : "Saat ini: Indonesia (Klik untuk ganti ke English)"
              }
            >
              {lang === "en" ? (
                <FlagEN className="h-4 w-6 shadow-xs" />
              ) : (
                <FlagID className="h-4 w-6 shadow-xs" />
              )}
            </button>

            <Button asChild size="sm">
              <a href="#contact" className="flex items-center gap-1.5">
                <Send className="size-3.5" />
                <span>{t.nav.startProject}</span>
                <ArrowDownRight className="size-4" />
              </a>
            </Button>
          </nav>

          <Button
            variant="icon"
            size="icon"
            className="md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className={cn(
                "overflow-hidden border-border bg-background/95 backdrop-blur-2xl md:hidden",
                isScrolled ? "mt-2 mx-auto max-w-[1440px] rounded-xl border shadow-xl" : "border-t",
              )}
            >
              <div className="flex flex-col px-5 py-5 font-display text-2xl font-semibold uppercase">
                {/* Mobile Language Switcher Flag Button */}
                <div className="flex items-center justify-between border-b border-border py-4 text-sm font-semibold">
                  <span className="text-xs uppercase text-muted-foreground">Language / Bahasa</span>
                  <button
                    type="button"
                    onClick={toggleLang}
                    className="flex items-center gap-2.5 border border-border bg-secondary/40 px-3 py-1.5 text-xs font-mono transition-colors hover:border-primary cursor-pointer"
                    aria-label="Toggle language"
                    title={
                      lang === "en"
                        ? "Current: English (Click to switch to Indonesia)"
                        : "Saat ini: Indonesia (Klik untuk ganti ke English)"
                    }
                  >
                    {lang === "en" ? (
                      <>
                        <FlagEN className="h-4 w-6 shadow-xs" />
                        <span>English</span>
                      </>
                    ) : (
                      <>
                        <FlagID className="h-4 w-6 shadow-xs" />
                        <span>Indonesia</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href="#work"
                  className="flex items-center gap-3 border-b border-border py-4 transition-colors hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  <Film className="size-5 text-primary" />
                  <span>{t.nav.work}</span>
                </a>
                <a
                  href="#graphic-design"
                  className="flex items-center gap-3 border-b border-border py-4 transition-colors hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  <Palette className="size-5 text-primary" />
                  <span>{t.nav.graphicDesign}</span>
                </a>
                <a
                  href="#services"
                  className="flex items-center gap-3 border-b border-border py-4 transition-colors hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  <Boxes className="size-5 text-primary" />
                  <span>{t.nav.services}</span>
                </a>
                <a
                  href="#about"
                  className="flex items-center gap-3 border-b border-border py-4 transition-colors hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  <Info className="size-5 text-primary" />
                  <span>{t.nav.about}</span>
                </a>
                <a
                  href="#contact"
                  className="flex items-center gap-3 py-4 text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  <Send className="size-5" />
                  <span>{t.nav.startProject}</span>
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section
          id="top"
          className="relative flex min-h-[92svh] items-end overflow-hidden border-b border-border pt-24"
        >
          <div className="hero-fallback absolute inset-0" />
          <HeroScene />
          <div className="pointer-events-none absolute inset-0 bg-hero-overlay" />
          <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-8 md:px-10 md:pb-12">
            <div className="mb-12 flex items-end justify-between gap-6">
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground md:text-base">
                {t.hero.description}
              </p>
              <p className="hidden whitespace-pre-line text-right text-xs uppercase text-muted-foreground md:block">
                {t.hero.availability}
              </p>
            </div>
            <h1 className="font-display text-[18vw] font-bold uppercase leading-[0.72] tracking-normal md:text-[14vw]">
              Zarman<span className="text-primary">.</span>
            </h1>
            <div className="mt-7 flex flex-col justify-between gap-5 border-t border-foreground/25 pt-5 sm:flex-row sm:items-center">
              <p className="font-display text-lg font-medium uppercase md:text-2xl">
                {t.hero.subtitle}
              </p>
              <Button asChild variant="outline">
                <a href="#work">
                  {t.hero.exploreWork} <ArrowDownRight className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section data-marquee-wrap className="border-b border-border py-6">
          <div
            data-marquee
            className="flex w-max items-center gap-8 whitespace-nowrap font-display text-4xl font-semibold uppercase md:text-7xl"
          >
            <span>{t.marquee[0]}</span>
            <span className="text-primary">✦</span>
            <span>{t.marquee[1]}</span>
            <span className="text-primary">✦</span>
            <span>{t.marquee[2]}</span>
            <span className="text-primary">✦</span>
            <span>{t.marquee[0]}</span>
            <span className="text-primary">✦</span>
            <span>{t.marquee[1]}</span>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
          <div data-reveal className="mb-16 grid gap-8 md:grid-cols-12">
            <p className="text-xs uppercase text-primary md:col-span-3">{t.work.sectionNum}</p>
            <h2 className="font-display text-5xl font-semibold uppercase leading-[0.95] md:col-span-8 md:text-8xl">
              {t.work.headingLine1}
              <br />
              <span className="text-muted-foreground">{t.work.headingLine2}</span>
            </h2>
          </div>
          <div className="grid gap-16 lg:grid-cols-2">
            <VideoFacade
              id="SZ6nrBVuebc"
              index="01"
              title={t.work.videos["SZ6nrBVuebc"].title}
              category={t.work.videos["SZ6nrBVuebc"].category}
            />
            <div className="lg:mt-36">
              <VideoFacade
                id="3AUkolq5ki0"
                index="02"
                title={t.work.videos["3AUkolq5ki0"].title}
                category={t.work.videos["3AUkolq5ki0"].category}
                accent
              />
            </div>
            <VideoFacade
              id="FAHnnprMT8M"
              index="03"
              title={t.work.videos["FAHnnprMT8M"].title}
              category={t.work.videos["FAHnnprMT8M"].category}
            />
            <div className="lg:mt-36">
              <VideoFacade
                id="ynMxV4M9tEE"
                index="04"
                title={t.work.videos["ynMxV4M9tEE"].title}
                category={t.work.videos["ynMxV4M9tEE"].category}
                accent
              />
            </div>
          </div>
        </section>

        {/* Section 02: Graphic Design (Dewa Printing) - Clean typography, no ovals */}
        <section id="graphic-design" className="bg-foreground py-24 text-background md:py-36">
          <div className="mx-auto max-w-[1600px] px-5 md:px-10">
            <div
              data-reveal
              className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end"
            >
              <div>
                <p className="mb-5 text-xs uppercase text-primary">{t.graphicDesign.sectionNum}</p>
                <h2 className="font-display text-5xl font-semibold uppercase leading-none md:text-8xl">
                  {t.graphicDesign.headingLine1}
                  <br />
                  {t.graphicDesign.headingLine2}
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-background/60">
                {t.graphicDesign.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 md:gap-8">
              {dewaPrintingWorks.map((work, index) => (
                <motion.article
                  key={work.id}
                  data-reveal
                  className={index % 2 === 1 ? "md:mt-12" : ""}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedWorkId(work.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setSelectedWorkId(work.id);
                    }}
                    className="group relative aspect-[4/5] overflow-hidden bg-background cursor-pointer"
                    aria-label={`${t.graphicDesign.viewVisual}: ${work.title}`}
                  >
                    <img
                      src={work.image}
                      alt={work.title}
                      loading="lazy"
                      width={1024}
                      height={1280}
                      className="size-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="border border-white/30 bg-black/75 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
                        {t.graphicDesign.viewVisual}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between gap-3 border-t border-background/20 pt-3">
                    <div>
                      <h3 className="font-display text-sm font-semibold uppercase md:text-lg">
                        {work.title}
                      </h3>
                      <p className="text-[10px] uppercase text-background/50 md:text-xs">
                        {work.type}
                      </p>
                    </div>
                    <span className="text-xs text-background/50">{work.year}</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
          <div data-reveal className="mb-14 grid gap-6 md:grid-cols-12">
            <p className="text-xs uppercase text-primary md:col-span-3">{t.services.sectionNum}</p>
            <h2 className="font-display text-5xl font-semibold uppercase md:col-span-8 md:text-8xl">
              {t.services.heading}
            </h2>
          </div>
          <div className="border-t border-border">
            {t.services.list.map((service) => (
              <article
                key={service.n}
                data-reveal
                className="group grid gap-5 border-b border-border py-8 transition-colors hover:text-primary md:grid-cols-12 md:items-center md:py-12"
              >
                <span className="text-xs md:col-span-2">{service.n}</span>
                <h3 className="font-display text-3xl font-semibold uppercase md:col-span-5 md:text-6xl">
                  {service.title}
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:col-span-4">
                  {service.copy}
                </p>
                <ArrowDownRight className="hidden size-7 transition-transform group-hover:rotate-[-45deg] md:block" />
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="border-y border-border bg-surface py-14 md:py-20">
          <div className="mx-auto grid max-w-[1600px] gap-8 px-5 md:grid-cols-12 md:gap-12 md:px-10">
            <p className="text-xs uppercase text-primary md:col-span-3">{t.about.sectionNum}</p>
            <div className="md:col-span-8" data-reveal>
              <p className="font-display text-4xl font-medium uppercase leading-tight md:text-7xl">
                {t.about.headlinePrefix}
                <span className="text-primary">{t.about.headlineAccent}</span>
                {t.about.headlineSuffix}
              </p>
              <div className="mt-8 grid gap-6 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2 md:mt-10 md:gap-8">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="relative overflow-hidden bg-primary py-24 text-primary-foreground md:py-36"
        >
          <div className="contact-lines absolute inset-0 opacity-20" />
          <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
            <p className="mb-12 text-xs font-semibold uppercase">{t.contact.sectionNum}</p>
            <h2
              data-reveal
              className="max-w-6xl font-display text-6xl font-bold uppercase leading-[0.88] md:text-9xl"
            >
              {t.contact.headingLine1}
              <br />
              {t.contact.headingLine2}
            </h2>
            <div className="mt-16 grid gap-8 border-t border-primary-foreground/30 pt-7 md:grid-cols-3">
              <a className="group" href="tel:+6289519305701">
                <span className="block text-xs uppercase opacity-65">{t.contact.phone}</span>
                <span className="mt-2 flex items-center gap-2 font-display text-lg font-semibold">
                  +62 895 1930 5701{" "}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
              <a className="group" href="mailto:zarmanstudio@gmail.com">
                <span className="block text-xs uppercase opacity-65">{t.contact.email}</span>
                <span className="mt-2 flex items-center gap-2 font-display text-lg font-semibold">
                  zarmanstudio@gmail.com{" "}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
              <a
                className="group"
                href="https://instagram.com/zarman.creative"
                target="_blank"
                rel="noreferrer"
              >
                <span className="block text-xs uppercase opacity-65">{t.contact.instagram}</span>
                <span className="mt-2 flex items-center gap-2 font-display text-lg font-semibold">
                  @zarman.creative{" "}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer: improved proper architectural agency layout, no ovals */}
      <footer className="border-t border-border bg-background pt-16 pb-12 text-xs uppercase text-muted-foreground">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <div className="grid gap-10 pb-12 border-b border-border/60 md:grid-cols-12">
            {/* Brand Column */}
            <div className="space-y-4 md:col-span-5">
              <div className="flex items-center gap-3 font-display text-lg font-bold uppercase leading-none text-foreground">
                <img src={zarmanLogo} alt="Zarman Studio Logo" className="size-7 object-contain" />
                <div>
                  Zarman<span className="text-primary">.</span>
                  <span className="block text-[8px] font-medium tracking-[0.3em] text-muted-foreground">
                    Studio
                  </span>
                </div>
              </div>
              <p className="max-w-sm normal-case text-xs leading-relaxed text-muted-foreground">
                {t.footer.desc}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <span className="size-1.5 bg-emerald-500" />
                <span>{t.footer.available}</span>
              </div>
            </div>

            {/* Sitemap Navigation */}
            <div className="space-y-3 md:col-span-3">
              <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-foreground">
                {t.footer.navigation}
              </h4>
              <div className="flex flex-col gap-2.5 font-medium">
                <a href="#work" className="transition-colors hover:text-primary">
                  {t.work.sectionNum}
                </a>
                <a href="#graphic-design" className="transition-colors hover:text-primary">
                  {t.graphicDesign.sectionNum}
                </a>
                <a href="#services" className="transition-colors hover:text-primary">
                  {t.services.sectionNum}
                </a>
                <a href="#about" className="transition-colors hover:text-primary">
                  {t.about.sectionNum}
                </a>
                <a href="#contact" className="transition-colors hover:text-primary">
                  {t.contact.sectionNum}
                </a>
              </div>
            </div>

            {/* Contact & Socials */}
            <div className="space-y-3 md:col-span-4">
              <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-foreground">
                {t.footer.getInTouch}
              </h4>
              <div className="flex flex-col gap-2.5 normal-case font-medium">
                <a
                  href="https://instagram.com/zarman.creative"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 uppercase transition-colors hover:text-primary"
                >
                  <span>Instagram: @zarman.creative</span>
                  <ArrowRight className="size-3" />
                </a>
                <a href="tel:+6289519305701" className="transition-colors hover:text-primary">
                  {t.contact.phone}: +62 895 1930 5701
                </a>
                <a
                  href="mailto:zarmanstudio@gmail.com"
                  className="transition-colors hover:text-primary"
                >
                  {t.contact.email}: zarmanstudio@gmail.com
                </a>
                <span className="pt-1 text-[11px] uppercase text-muted-foreground/60">
                  {t.footer.location}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row">
            <p>{t.footer.rights}</p>
            <p className="text-center text-[11px]">{t.footer.showcaseTag}</p>
            <a
              href="#top"
              className="font-medium text-foreground transition-colors hover:text-primary"
            >
              {t.footer.backToTop}
            </a>
          </div>
        </div>
      </footer>

      {/* Detail Dialog Preview Modal */}
      <Dialog open={!!selectedWork} onOpenChange={(open) => !open && setSelectedWorkId(null)}>
        <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto border-border bg-card p-4 sm:p-6 text-card-foreground">
          {selectedWork && (
            <div className="grid gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-7 flex justify-center overflow-hidden border border-border/60 bg-background/80 p-2">
                <img
                  src={selectedWork.image}
                  alt={selectedWork.title}
                  className="max-h-[68vh] w-auto object-contain"
                />
              </div>
              <div className="flex flex-col justify-between space-y-4 md:col-span-5">
                <div>
                  <span className="text-xs uppercase font-mono text-primary">
                    Dewa Printing · {selectedWork.type}
                  </span>
                  <DialogTitle className="mt-1 font-display text-2xl font-bold uppercase leading-tight text-foreground">
                    {selectedWork.title}
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-xs uppercase text-muted-foreground">
                    {t.graphicDesign.prodYearLabel}: {selectedWork.year}
                  </DialogDescription>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {selectedWork.description}
                  </p>
                </div>

                <div className="border-t border-border/60 pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t.graphicDesign.clientLabel}</span>
                    <span className="font-semibold text-foreground">
                      {t.graphicDesign.clientName}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t.graphicDesign.agencyLabel}</span>
                    <span className="font-semibold text-primary">{t.graphicDesign.agencyName}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedWorkId(null)}
                    className="flex-1 uppercase font-semibold"
                  >
                    {t.graphicDesign.closeBtn}
                  </Button>
                  <Button asChild size="sm" className="flex-1 uppercase font-semibold">
                    <a href="#contact" onClick={() => setSelectedWorkId(null)}>
                      {t.graphicDesign.contactBtn}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

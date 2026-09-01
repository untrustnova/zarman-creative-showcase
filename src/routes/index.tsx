import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { HeroScene } from "@/components/HeroScene";
import { VideoFacade } from "@/components/VideoFacade";
import chroma from "@/assets/poster-chroma.jpg";
import signal from "@/assets/poster-signal.jpg";
import orbit from "@/assets/poster-orbit.jpg";
import pulse from "@/assets/poster-pulse.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zarman Studio — Creative Agency" },
      { name: "description", content: "Zarman Studio adalah creative agency untuk video editing, graphic design, dan 3D animation." },
      { property: "og:title", content: "Zarman Studio — Creative Agency" },
      { property: "og:description", content: "Video editing, graphic design, dan 3D animation yang mengubah ide menjadi visual berkarakter." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const posters = [
  { image: chroma, title: "Chroma Form", type: "Art Direction", year: "2026" },
  { image: signal, title: "Red Signal", type: "Campaign Visual", year: "2026" },
  { image: orbit, title: "New Orbit", type: "3D Poster", year: "2025" },
  { image: pulse, title: "Kinetic Pulse", type: "Visual Identity", year: "2025" },
];

function Index() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
          gsap.fromTo(element, { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 86%", once: true },
          });
        });
        gsap.to("[data-marquee]", {
          xPercent: -18,
          ease: "none",
          scrollTrigger: { trigger: "[data-marquee-wrap]", scrub: 1, start: "top bottom", end: "bottom top" },
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

  return (
    <div ref={pageRef} className="overflow-clip bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-[1600px] items-center justify-between px-5 md:px-10">
          <a href="#top" className="font-display text-lg font-bold uppercase leading-none" aria-label="Zarman Studio home">
            Zarman<span className="text-primary">.</span><span className="block text-[9px] font-medium tracking-[0.3em] text-muted-foreground">Studio</span>
          </a>
          <nav className="hidden items-center gap-8 text-xs font-semibold uppercase md:flex" aria-label="Main navigation">
            <a className="transition-colors hover:text-primary" href="#work">Work</a>
            <a className="transition-colors hover:text-primary" href="#services">Services</a>
            <a className="transition-colors hover:text-primary" href="#about">About</a>
            <Button asChild size="sm"><a href="#contact">Start a project <ArrowDownRight className="size-4" /></a></Button>
          </nav>
          <Button variant="icon" size="icon" className="md:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-t border-border bg-background md:hidden">
              <div className="flex flex-col px-5 py-5 font-display text-3xl font-semibold uppercase">
                {["work", "services", "about", "contact"].map((item) => <a key={item} href={`#${item}`} className="border-b border-border py-4" onClick={() => setMenuOpen(false)}>{item}</a>)}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section id="top" className="relative flex min-h-[92svh] items-end overflow-hidden border-b border-border pt-24">
          <div className="hero-fallback absolute inset-0" />
          <HeroScene />
          <div className="pointer-events-none absolute inset-0 bg-hero-overlay" />
          <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-8 md:px-10 md:pb-12">
            <div className="mb-12 flex items-end justify-between gap-6">
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground md:text-base">Independent creative studio from Indonesia. We shape ideas into moving images and bold visual worlds.</p>
              <p className="hidden text-right text-xs uppercase text-muted-foreground md:block">Available for projects<br />Worldwide · 2026</p>
            </div>
            <h1 className="font-display text-[18vw] font-bold uppercase leading-[0.72] tracking-normal md:text-[14vw]">
              Zarman<span className="text-primary">.</span>
            </h1>
            <div className="mt-7 flex flex-col justify-between gap-5 border-t border-foreground/25 pt-5 sm:flex-row sm:items-center">
              <p className="font-display text-lg font-medium uppercase md:text-2xl">Creative Agency / Visual Playground</p>
              <Button asChild variant="outline"><a href="#work">Explore our work <ArrowDownRight className="size-4" /></a></Button>
            </div>
          </div>
        </section>

        <section data-marquee-wrap className="border-b border-border py-6">
          <div data-marquee className="flex w-max items-center gap-8 whitespace-nowrap font-display text-4xl font-semibold uppercase md:text-7xl">
            <span>Video Editing</span><span className="text-primary">✦</span><span>Graphic Design</span><span className="text-primary">✦</span><span>3D Animation</span><span className="text-primary">✦</span><span>Video Editing</span><span className="text-primary">✦</span><span>Graphic Design</span>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
          <div data-reveal className="mb-16 grid gap-8 md:grid-cols-12">
            <p className="text-xs uppercase text-primary md:col-span-3">01 / Selected work</p>
            <h2 className="font-display text-5xl font-semibold uppercase leading-[0.95] md:col-span-8 md:text-8xl">Stories that move.<br /><span className="text-muted-foreground">Visuals that stay.</span></h2>
          </div>
          <div className="grid gap-16 lg:grid-cols-2">
            <VideoFacade id="aqz-KE-bpKQ" index="01" title="Midnight Run" category="Video Editing" />
            <div className="lg:mt-36"><VideoFacade id="ScMzIvxBSi4" index="02" title="Future Matter" category="3D Animation" accent /></div>
          </div>
        </section>

        <section className="bg-foreground py-24 text-background md:py-36">
          <div className="mx-auto max-w-[1600px] px-5 md:px-10">
            <div data-reveal className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div><p className="mb-5 text-xs uppercase text-primary">02 / Graphic design</p><h2 className="font-display text-5xl font-semibold uppercase leading-none md:text-8xl">Built to be<br />remembered.</h2></div>
              <p className="max-w-sm text-sm leading-relaxed text-background/60">Identities, campaigns, and visual systems designed to cut through noise and leave a distinct impression.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
              {posters.map((poster, index) => (
                <motion.article key={poster.title} data-reveal className={index % 2 ? "md:mt-20" : ""} whileHover={{ y: -8 }} transition={{ duration: 0.35 }}>
                  <div className="aspect-[4/5] overflow-hidden bg-background">
                    <img src={poster.image} alt={`Placeholder artwork ${poster.title}`} loading="lazy" width={1024} height={1280} className="size-full object-cover transition-transform duration-700 hover:scale-105" />
                  </div>
                  <div className="mt-4 flex justify-between gap-3 border-t border-background/20 pt-3">
                    <div><h3 className="font-display text-sm font-semibold uppercase md:text-lg">{poster.title}</h3><p className="text-[10px] uppercase text-background/50 md:text-xs">{poster.type}</p></div>
                    <span className="text-xs text-background/50">{poster.year}</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
          <div data-reveal className="mb-14 grid gap-6 md:grid-cols-12"><p className="text-xs uppercase text-primary md:col-span-3">03 / Capabilities</p><h2 className="font-display text-5xl font-semibold uppercase md:col-span-8 md:text-8xl">What we do</h2></div>
          <div className="border-t border-border">
            {[{ n: "01", title: "Video Editing", copy: "Commercial, social content, music video, color grading, and post-production." },{ n: "02", title: "Graphic Design", copy: "Brand identity, campaign visuals, key art, poster, and digital design systems." },{ n: "03", title: "3D Animation", copy: "Product films, motion identity, simulations, and cinematic visual experiences." }].map((service) => (
              <article key={service.n} data-reveal className="group grid gap-5 border-b border-border py-8 transition-colors hover:text-primary md:grid-cols-12 md:items-center md:py-12">
                <span className="text-xs md:col-span-2">{service.n}</span><h3 className="font-display text-3xl font-semibold uppercase md:col-span-5 md:text-6xl">{service.title}</h3><p className="max-w-md text-sm leading-relaxed text-muted-foreground md:col-span-4">{service.copy}</p><ArrowDownRight className="hidden size-7 transition-transform group-hover:rotate-[-45deg] md:block" />
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="border-y border-border bg-surface py-24 md:py-36">
          <div className="mx-auto grid max-w-[1600px] gap-12 px-5 md:grid-cols-12 md:px-10">
            <p className="text-xs uppercase text-primary md:col-span-3">04 / Zarman Studio</p>
            <div className="md:col-span-8" data-reveal>
              <p className="font-display text-4xl font-medium uppercase leading-tight md:text-7xl">We turn rough ideas into <span className="text-primary">visual energy</span> people can feel.</p>
              <div className="mt-14 grid gap-8 border-t border-border pt-8 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2"><p>Zarman Studio adalah creative agency independen yang menggabungkan storytelling, design, dan teknologi untuk menciptakan karya yang relevan.</p><p>Dari satu frame hingga dunia 3D utuh, setiap detail dirancang untuk bekerja keras bagi cerita dan karakter brand.</p></div>
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden bg-primary py-24 text-primary-foreground md:py-36">
          <div className="contact-lines absolute inset-0 opacity-20" />
          <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
            <p className="mb-12 text-xs font-semibold uppercase">05 / Have a project?</p>
            <h2 data-reveal className="max-w-6xl font-display text-6xl font-bold uppercase leading-[0.88] md:text-9xl">Let's make<br />it move.</h2>
            <div className="mt-16 grid gap-8 border-t border-primary-foreground/30 pt-7 md:grid-cols-3">
              <a className="group" href="tel:+6289519305701"><span className="block text-xs uppercase opacity-65">Phone</span><span className="mt-2 flex items-center gap-2 font-display text-lg font-semibold">+62 895 1930 5701 <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></a>
              <a className="group" href="mailto:zarmanstudio@gmail.com"><span className="block text-xs uppercase opacity-65">Email</span><span className="mt-2 flex items-center gap-2 font-display text-lg font-semibold">zarmanstudio@gmail.com <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></a>
              <a className="group" href="https://instagram.com/zarman.creative" target="_blank" rel="noreferrer"><span className="block text-xs uppercase opacity-65">Instagram</span><span className="mt-2 flex items-center gap-2 font-display text-lg font-semibold">@zarman.creative <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col justify-between gap-4 bg-background px-5 py-7 text-xs uppercase text-muted-foreground md:flex-row md:px-10"><p>© 2026 Zarman Studio</p><p>Indonesia · Available worldwide</p><a href="#top" className="text-foreground hover:text-primary">Back to top ↑</a></footer>
    </div>
  );
}

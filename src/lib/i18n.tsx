import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "id";

export interface DetectionInfo {
  detectedLang: Language;
  reason: string;
}

export const translations = {
  en: {
    meta: {
      title: "Zarman Studio — Creative Agency",
      description:
        "Zarman Studio is an independent creative agency specializing in video editing, graphic design (including Dewa Printing campaign visuals), and 3D animation.",
      ogTitle: "Zarman Studio — Creative Agency",
      ogDescription:
        "Video editing, graphic design, and 3D animation transforming bold ideas into character-rich visuals.",
    },
    nav: {
      work: "Work",
      graphicDesign: "Graphic Design",
      services: "Services",
      about: "About",
      contact: "Contact",
      startProject: "Start a project",
    },
    hero: {
      description:
        "Independent creative studio from Indonesia. We shape ideas into moving images and bold visual worlds.",
      availability: "Available for projects\nWorldwide · 2026",
      subtitle: "Creative Agency / Visual Playground",
      exploreWork: "Explore our work",
    },
    marquee: ["Video Editing", "Graphic Design", "3D Animation"],
    work: {
      sectionNum: "01 / Selected work",
      headingLine1: "Stories that move.",
      headingLine2: "Visuals that stay.",
      playProject: "Play project",
      watch: "Watch",
      youtubePreview: "YouTube Preview",
      videos: {
        SZ6nrBVuebc: {
          title: "Is Elden Ring Really That Hard?",
          category: "Gaming Video Editing",
        },
        "3AUkolq5ki0": {
          title: "Punishing Gray Raven: Character Showcase",
          category: "Game Motion & Edit",
        },
        FAHnnprMT8M: {
          title: "Star Savior: Game Review & Visuals",
          category: "Review & Motion Visuals",
        },
        ynMxV4M9tEE: {
          title: "Elden Ring: Playing Weaponless",
          category: "Narrative Gaming Video",
        },
      },
    },
    graphicDesign: {
      sectionNum: "02 / Graphic design (Dewa Printing)",
      headingLine1: "Built to be",
      headingLine2: "remembered.",
      description:
        "Visual systems, promotional campaigns, and print marketing assets designed for Dewa Printing Semarang to cut through noise and leave a distinct impression.",
      viewVisual: "View Artwork",
      clientLabel: "Client",
      clientName: "Dewa Printing (Semarang)",
      agencyLabel: "Creative Studio",
      agencyName: "Zarman Studio",
      prodYearLabel: "Production Year",
      closeBtn: "Close",
      contactBtn: "Contact Studio",
      works: {
        welcome: {
          title: "Brand Welcome & Storefront",
          type: "Storefront Visual",
          year: "2026",
          description:
            "Primary branding visual for Dewa Printing Semarang highlighting 'Fast Printing, Sharp Results, Friendly Prices'.",
        },
        promoMmt: {
          title: "Outdoor MMT Promo 16K/m",
          type: "Pricelist Campaign",
          year: "2026",
          description:
            "Outdoor print campaign with high-contrast pricing typography for 280, 340, and 440 GSM grades.",
        },
        orderGuide: {
          title: "Print Order Process",
          type: "Customer Infographic",
          year: "2026",
          description:
            "Step-by-step visual order guide simplifying customer inquiries via WhatsApp and in-store.",
        },
        materialGuide: {
          title: "MMT Material Guide",
          type: "Material Education",
          year: "2026",
          description:
            "Educational guide on MMT print materials helping clients select the optimal thickness and banner type.",
        },
        softwareDesain: {
          title: "Graphic Software Guide",
          type: "Technical Guide",
          year: "2026",
          description:
            "Practical recommendation guide for production-grade design software used in modern print workflows.",
        },
        idulAdha: {
          title: "Idul Adha 1447 H Greeting",
          type: "Seasonal Campaign",
          year: "2026",
          description:
            "Warm and celebratory seasonal visual crafted to strengthen brand affinity and festive engagement.",
        },
      },
    },
    services: {
      sectionNum: "03 / Capabilities",
      heading: "What we do",
      list: [
        {
          n: "01",
          title: "Video Editing",
          copy: "Commercial, social content, music video, color grading, and post-production.",
        },
        {
          n: "02",
          title: "Graphic Design",
          copy: "Brand identity, campaign visuals, key art, poster, and digital design systems.",
        },
        {
          n: "03",
          title: "3D Animation",
          copy: "Product films, motion identity, simulations, and cinematic visual experiences.",
        },
      ],
    },
    about: {
      sectionNum: "04 / Zarman Studio",
      headlinePrefix: "We turn rough ideas into ",
      headlineAccent: "visual energy",
      headlineSuffix: " people can feel.",
      p1: "Zarman Studio is an independent creative agency combining storytelling, design, and technology to produce work that resonates.",
      p2: "From a single frame to an entire 3D world, every detail is crafted to work relentlessly for brand character and narrative.",
    },
    contact: {
      sectionNum: "05 / Have a project?",
      headingLine1: "Let's make",
      headingLine2: "it move.",
      phone: "Phone",
      email: "Email",
      instagram: "Instagram",
    },
    footer: {
      desc: "Independent creative studio shaping ideas into moving images, bold graphic design, and 3D visual worlds.",
      available: "Available for projects worldwide · 2026",
      navigation: "Navigation",
      getInTouch: "Get In Touch",
      rights: "© 2026 Zarman Studio. All rights reserved.",
      showcaseTag: "Graphic Design Showcase for Dewa Printing",
      backToTop: "Back to top ↑",
      location: "Indonesia · GMT+7 · Available Worldwide",
      detectedPrefix: "Detected location:",
    },
  },
  id: {
    meta: {
      title: "Zarman Studio — Creative Agency",
      description:
        "Zarman Studio adalah creative agency independen untuk video editing, desain grafis (termasuk kampanye visual Dewa Printing), dan animasi 3D.",
      ogTitle: "Zarman Studio — Creative Agency",
      ogDescription:
        "Video editing, desain grafis, dan animasi 3D yang mengubah ide berani menjadi visual penuh karakter.",
    },
    nav: {
      work: "Karya",
      graphicDesign: "Desain Grafis",
      services: "Layanan",
      about: "Tentang",
      contact: "Kontak",
      startProject: "Mulai Projek",
    },
    hero: {
      description:
        "Studio kreatif independen dari Indonesia. Kami mengubah ide menjadi gambar bergerak dan dunia visual berkarakter.",
      availability: "Menerima projek\nSeluruh Dunia · 2026",
      subtitle: "Creative Agency / Visual Playground",
      exploreWork: "Lihat karya kami",
    },
    marquee: ["Video Editing", "Desain Grafis", "Animasi 3D"],
    work: {
      sectionNum: "01 / Karya terpilih",
      headingLine1: "Kisah yang bergerak.",
      headingLine2: "Visual yang membekas.",
      playProject: "Putar projek",
      watch: "Tonton",
      youtubePreview: "Pratinjau YouTube",
      videos: {
        SZ6nrBVuebc: {
          title: "Apakah Elden Ring Sesusah Itu?",
          category: "Video Editing Game",
        },
        "3AUkolq5ki0": {
          title: "Punishing Gray Raven: Karakter Showcase",
          category: "Motion & Edit Game",
        },
        FAHnnprMT8M: {
          title: "Star Savior: Review Game & Visual",
          category: "Review & Motion Visual",
        },
        ynMxV4M9tEE: {
          title: "Apakah Bisa Main Elden Ring Tanpa Senjata?",
          category: "Video Naratif Game",
        },
      },
    },
    graphicDesign: {
      sectionNum: "02 / Desain grafis (Dewa Printing)",
      headingLine1: "Diciptakan untuk",
      headingLine2: "dikenang.",
      description:
        "Sistem visual, materi promosi, dan aset pemasaran cetak untuk Dewa Printing Semarang yang dirancang komunikatif dan berkarakter kuat.",
      viewVisual: "Lihat Visual",
      clientLabel: "Klien",
      clientName: "Dewa Printing (Semarang)",
      agencyLabel: "Creative Studio",
      agencyName: "Zarman Studio",
      prodYearLabel: "Tahun Produksi",
      closeBtn: "Tutup",
      contactBtn: "Kontak Studio",
      works: {
        welcome: {
          title: "Selamat Datang di Dewa Printing",
          type: "Visual Storefront",
          year: "2026",
          description:
            "Visual branding utama Dewa Printing Semarang dengan pesan 'Cetak Cepat, Hasil Tajam, Harga Bersahabat'.",
        },
        promoMmt: {
          title: "Print Outdoor MMT Promo 16K/m",
          type: "Kampanye Pricelist",
          year: "2026",
          description:
            "Materi kampanye cetak outdoor MMT dengan hierarki tipografi harga kontras untuk varian 280, 340, dan 440 GSM.",
        },
        orderGuide: {
          title: "Tata Cara Order di Dewa Printing",
          type: "Infografis Pelanggan",
          year: "2026",
          description:
            "Infografis panduan alur pemesanan cetak yang mempermudah konsultasi konsumen via WhatsApp maupun langsung di toko.",
        },
        materialGuide: {
          title: "Kenali Beda Bahan MMT",
          type: "Edukasi Bahan Cetak",
          year: "2026",
          description:
            "Poster edukasi spesifikasi material cetak MMT agar promosi klien tepat guna dan efisien.",
        },
        softwareDesain: {
          title: "Software Desain untuk Percetakan",
          type: "Panduan Teknis",
          year: "2026",
          description:
            "Infografis rekomendasi aplikasi desain grafis yang sesuai standar alur produksi percetakan modern.",
        },
        idulAdha: {
          title: "Selamat Hari Raya Idul Adha 1447 H",
          type: "Ucapan Hari Raya",
          year: "2026",
          description:
            "Key visual ucapan hari raya bernuansa hangat dan religius untuk memperkuat kedekatan brand dengan audiens.",
        },
      },
    },
    services: {
      sectionNum: "03 / Kapabilitas",
      heading: "Layanan Kami",
      list: [
        {
          n: "01",
          title: "Video Editing",
          copy: "Komersial, konten media sosial, video musik, color grading, dan post-produksi.",
        },
        {
          n: "02",
          title: "Desain Grafis",
          copy: "Identitas brand, visual kampanye, key art, poster, dan sistem desain digital.",
        },
        {
          n: "03",
          title: "Animasi 3D",
          copy: "Film produk, motion identity, simulasi, dan pengalaman visual sinematik.",
        },
      ],
    },
    about: {
      sectionNum: "04 / Zarman Studio",
      headlinePrefix: "Kami mengubah ide mentah menjadi ",
      headlineAccent: "energi visual",
      headlineSuffix: " yang dapat dirasakan.",
      p1: "Zarman Studio adalah creative agency independen yang menggabungkan storytelling, desain, dan teknologi untuk menciptakan karya yang relevan.",
      p2: "Dari satu frame hingga dunia 3D utuh, setiap detail dirancang untuk bekerja keras bagi cerita dan karakter brand.",
    },
    contact: {
      sectionNum: "05 / Punya projek?",
      headingLine1: "Mari kita",
      headingLine2: "wujudkan.",
      phone: "Telepon",
      email: "Email",
      instagram: "Instagram",
    },
    footer: {
      desc: "Studio kreatif independen yang mengubah ide menjadi gambar bergerak, desain grafis berkarakter, dan dunia 3D.",
      available: "Tersedia untuk projek di seluruh dunia · 2026",
      navigation: "Navigasi",
      getInTouch: "Hubungi Kami",
      rights: "© 2026 Zarman Studio. Hak cipta dilindungi.",
      showcaseTag: "Showcase Desain Grafis Dewa Printing",
      backToTop: "Kembali ke atas ↑",
      location: "Indonesia · GMT+7 · Tersedia untuk Seluruh Dunia",
      detectedPrefix: "Lokasi terdeteksi:",
    },
  },
};

export type Translations = typeof translations.en;

export function detectLocationLocale(): DetectionInfo {
  if (typeof window === "undefined") {
    return { detectedLang: "en", reason: "Default (SSR)" };
  }

  // 1. Stored user selection
  const stored = localStorage.getItem("zarman_language") as Language | null;
  if (stored === "en" || stored === "id") {
    return { detectedLang: stored, reason: "Saved preference" };
  }

  // 2. Browser Languages
  try {
    const langs = navigator.languages || [navigator.language];
    const indonesianLang = langs.find((l) => l.toLowerCase().startsWith("id"));
    if (indonesianLang) {
      return {
        detectedLang: "id",
        reason: `Browser Language (${indonesianLang})`,
      };
    }
  } catch {
    // Continue
  }

  // 3. Timezone Detection (Indonesian Western, Central, Eastern time zones)
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (
      tz.includes("Jakarta") ||
      tz.includes("Makassar") ||
      tz.includes("Jayapura") ||
      tz.includes("Pontianak") ||
      tz.includes("Indonesia")
    ) {
      return {
        detectedLang: "id",
        reason: `Regional Timezone (${tz})`,
      };
    }
    if (tz) {
      return {
        detectedLang: "en",
        reason: `Regional Timezone (${tz})`,
      };
    }
  } catch {
    // Continue
  }

  return { detectedLang: "en", reason: "International default" };
}

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: Translations;
  detection: DetectionInfo;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const [detection, setDetection] = useState<DetectionInfo>({
    detectedLang: "en",
    reason: "Initializing...",
  });

  useEffect(() => {
    const info = detectLocationLocale();
    setDetection(info);
    setLangState(info.detectedLang);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("zarman_language", newLang);
      setDetection({
        detectedLang: newLang,
        reason: "User selected",
      });
    } catch {
      // Ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === "en" ? "id" : "en");
  };

  const value: LanguageContextValue = {
    lang,
    setLang,
    toggleLang,
    t: translations[lang],
    detection,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

interface VideoFacadeProps {
  id: string;
  index: string;
  title: string;
  category: string;
  accent?: boolean;
}

export function VideoFacade({ id, index, title, category, accent = false }: VideoFacadeProps) {
  const [playing, setPlaying] = useState(false);
  const { t } = useLanguage();

  return (
    <article className="group border-t border-border pt-4">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs uppercase text-muted-foreground">
            {index} / {category}
          </p>
          <h3 className="font-display text-2xl font-semibold uppercase md:text-4xl">{title}</h3>
        </div>
        <span className="hidden text-xs uppercase text-muted-foreground md:block">
          {t.work.playProject}
        </span>
      </div>
      <div
        className={`relative aspect-video overflow-hidden border border-border ${accent ? "bg-primary" : "bg-surface"}`}
      >
        {playing ? (
          <iframe
            className="size-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={`${title} video preview`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div
            className="relative size-full cursor-pointer overflow-hidden"
            onClick={() => setPlaying(true)}
          >
            <img
              src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
              alt={title}
              loading="lazy"
              className="size-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-95"
            />
            <div className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/20" />
            <div className="video-grid pointer-events-none absolute inset-0 opacity-40" />

            <div className="absolute inset-0 grid place-items-center">
              <Button
                variant="icon"
                className="size-16 rounded-full bg-foreground text-background shadow-xl transition-transform duration-500 group-hover:scale-110 md:size-20"
                aria-label={`${t.work.playProject} ${title}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setPlaying(true);
                }}
              >
                <Play className="size-6 fill-current md:size-7" />
              </Button>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs uppercase tracking-wider text-white/90">
              <span className="border border-white/20 bg-black/60 px-2 py-0.5 backdrop-blur-xs">
                {t.work.youtubePreview}
              </span>
              <span className="border border-white/20 bg-black/60 px-2 py-0.5 backdrop-blur-xs">
                {t.work.watch}
              </span>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

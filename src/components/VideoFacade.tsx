import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoFacadeProps {
  id: string;
  index: string;
  title: string;
  category: string;
  accent?: boolean;
}

export function VideoFacade({ id, index, title, category, accent = false }: VideoFacadeProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="group border-t border-border pt-4">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs uppercase text-muted-foreground">{index} / {category}</p>
          <h3 className="font-display text-2xl font-semibold uppercase md:text-4xl">{title}</h3>
        </div>
        <span className="hidden text-xs uppercase text-muted-foreground md:block">Play project</span>
      </div>
      <div className={`relative aspect-video overflow-hidden border border-border ${accent ? "bg-primary" : "bg-surface"}`}>
        {playing ? (
          <iframe
            className="size-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={`${title} video preview`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center overflow-hidden">
            <div className="video-grid absolute inset-0 opacity-70" />
            <p className="select-none font-display text-[15vw] font-bold uppercase leading-none text-foreground/5 md:text-[9vw]">
              {category.split(" ")[0]}
            </p>
            <Button
              variant="icon"
              className="absolute size-16 rounded-full bg-foreground text-background transition-transform duration-500 group-hover:scale-110 md:size-20"
              aria-label={`Putar ${title}`}
              onClick={() => setPlaying(true)}
            >
              <Play className="size-6 fill-current md:size-7" />
            </Button>
            <div className="absolute bottom-5 left-5 right-5 flex justify-between text-xs uppercase text-foreground/70">
              <span>Youtube preview</span>
              <span>00:45</span>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

import * as React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]

function Carousel({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }: React.ComponentProps<"div"> & { opts?: any; plugins?: any; orientation?: "horizontal" | "vertical"; setApi?: (api: CarouselApi) => void }) {
  const [carouselRef, api] = useEmblaCarousel({ ...opts, axis: orientation === "horizontal" ? "x" : "y" }, plugins)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api])
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api])

  return (
    <div onKeyDownCapture={(e) => { if (e.key === "ArrowLeft") scrollPrev(); else if (e.key === "ArrowRight") scrollNext(); }} className={cn("relative", className)} role="region" aria-roledescription="carousel" data-slot="carousel" {...props}>
      {children}
    </div>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div ref={{ current: null }} className="overflow-hidden" data-slot="carousel-content">
      <div className={cn("flex", className)} {...props} />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div role="group" aria-roledescription="slide" data-slot="carousel-item" className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", className)} {...props} />
}

function CarouselPrevious({ className, variant = "outline", size = "icon", ...props }: React.ComponentProps<typeof Button>) {
  return <Button data-slot="carousel-previous" variant={variant} size={size} className={cn("absolute size-8 rounded-full -left-12 top-1/2 -translate-y-1/2", className)} {...props}><ArrowLeft /><span className="sr-only">Previous slide</span></Button>
}

function CarouselNext({ className, variant = "outline", size = "icon", ...props }: React.ComponentProps<typeof Button>) {
  return <Button data-slot="carousel-next" variant={variant} size={size} className={cn("absolute size-8 rounded-full -right-12 top-1/2 -translate-y-1/2", className)} {...props}><ArrowRight /><span className="sr-only">Next slide</span></Button>
}

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }

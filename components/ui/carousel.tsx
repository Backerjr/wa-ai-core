import * as React from "react"

import { cn } from "@/lib/utils"

type CarouselProps = {
  orientation?: "horizontal" | "vertical"
}

type CarouselContextProps = {
  orientation: "horizontal" | "vertical"
}

const CarouselContext = React.createContext<CarouselContextProps>({
  orientation: "horizontal"
})

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <CarouselContext.Provider value={{ orientation }}>
        <div
          ref={ref}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = React.useContext(CarouselContext);
  return (
    <div className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }: { className?: string } & React.HTMLAttributes<HTMLDivElement>, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

export {
  Carousel,
  CarouselContent,
  CarouselItem,
}
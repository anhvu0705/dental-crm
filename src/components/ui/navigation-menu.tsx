import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function NavigationMenu({ className, children, viewport = true, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & { viewport?: boolean }) {
  return <NavigationMenuPrimitive.Root data-slot="navigation-menu" data-viewport={viewport} className={cn("group/navigation-menu relative flex max-w-max flex-1 items-center justify-center", className)} {...props}>{children}{viewport && <NavigationMenuViewport />}</NavigationMenuPrimitive.Root>
}

function NavigationMenuList({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return <NavigationMenuPrimitive.List data-slot="navigation-menu-list" className={cn("group flex flex-1 list-none items-center justify-center gap-1", className)} {...props} />
}

function NavigationMenuItem({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" className={cn("relative", className)} {...props} />
}

function NavigationMenuTrigger({ className, children, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return <NavigationMenuPrimitive.Trigger data-slot="navigation-menu-trigger" className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent focus:bg-accent disabled:pointer-events-none disabled:opacity-50", className)} {...props}>{children}<ChevronDownIcon className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180" /></NavigationMenuPrimitive.Trigger>
}

function NavigationMenuContent({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return <NavigationMenuPrimitive.Content data-slot="navigation-menu-content" className={cn("top-0 left-0 w-full md:absolute md:w-auto p-2", className)} {...props} />
}

function NavigationMenuViewport({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return <div className={cn("absolute top-full left-0 isolate z-50 flex justify-center")}><NavigationMenuPrimitive.Viewport data-slot="navigation-menu-viewport" className={cn("bg-popover text-popover-foreground relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]", className)} {...props} /></div>
}

export { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuViewport }

"use client"
import * as React from "react"
import { PanelLeftIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"

function SidebarProvider({ children, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-wrapper" className={cn("flex min-h-svh w-full")} {...props}>{children}</div>
}

function Sidebar({ children, ...props }: React.ComponentProps<"div">) {
  return <aside data-slot="sidebar" className={cn("bg-sidebar text-sidebar-foreground flex h-full w-64 flex-col", className)} {...props}>{children}</aside>
}

function SidebarTrigger({ className, ...props }: React.ComponentProps<typeof Button>) {
  return <Button data-slot="sidebar-trigger" variant="ghost" size="icon" className={cn("size-7", className)} {...props}><PanelLeftIcon /><span className="sr-only">Toggle Sidebar</span></Button>
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-content" className={cn("flex flex-1 flex-col gap-2 overflow-auto", className)} {...props} />
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-header" className={cn("flex flex-col gap-2 p-2", className)} {...props} />
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-footer" className={cn("flex flex-col gap-2 p-2", className)} {...props} />
}

export { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarFooter }

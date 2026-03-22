"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="input-group" role="group" className={cn("border-input relative flex w-full items-center rounded-md border shadow-xs transition-colors", className)} {...props} />
}

function InputGroupAddon({ className, children, onClick, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="input-group-addon" className={cn("flex h-auto cursor-text items-center px-3 text-sm text-muted-foreground", className)} onClick={onClick} {...props}>{children}</div>
}

function InputGroupInput({ className, ...props }: React.ComponentProps<"input">) {
  return <Input data-slot="input-group-control" className={cn("flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0", className)} {...props} />
}

export { InputGroup, InputGroupAddon, InputGroupInput }

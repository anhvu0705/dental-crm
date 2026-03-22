"use client"
import * as React from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = {
  id: string
  title?: string
  description?: React.ReactNode
  action?: React.ReactElement
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

type Action = { type: "ADD_TOAST"; toast: ToasterToast } | { type: "UPDATE_TOAST"; toast: Partial<ToasterToast> } | { type: "DISMISS_TOAST"; toastId?: string } | { type: "REMOVE_TOAST"; toastId?: string }

let count = 0
function genId() { count = (count + 1) % Number.MAX_SAFE_INTEGER; return count.toString() }

const reducer = (state: ToasterToast[], action: Action): ToasterToast[] => {
  switch (action.type) {
    case "ADD_TOAST": return [action.toast, ...state].slice(0, TOAST_LIMIT)
    case "UPDATE_TOAST": return state.map(t => t.id === action.toast.id ? { ...t, ...action.toast } : t)
    case "DISMISS_TOAST": return state.map(t => t.id === action.toastId ? { ...t, open: false } : t)
    case "REMOVE_TOAST": return action.toastId === undefined ? [] : state.filter(t => t.id !== action.toastId)
    default: return state
  }
}

const listeners: Array<(state: ToasterToast[]) => void> = []
let memoryState: ToasterToast[] = []
function dispatch(action: Action) { memoryState = reducer(memoryState, action); listeners.forEach(listener => listener(memoryState)) }

function toast({ ...props }: Omit<ToasterToast, "id">) {
  const id = genId()
  dispatch({ type: "ADD_TOAST", toast: { ...props, id } })
  return { id, dismiss: () => dispatch({ type: "DISMISS_TOAST", toastId: id }), update: (props: Partial<ToasterToast>) => dispatch({ type: "UPDATE_TOAST", toast: { ...props, id } }) }
}

function useToast() {
  const [state, setState] = React.useState<ToasterToast[]>(memoryState)
  React.useEffect(() => { listeners.push(setState); return () => { const index = listeners.indexOf(setState); if (index > -1) { listeners.splice(index, 1) } } }, [])
  return { toasts: state, toast, dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }) }
}

export { useToast, toast }

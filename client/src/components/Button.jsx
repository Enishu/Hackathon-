import { Button } from "@/components/ui/button"
export default ({ children, className, activated = false, handleClick })=> {
    let activatedClassName = "ring-stone-300 bg-stone-200 dark:!bg-slate-500"
    return (
        <Button onClick={handleClick} className={`cursor-pointer shadow-lg transition rounded-lg px-5 py-2 
        text-stone-700 bg-stone-100 hover:bg-stone-200 active:bg-stone-300
        dark:text-stone-200 dark:bg-slate-700 dark:hover:bg-slate-600 dark:active:bg-slate-500 ${activated && activatedClassName} ${className}`}>{children}</Button>
    )
}
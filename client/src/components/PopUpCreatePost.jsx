import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogOverlay,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import CatList from "./CatList"
import { Textarea } from "@/components/ui/textarea"

export default ({children}) => {
    return <>
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogOverlay className="bg-transparent backdrop-blur-sm" />
                <DialogContent className="sm:max-w-[425px] bg-amber-50 shadow-lg
                dark:bg-slate-800">
                    <DialogHeader>
                        <DialogTitle>Proposé une idée</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Text</Label>
                            {/* <Input id="name-1" name="name" /> */}
                            <Textarea id="name-1" name="name" className="h-24"/>
                        </div>
                    </div>
                    <CatList></CatList>
                    <DialogFooter>
                        <Button type="submit" className="cursor-pointer bg-stone-700 hover:bg-stone-600 active:bg-stone-500
                        dark:bg-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-400">Publier</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    </>
}
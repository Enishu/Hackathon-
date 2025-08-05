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

export default ({children}) => {
    return <>
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogOverlay className="bg-transparent backdrop-blur-sm" />
                <DialogContent className="sm:max-w-[425px] text-indigo-50 bg-slate-800">
                    <DialogHeader>
                        <DialogTitle>Proposé une idée</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Text</Label>
                            <Input id="name-1" name="name" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="cursor-pointer bg-indigo-800 hover:bg-indigo-900 active:bg-indigo-950">Publier</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    </>
}
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

export default () => {
    return <>
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Avatar className="fixed cursor-pointer size-16 top-2 md:top-10 right-10 ring-indigo-800 ring-4 hover:scale-110 transition shadow-lg z-10">
                        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                        <AvatarImage src="./src/icons/man.svg" className="-bottom-2 absolute" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DialogTrigger>
                <DialogOverlay className="bg-transparent backdrop-blur-sm" />
                <DialogContent className="sm:max-w-[425px] text-indigo-50 bg-slate-800">
                    <DialogHeader>
                        <DialogTitle>Connection</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Mail</Label>
                            <Input id="name-1" name="name" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Mot de passe</Label>
                            <Input id="username-1" name="username" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="cursor-pointer bg-indigo-800 hover:bg-indigo-900 active:bg-indigo-950">Se connecter</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    </>
}
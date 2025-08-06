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


export default ({ children, postId }) => {
    return <>
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogOverlay className="bg-transparent backdrop-blur-sm" />
                <DialogContent className="sm:max-w-[475px] bg-amber-50 shadow-lg
                dark:bg-slate-800">
                    <DialogHeader>
                        <DialogTitle>Êtes-vous sûr(e) de vouloir supprimer ce post ?</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        {/* <div className="grid gap-3">
                            <Label htmlFor="name-1">Text</Label>
                            <Input id="name-1" name="name" />
                        </div> */}
                    </div>
                    <DialogFooter>
                        <div className="w-full flex justify-center">
                            <Button type="submit" className="cursor-pointer bg-stone-700 hover:bg-stone-600 active:bg-stone-500
                        dark:bg-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-400">OUI Supprimer</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    </>
}
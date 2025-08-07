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
import PopUpRegister from "./PopUpRegister"


export default ({ children }) => {
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
                            <Label htmlFor="username-1" className="flex justify-between">
                                <span>Mot de passe</span>
                                <a hidden href="#" className="text-blue-500">Mot de passe oublier</a>
                            </Label>
                            <Input id="username-1" name="username" />
                        </div>
                    </div>
                    <DialogFooter>

                        <div className="w-full flex flex-wrap sm:flex-nowrap justify-between gap-3">
                            <PopUpRegister>
                                <Button disabled type="" className="cursor-pointer bg-stone-700 hover:bg-stone-600 active:bg-stone-500
                        dark:bg-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-400">Créer un compte</Button>
                            </PopUpRegister>
                            <Button type="submit" className="cursor-pointer bg-stone-700 hover:bg-stone-600 active:bg-stone-500
                        dark:bg-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-400">Se connecter</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    </>
}
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
import { useState } from "react"


export default ({ children }) => {

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const sendLogin = e => {
        e.preventDefault();
        console.log({ mail, password })
    }

    return <>
        <Dialog>
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
                <form onSubmit={sendLogin}>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="mail">Mail</Label>
                            <Input
                                id="mail"
                                name="mail"
                                type="email"
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                                required />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password" className="flex justify-between">
                                <span>Mot de passe</span>
                                <a hidden href="#" className="text-blue-500">Mot de passe oublier</a>
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                        </div>
                    </div>
                    <DialogFooter>
                        <div className="w-full flex flex-wrap sm:flex-nowrap justify-between gap-3 mt-5">
                            {/* <PopUpRegister></PopUpRegister> */}
                            <Button disabled type="" className="cursor-pointer bg-stone-700 hover:bg-stone-600 active:bg-stone-500
                        dark:bg-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-400">Créer un compte</Button>
                            <Button type="submit" className="cursor-pointer bg-stone-700 hover:bg-stone-600 active:bg-stone-500
                        dark:bg-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-400">Se connecter</Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </>
}
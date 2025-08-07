import { LoaderCircle } from "lucide-react";
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
import { request } from "../hooks/request"
import useStore from '../hooks/store';



export default ({ children }) => {

    const [email, setEmail] = useState("hg64off+boiteaidee01@gmail.com");
    const [password, setPassword] = useState("superMotDePasse");

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    const setLoginToken = useStore((state) => state.setLoginToken)
    const setIsLogin = useStore((state) => state.setIsLogin)
    const setUsername = useStore((state) => state.setUsername)
    const isLogin = useStore((state) => state.isLogin)
    const username = useStore((state) => state.username)

    const [openModal, setOpenModal] = useState(false) //modal


    const sendLogin = e => {
        e.preventDefault();
        console.log({ email, password })

        setLoading(true)
        request({ action: "auth", params: { email, password } }).then(res => {
            console.log("RES", res)
            setLoading(false)
            if (!res.error) {
                setData(res.data)

                setIsLogin(true)
                setLoginToken(res.data.token)
                setUsername(res.data.user.username)

                setOpenModal(false)
            } else {
                setError(true)
            }
        })
    }

    const disconnect = () => {
        setOpenModal(false)
        setIsLogin(false)
        setLoginToken("")
        setUsername("")
    }


    return <>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogOverlay className="bg-transparent backdrop-blur-sm" />
            {isLogin ?
                <DialogContent className="flex items-center flex-col
                sm:max-w-[425px] bg-amber-50 shadow-lg
                dark:bg-slate-800">
                    <DialogHeader>
                        <DialogTitle>Connecté</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    {username}
                    <DialogFooter>
                        <Button onClick={disconnect} className="cursor-pointer bg-stone-700 hover:bg-stone-600 active:bg-stone-500
                        dark:bg-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-400">Se déconnecter</Button>
                    </DialogFooter>
                </DialogContent>
                :
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
                                <Label htmlFor="email">Mail</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                        dark:bg-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-400">
                                    {!loading ? "Se connecter" :
                                        <LoaderCircle className="size-full w-20 animate-spin" />
                                    }
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            }
        </Dialog>
    </>
}
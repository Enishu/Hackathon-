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
import { Label } from "@/components/ui/label"
import SelectsCategories from "./SelectsCategories"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { request } from "../hooks/request"

export default ({ children, setRefreshApp }) => {

    const [text, setText] = useState("Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas quibusdam a dolorem tenetur saepe praesentium.");
    const [cat1, setCat1] = useState("1");
    const [cat2, setCat2] = useState("1");

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    const sendPost = e => {
        e.preventDefault();
        setLoading(true)
        request({ action: "addPost", params: { text, categories: [cat1, cat2] } }).then(res => {
            setLoading(false)
            if (!res.error) {
                setData(res.data)
                setRefreshApp()
                // setOpenModal(false)
            } else {
                setError(true)
            }
        })
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
                    <DialogTitle>Proposé une idée</DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={sendPost} className="grid gap-4">
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="text">Text</Label>
                            <Textarea className="h-24"
                                id="text"
                                name="text"
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                required />
                        </div>
                    </div>
                    <SelectsCategories
                        setCat1={setCat1}
                        cat1={cat1}
                        setCat2={setCat2}
                        cat2={cat2} />
                    <DialogFooter>
                        <Button type="submit" className="cursor-pointer bg-stone-700 hover:bg-stone-600 active:bg-stone-500
                        dark:bg-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-400">Publier</Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog >
    </>
}
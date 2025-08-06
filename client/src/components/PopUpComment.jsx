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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"


export default ({ children, postId }) => {

    let comments = [
        {
            "commentId": 1,
            "targetId": 3,
            "author": "Julie M.",
            "text": "Très bonne initiative, surtout pour les personnes âgées qui utilisent les transports chaque jour.",
            "date": 1651459600
        },
        {
            "commentId": 2,
            "targetId": 3,
            "author": "Samir N.",
            "text": "N'oubliez pas l'importance des annonces visuelles pour les personnes malentendantes.",
            "date": 1651546000
        },
        {
            "commentId": 3,
            "targetId": 3,
            "author": "Chloé R.",
            "text": "J’aurais adoré avoir ce genre d’ateliers à l’école. Très bonne idée !",
            "date": 1651622400
        },
        {
            "commentId": 4,
            "targetId": 3,
            "author": "Ahmed Z.",
            "text": "La téléconsultation est un vrai plus, surtout en zone rurale.",
            "date": 1651708800
        },
        {
            "commentId": 5,
            "targetId": 3,
            "author": "Sophie V.",
            "text": "Il faudrait aussi former les enseignants à l’usage du matériel adapté.",
            "date": 1651795200
        }
    ]

    return <>
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogOverlay className="bg-transparent backdrop-blur-sm" />
                <DialogContent className="flex flex-col p-0 sm:max-w-2xl max-h-96 bg-amber-50 shadow-lg
                dark:bg-slate-800">

                    {/* <DialogHeader className="p-5">
                        <DialogTitle>Commentaires du post: {postId}</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader> */}
                    <ScrollArea className="w-full h-96 m-0">
                        <div className="grid grid-cols-1 gap-6 p-3 sm:p-10">
                            {
                                comments.sort((a, b) => a.date - b.date)
                                    .map(item => <Card key={item.commentId}>{item.text}</Card>)
                            }
                        </div>
                        <div className="grid gap-4 mb-10 px-10 pt-2">
                            <div className="grid gap-3">
                                <Label htmlFor="name-1">Publier un commentaire</Label>
                                {/* <Input id="name-1" name="name" /> */}
                                <Textarea id="name-1" name="name" />
                            </div>
                            <Button type="submit" className="cursor-pointer bg-stone-700 hover:bg-stone-600 active:bg-stone-500
                        dark:bg-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-400">Publier</Button>
                        </div>
                    </ScrollArea>
                    <DialogFooter>
                        {/* <Button type="submit" className="cursor-pointer bg-indigo-800 hover:bg-indigo-900 active:bg-indigo-950">Publier</Button> */}
                    </DialogFooter>

                </DialogContent>
            </form>
        </Dialog>
    </>
}

function Card({ children }) {
    return (
        <div className="p-3 rounded-2xl shadow-lg bg-stone-100 hover:scale-105 transition
        dark:bg-slate-700">
            {children}
        </div>
    )
}
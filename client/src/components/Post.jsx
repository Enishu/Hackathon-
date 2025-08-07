import { LoaderCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import PopUpComment from "./PopUpComment"
import PopUpConfirmDelete from "./PopUpConfirmDelete"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import { request } from "../hooks/request"
import useStore from '../hooks/store';


export default ({ text, postId, likesCount: likesCountInit, commentsCount, updated_at, enableSkeleton = false, author = "" }) => {

    const [likesCount, setLikesCount] = useState(likesCountInit)

    const username = useStore((state) => state.username)
    const [liked, setLiked] = useState(false)
    useEffect(() => {
        //setLiked(author == username)
        //fetch likeByUsername
    }, [author]);

    const [loading, setLoading] = useState(false)
    const toggleLike = () => {
        setLoading(true)
        request({ action: "setLike", params: { postId, like: !liked } }).then(res => {
            setLoading(false)
            if (!res.error) {
                let newLikesCount = !liked ? likesCount + 1 : likesCount - 1
                setLikesCount(newLikesCount)

                setLiked(!liked)
            } else {
                if (String(res.error) == "Error: Erreur du serveur : Vous avez déjà aimé cette idee")
                    setLiked(true)
            }
        })
        //fetch (!liked)
    }

    return (<>{enableSkeleton ?
        <Skeleton className="relative p-3 rounded-2xl shadow-lg hover:scale-105 transition
            bg-stone-100
            dark:bg-slate-700
            " >
            <div className="flex gap-2.5 flex-col">
                <Skeleton className="h-2.5 w-4/5 bg-stone-200 dark:bg-slate-600" />
                <Skeleton className="h-2.5 w-2/5 bg-stone-200 dark:bg-slate-600" />
                <Skeleton className="h-2.5 w-3/5 bg-stone-200 dark:bg-slate-600" />
            </div>
        </Skeleton>
        :
        <div className="relative p-3 rounded-2xl shadow-lg hover:scale-105 transition
            bg-stone-100
            dark:bg-slate-700">
            <div className="absolute -bottom-6 -right-5 flex gap-2">

                <PopUpComment postId={postId}>
                    <BtnCircle src="./src/icons/comments.svg" badge={true} badgeCount={commentsCount} />
                </PopUpComment>

                <BtnCircle src="./src/icons/thumb-up.svg" badge={true} badgeCount={likesCount} activated={liked} like={toggleLike} isLoading={loading} />

                <PopUpConfirmDelete>
                    <BtnCircle src="./src/icons/trashcan.svg" />
                </PopUpConfirmDelete>

            </div>
            <p>{text}</p>
            {/* <p>{updated_at}</p> */}
        </div>
    }</>)
}
function BtnCircle({ src, badge = false, badgeCount, activated = false, like, isLoading, ...props }) {
    return (<>
        <button {...props} onClick={like} className={`relative size-10 cursor-pointer rounded-full flex justify-center items-center shadow-lg ring-1
            ${activated ? "bg-stone-300" : "bg-stone-100"} hover:bg-stone-200 ring-stone-200 
            ${activated ? "dark:bg-slate-500" : "dark:bg-slate-700"} dark:hover:bg-slate-600 dark:ring-slate-600`}>
            {isLoading ? <LoaderCircle className="size-full animate-spin p-1" /> :
                <img className="size-6 inline" src={src} alt="" />
            }
            {badge &&
                <Badge className="absolute -bottom-2 -left-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums
                    bg-stone-100 text-stone-700
                    dark:bg-slate-700 dark:text-stone-200">
                    {badgeCount}
                </Badge>
            }
        </button>
    </>)
}
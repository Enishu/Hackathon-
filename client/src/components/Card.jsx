import PopUpComment from "./PopUpComment"
import { Badge } from "@/components/ui/badge"
import PopUpConfirmDelete from "./PopUpConfirmDelete"

export default ({ text, postId, likeNumber, commentNumber, }) => {
    return (
        <div className="relative p-3 rounded-2xl shadow-lg bg-stone-100 hover:scale-105 transition
                    dark:bg-slate-700">
            {/* <div className="absolute -top-8 -left-6 flex gap-1">
                <div class="size-12 bg-stone-700 rounded-full flex justify-center items-center">
                    <img className="size-7 inline" src="./src/icons/book.svg" alt="" />
                </div>
                <div class="size-12 bg-stone-700 rounded-full flex justify-center items-center">
                    <img className="size-7 inline" src="./src/icons/compass.svg" alt="" />
                </div>
            </div> */}
            <div className="absolute -bottom-6 -right-5 flex gap-2">
                <PopUpComment postId={postId}>
                    <div className="relative size-10 cursor-pointer bg-stone-100 shadow-lg ring-1 hover:bg-stone-200 ring-stone-200 rounded-full flex justify-center items-center
                    dark:bg-slate-700 dark:hover:bg-slate-600 dark:ring-slate-600">
                        <img className="size-6 inline" src="./src/icons/comments.svg" alt="" />
                        <Badge className="absolute -bottom-2 -left-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums bg-stone-100 text-stone-700 dark:text-stone-200 dark:bg-slate-700">{commentNumber}</Badge>
                    </div>
                </PopUpComment>
                <div className="relative size-10 cursor-pointer bg-stone-100 shadow-lg ring-1 hover:bg-stone-200 ring-stone-200  rounded-full flex justify-center items-center
                    dark:bg-slate-700 dark:hover:bg-slate-600 dark:ring-slate-600">
                    <img className="size-6 inline" src="./src/icons/thumb-up.svg" alt="" />
                    <Badge className="absolute -bottom-2 -left-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums bg-stone-100 text-stone-700 dark:text-stone-200 dark:bg-slate-700">{likeNumber}</Badge>
                </div>
                <PopUpConfirmDelete>
                    <div className="relative size-10 cursor-pointer bg-stone-100 shadow-lg ring-1 hover:bg-stone-200 ring-stone-200  rounded-full flex justify-center items-center
                    dark:bg-slate-700 dark:hover:bg-slate-600 dark:ring-slate-600">
                        <img className="size-6 inline" src="./src/icons/trashcan.svg" alt="" />
                    </div>
                </PopUpConfirmDelete>
            </div>
            <p>{text}</p>
        </div>
    )
}
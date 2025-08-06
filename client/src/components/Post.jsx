import { Badge } from "@/components/ui/badge"
import PopUpComment from "./PopUpComment"
import PopUpConfirmDelete from "./PopUpConfirmDelete"

export default ({ text, postId, likesCount, commentsCount }) => {
    return (
        <div className="relative p-3 rounded-2xl shadow-lg hover:scale-105 transition
            bg-stone-100
            dark:bg-slate-700">
            <div className="absolute -bottom-6 -right-5 flex gap-2">

                <PopUpComment postId={postId}>
                    <BtnCircle src="./src/icons/comments.svg" badge={true} badgeCount={commentsCount} />
                </PopUpComment>

                <BtnCircle src="./src/icons/thumb-up.svg" badge={true} badgeCount={likesCount}  activated={false}/>

                <PopUpConfirmDelete>
                    <BtnCircle src="./src/icons/trashcan.svg"/>
                </PopUpConfirmDelete>

            </div>
            <p>{text}</p>
        </div>
    )
}

function BtnCircle({ src, badge = false, badgeCount = 0, activated = false, ...props }) {
    return (<>
        <div {...props} className={`relative size-10 cursor-pointer rounded-full flex justify-center items-center shadow-lg ring-1
            ${activated ? "bg-stone-200" : "bg-stone-100"} hover:bg-stone-200 ring-stone-200 
            ${activated ? "dark:bg-slate-600" : "dark:bg-slate-700"} dark:hover:bg-slate-600 dark:ring-slate-600`}>
            <img className="size-6 inline" src={src} alt="" />
            {badge &&
                <Badge className="absolute -bottom-2 -left-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums
                    bg-stone-100 text-stone-700
                    dark:bg-slate-700 dark:text-stone-200">
                    {badgeCount}
                </Badge>
            }
        </div>
    </>)
}
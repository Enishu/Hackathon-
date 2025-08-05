import PopUpComment from "./PopUpComment"

export default ({ text, postId }) => {
    return (
        <div class="relative p-3 rounded-2xl shadow-lg bg-stone-100 hover:scale-105 transition
                    dark:bg-slate-700">
            {/* <div className="absolute -top-8 -left-6 flex gap-1">
                <div class="size-12 bg-stone-700 rounded-full flex justify-center items-center">
                    <img className="size-7 inline" src="./src/icons/book.svg" alt="" />
                </div>
                <div class="size-12 bg-stone-700 rounded-full flex justify-center items-center">
                    <img className="size-7 inline" src="./src/icons/compass.svg" alt="" />
                </div>
            </div> */}
            <div className="absolute -bottom-8 -right-6 flex gap-1">
                <PopUpComment postId={postId}>
                    <div class="size-12 cursor-pointer bg-stone-100 shadow-lg ring-1 hover:bg-stone-200 ring-stone-200 rounded-full flex justify-center items-center
                    dark:bg-slate-700 dark:hover:bg-slate-600 dark:ring-slate-600">
                        <img className="size-7 inline" src="./src/icons/comments.svg" alt="" />
                    </div>
                </PopUpComment>
                <div class="size-12 cursor-pointer bg-stone-100 shadow-lg ring-1 hover:bg-stone-200 ring-stone-200  rounded-full flex justify-center items-center
                    dark:bg-slate-700 dark:hover:bg-slate-600 dark:ring-slate-600">
                    <img className="size-7 inline" src="./src/icons/thumb-up.svg" alt="" />
                </div>
                <div class="size-12 cursor-pointer bg-stone-100 shadow-lg ring-1 hover:bg-stone-200 ring-stone-200  rounded-full flex justify-center items-center
                    dark:bg-slate-700 dark:hover:bg-slate-600 dark:ring-slate-600">
                    <img className="size-7 inline" src="./src/icons/trashcan.svg" alt="" />
                </div>
            </div>
            <p>{text}</p>
        </div>
    )
}
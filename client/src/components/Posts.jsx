import Card from "./Card"
import { Button } from "@/components/ui/button"
export default ({ posts }) => {
    return (<>

        <div className="flex flex-wrap justify-center gap-4 mt-3">
            <Btn activated={true}>Afficher les plus récents</Btn>
            <Btn activated={false}>Afficher les mieux notés</Btn>
        </div>

        <div className="grid grid-cols-1 gap-12 px-3 sm:px-32 mt-16">
            {
                posts.sort((a, b) => a.date - b.date)
                    .map(item => <Card key={item.id} postId={item.id} likeNumber={item.likeNumber} commentNumber={item.commentNumber} text={item.text}></Card>)
            }
        </div>
    </>
    )
}

function Btn({ children, activated }) {
    let className = "ring-stone-300 ring-4 dark:ring-slate-500"
    return (
        <Button className={`cursor-pointer shadow-lg transition rounded-lg px-5 py-2 
        text-stone-700 bg-stone-100 hover:bg-stone-200 active:bg-stone-300
        dark:text-stone-200 dark:bg-slate-700 dark:hover:bg-slate-600 dark:active:bg-slate-500 ${activated && className}`}>{children}</Button>
    )
}
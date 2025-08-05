import { Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import PopUpLogin from './components/PopUpLogin'
import Cards from './components/Cards'
import CatList from './components/CatList'
import Pagination from './components/Pagination'
import Tag from "./components/Tag"
import Card from "./components/Card"
import PopUpCreatePost from "./components/PopUpCreatePost"

export default () => {
    let posts = [
        { id: 1, text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque quos in quia praesentium. Ea voluptatibus soluta dolorem quos officiis. Et accusamus unde placeat non. Totam, sapiente praesentium! Adipisci, aliquid esse." },
        { id: 2, text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque quos in quia praesentium. Ea voluptatibus soluta dolorem quos officiis. Et accusamus unde placeat non. Totam, sapiente praesentium! Adipisci, aliquid esse." },
        { id: 3, text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque quos in quia praesentium. Ea voluptatibus soluta dolorem quos officiis. Et accusamus unde placeat non. Totam, sapiente praesentium! Adipisci, aliquid esse." },
    ]
    return (<>
        {/* <div className="py-10 h-full bg-gradient-to-bl from-purple-700 to-blue-700 text-blue-50 dark: bg-slate-900"> */}
        {/* <div className="py-10 h-full bg-stone-100 text-blue-50"> */}
        {/* <div className="py-10 h-full bg-slate-300 text-blue-50 dark:bg-slate-900"> */}
        <div className="py-10 h-full">
            <div className="mx-auto w-full max-w-4xl px-4">

                <PopUpLogin />
                <div className="mt-10">

                    {/* combobox: https://ui.shadcn.com/docs/components/combobox */}

                    {/* tags */}
                    <div className="grid md:grid-cols-1 gap-3">
                        <div className="flex justify-center gap-3 flex-wrap">
                            <Tag text="Éducation" img="./src/icons/book.svg"></Tag>
                            <Tag text="Mobilité" img="./src/icons/car.svg"></Tag>
                            <Tag text="Santé" img="./src/icons/heart.svg"></Tag>
                            <Tag text="Urbanisme" img="./src/icons/building.svg"></Tag>
                            <Tag text="Autres" img="./src/icons/compass.svg"></Tag>
                        </div>
                        <div className="flex justify-center gap-3 flex-wrap">
                            <Tag text="Cognitif" img="./src/icons/cog.svg"></Tag>
                            <Tag text="Visuel" img="./src/icons/eye.svg"></Tag>
                            <Tag text="Auditif" img="./src/icons/headphones.svg"></Tag>
                            <Tag text="Moteur" img="./src/icons/basketball.svg"></Tag>
                        </div>
                    </div>

                    {/* <Cards /> */}

                    <div className="grid grid-cols-1 gap-12 px-5 sm:px-32 mt-20">
                        {posts.map(item => <Card key={item.id} postId={item.id} text={item.text}></Card>)}
                    </div>
                    {/* 
                    <div className="my-10">
                        <CatList />
                        <Pagination/>
                    </div> */}

                    <div className="flex justify-center mt-20">
                        <PopUpCreatePost>
                            <img className="cursor-pointer size-24 transition hover:scale-110" src="./src/icons/pencil.svg" alt="" style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }} />
                        </PopUpCreatePost>
                    </div>

                </div>
            </div>
        </div>
    </>)
}
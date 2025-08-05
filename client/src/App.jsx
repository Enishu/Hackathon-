import { Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import PopUpLogin from './components/PopUpLogin'
import Cards from './components/Cards'
import CatList from './components/CatList'
import Pagination from './components/Pagination'
import Tag from "./components/Tag"
import Card from "./components/Card"
import PopUpCreatePost from "./components/PopUpCreatePost"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"


export default () => {

    const [darkMode, setDarkMode] = useState(true)
    const toggleDarkMode = () => {
        const isDark = !darkMode
        setDarkMode(isDark)

        if (isDark) {
            document.documentElement.classList.add('dark')
            // localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            // localStorage.setItem('theme', 'light')
        }
    }

    let posts = [
        { id: 1, date: 3, text: "1Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque quos in quia praesentium. Ea voluptatibus soluta dolorem quos officiis. Et accusamus unde placeat non. Totam, sapiente praesentium! Adipisci, aliquid esse." },
        { id: 2, date: 2, text: "2Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque quos in quia praesentium. Ea voluptatibus soluta dolorem quos officiis. Et accusamus unde placeat non. Totam, sapiente praesentium! Adipisci, aliquid esse." },
        { id: 3, date: 1, text: "3Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque quos in quia praesentium. Ea voluptatibus soluta dolorem quos officiis. Et accusamus unde placeat non. Totam, sapiente praesentium! Adipisci, aliquid esse." },
        { id: 4, date: 1, text: "3Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque quos in quia praesentium. Ea voluptatibus soluta dolorem quos officiis. Et accusamus unde placeat non. Totam, sapiente praesentium! Adipisci, aliquid esse." },
        { id: 5, date: 1, text: "3Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque quos in quia praesentium. Ea voluptatibus soluta dolorem quos officiis. Et accusamus unde placeat non. Totam, sapiente praesentium! Adipisci, aliquid esse." },
        { id: 6, date: 1, text: "3Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque quos in quia praesentium. Ea voluptatibus soluta dolorem quos officiis. Et accusamus unde placeat non. Totam, sapiente praesentium! Adipisci, aliquid esse." },
        { id: 7, date: 1, text: "3Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque quos in quia praesentium. Ea voluptatibus soluta dolorem quos officiis. Et accusamus unde placeat non. Totam, sapiente praesentium! Adipisci, aliquid esse." },
        { id: 8, date: 1, text: "3Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque quos in quia praesentium. Ea voluptatibus soluta dolorem quos officiis. Et accusamus unde placeat non. Totam, sapiente praesentium! Adipisci, aliquid esse." },
    ]
    return (<>
        {/* <div className="py-10 h-full bg-gradient-to-bl from-purple-700 to-blue-700 text-blue-50 dark: bg-slate-900"> */}
        {/* <div className="py-10 h-full bg-stone-100 text-blue-50"> */}
        {/* <div className="py-10 h-full bg-slate-300 text-blue-50 dark:bg-slate-900"> */}
        <div className="py-10 h-full">
            <div className="mx-auto w-full max-w-4xl px-4">

                {/* <PopUpLogin>
                    <Avatar className="fixed cursor-pointer size-16 top-2 md:top-10 right-10 ring-stone-800 ring-4 hover:scale-110 transition shadow-lg z-10">
                        <AvatarImage src="./src/icons/man.svg" className="-bottom-2 absolute" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </PopUpLogin> */}

                {/* menu login, theme, add post */}
                <div className="fixed flex justify-center gap-3 z-10
                                pt-5 pb-2 right-0 top-0 w-full
                                lg:pt-0 lg:w-auto lg:top-8 lg:right-8 lg:flex-col">
                    <div className="backdrop-blur-sm absolute w-full h-full inset-0 -z-10"></div> 
                    <div className="grid grid-cols-1 justify-items-center gap-1">
                        <PopUpLogin>
                            <div className="p-3 cursor-pointer size-14 hover:bg-stone-200 active:bg-stone-300 transition bg-stone-100 rounded-full shadow-lg
                            dark:bg-slate-700 dark:hover:bg-slate-600">
                                <img className="object-contain" src="./src/icons/man.svg" alt="" />
                            </div>
                        </PopUpLogin>
                        <Badge className="bg-stone-100 shadow-lg text-stone-700
                        dark:bg-slate-700 dark:text-stone-200">Se connecter</Badge>
                    </div>
                    <div className="grid grid-cols-1 justify-items-center gap-1">
                        <div className="p-3 cursor-pointer size-14 hover:bg-stone-200 active:bg-stone-300 transition bg-stone-100 rounded-full shadow-lg
                        dark:bg-slate-700 dark:hover:bg-slate-600"
                        onClick={toggleDarkMode} >
                            <img className="object-contain text-red-500" src="./src/icons/sun.svg" alt="" />
                        </div>
                        <Badge className="bg-stone-100 shadow-lg text-stone-700
                        dark:bg-slate-700 dark:text-stone-200">Thème {darkMode ? "sombre" : "clair"}</Badge>
                    </div>
                    <div className="grid grid-cols-1 justify-items-center gap-1">
                        <PopUpCreatePost>
                            <div className="p-3 cursor-pointer size-14 hover:bg-stone-200 active:bg-stone-300 transition bg-stone-100 rounded-full  shadow-lg
                            dark:bg-slate-700 dark:hover:bg-slate-600">
                                <img className="object-contain" src="./src/icons/pencil.svg" alt="" />
                            </div>
                        </PopUpCreatePost>
                        <Badge className="bg-stone-100 shadow-lg text-stone-700
                        dark:bg-slate-700 dark:text-stone-200">Poster une idée</Badge>
                    </div>
                </div>



                <div className="mt-24 lg:mt-10">

                    {/* combobox: https://ui.shadcn.com/docs/components/combobox */}

                    {/* tags */}
                    <div className="grid md:grid-cols-1 gap-3">
                        <div className="flex justify-center gap-3 flex-wrap">
                            <Tag text="Éducation" img="./src/icons/book.svg"></Tag>
                            <Tag text="Mobilité" img="./src/icons/car.svg" className="ring-stone-300 ring-5 dark:ring-slate-500"></Tag>
                            <Tag text="Santé" img="./src/icons/heart.svg"></Tag>
                            <Tag text="Urbanisme" img="./src/icons/building.svg"></Tag>
                            <Tag text="Autres" img="./src/icons/compass.svg"></Tag>
                        </div>
                        <div className="flex justify-center gap-3 flex-wrap">
                            <Tag text="Cognitif" img="./src/icons/cog.svg"></Tag>
                            <Tag text="Visuel" img="./src/icons/eye.svg"></Tag>
                            <Tag text="Auditif" img="./src/icons/headphones.svg" className="ring-stone-300 ring-5 dark:ring-slate-500"></Tag>
                            <Tag text="Moteur" img="./src/icons/basketball.svg"></Tag>
                        </div>
                    </div>

                    {/* <Cards /> */}

                    <div className="grid grid-cols-1 gap-12 px-5 sm:px-32 mt-16">
                        {
                            posts.sort((a, b) => a.date - b.date)
                                .map(item => <Card key={item.id} postId={item.id} text={item.text}></Card>)
                        }
                    </div>
                    {/* 
                    <div className="my-10">
                        <CatList />
                        <Pagination/>
                    </div> */}

                    {/* <div className="flex justify-center mt-20">
                        <PopUpCreatePost>
                            <img className="cursor-pointer size-24 transition hover:scale-110" src="./src/icons/pencil.svg" alt="" style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }} />
                        </PopUpCreatePost>
                    </div> */}

                    <div className="my-20"></div>

                </div>
            </div>
        </div>
    </>)
}
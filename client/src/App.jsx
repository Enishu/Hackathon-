import PopUpLogin from './components/PopUpLogin'
import PopUpCreatePost from "./components/PopUpCreatePost"
import Category from "./components/Category"
import Posts from "./components/Posts"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"
import { useFetch } from './hooks/useFetch'

export default () => {

    const [categorySelected, setCategorySelected] = useState({
        education: false,
        mobilite: false,
        sante: false,
        urbanisme: false,
        autres: false,
        cognitif: false,
        visuel: false,
        auditif: false,
        moteur: false,
    })
    const toggleCategorySelected = newValue => setCategorySelected({ ...categorySelected, ...newValue })

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
    // const isDarkEnabled = import.meta.env.VITE_DARK_MODE === "true";
    // useEffect(() => {
    //     if (isDarkEnabled) toggleDarkMode()
    // }, []);

    return (
        <div className="py-10 h-full">
            <div className="mx-auto w-full max-w-4xl px-4">

                {/* message d'erreur */}
                {/* <Button
                    variant="outline"
                    onClick={() =>
                        toast.error("Error: Cette adresse mail existe déjà.")
                    }
                >
                    Show Toast
                </Button> */}

                {/* menu login, theme, addPost */}
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
                            <img className="object-contain" src="./src/icons/sun.svg" alt="" />
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
                    {/* <MenuItem src="./src/icons/pencil.svg" text="Poster une idée"/> */}

                </div>


                <div className="mt-24 lg:mt-10">

                    {/* Categories Filters */}
                    <div className="grid md:grid-cols-1 gap-3">
                        <div className="flex justify-center gap-3 flex-wrap">
                            <Category
                                text="Éducation"
                                img="./src/icons/book.svg"
                                activated={categorySelected.education}
                                handleClick={() => toggleCategorySelected({ education: !categorySelected.education })} />
                            <Category
                                text="Mobilité"
                                img="./src/icons/car.svg"
                                activated={categorySelected.mobilite}
                                handleClick={() => toggleCategorySelected({ mobilite: !categorySelected.mobilite })} />
                            <Category
                                text="Santé"
                                img="./src/icons/heart.svg"
                                activated={categorySelected.sante}
                                handleClick={() => toggleCategorySelected({ sante: !categorySelected.sante })} />
                            <Category
                                text="Urbanisme"
                                img="./src/icons/building.svg"
                                activated={categorySelected.urbanisme}
                                handleClick={() => toggleCategorySelected({ urbanisme: !categorySelected.urbanisme })} />
                            <Category
                                text="Autres"
                                img="./src/icons/compass.svg"
                                activated={categorySelected.autres}
                                handleClick={() => toggleCategorySelected({ autres: !categorySelected.autres })} />
                        </div>
                        <div className="flex justify-center gap-3 flex-wrap">
                            <Category
                                text="Cognitif"
                                img="./src/icons/cog.svg"
                                activated={categorySelected.cognitif}
                                handleClick={() => toggleCategorySelected({ cognitif: !categorySelected.cognitif })} />
                            <Category
                                text="Visuel"
                                img="./src/icons/eye.svg"
                                activated={categorySelected.visuel}
                                handleClick={() => toggleCategorySelected({ visuel: !categorySelected.visuel })} />
                            <Category
                                text="Auditif"
                                img="./src/icons/headphones.svg"
                                activated={categorySelected.auditif}
                                handleClick={() => toggleCategorySelected({ auditif: !categorySelected.auditif })} />
                            <Category
                                text="Moteur"
                                img="./src/icons/basketball.svg"
                                activated={categorySelected.moteur}
                                handleClick={() => toggleCategorySelected({ moteur: !categorySelected.moteur })} />
                        </div>
                    </div>

                    {/* Ideas */}
                    <Posts
                        filters={Object.entries(categorySelected)
                            .filter(item => item[1])
                            .map(item => item[0])}
                        className="mb-20" />

                    {/* Messages d'erreurs */}
                    {/* text-stone-700 bg-stone-100 dark:text-stone-200 dark:bg-slate-700 */}
                    <Toaster
                        toastOptions={{
                            classNames: {
                                toast: '!text-red-700 !bg-stone-100 dark:!text-red-200 dark:!bg-slate-700',
                            },
                        }}
                    />

                </div>

            </div>
        </div>)
}
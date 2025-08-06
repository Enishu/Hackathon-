import Button from "./Button"
import Post from "./Post"
import { useState } from "react"
import { useFetch } from '../hooks/useFetch'

export default ({ className }) => {
    const [toggleSortFilters, setToggleSortFilters] = useState(true)
    const { loading, data: posts, errors } = useFetch({ action: "getPosts", params: { range: [10 - 20] } })
    console.log(loading)

    return (<>
        <div className="flex flex-wrap justify-center gap-4 mt-3">
            <Button
                activated={toggleSortFilters}
                handleClick={() => setToggleSortFilters(true)}>
                Afficher les plus récents
            </Button>
            <Button
                activated={!toggleSortFilters}
                handleClick={() => setToggleSortFilters(false)}>
                Afficher les mieux notés
            </Button>
        </div>

        <div className={`grid grid-cols-1 gap-12 px-3 sm:px-32 mt-16 ${className}`}>
            {loading ?
                Array.from({ length: 7 }).map((_, index) => (
                    <Post key={index} enableSkeleton={loading}></Post>
                ))
                :
                posts.sort((a, b) => a.date - b.date)
                    .map(item => <Post key={item.id} postId={item.id} likesCount={item.likeNumber} commentsCount={item.commentNumber} text={item.text}></Post>)
            }
        </div>
    </>)
}
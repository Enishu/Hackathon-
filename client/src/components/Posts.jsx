import Button from "./Button"
import Post from "./Post"
import { useState, useMemo, useEffect } from "react"
import { useFetch } from '../hooks/useFetch'
import { request } from "../hooks/request"

export default ({ className, filters }) => {
    // console.log("Posts clg", filters)

    const [toggleSortFilters, setToggleSortFilters] = useState(true)

    // const fetchParams = {
    //         action: "getPosts",
    //         params: { range: [10 - 20] },
    //         filters
    //     }
    // const { loading, data: posts, errors } = useFetch(fetchParams)

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const posts = data

    const fetchParams = {
        action: "getPosts",
        //params: { range: [10 - 20] },
        filters
    }

    useEffect(() => {
        setLoading(true)
        request({ action: "getPosts", params: fetchParams }).then(res => {
            setLoading(false)
            if (!res.error) {
                setData(res.data)
            } else {
                setError(true)
            }
        })
    }, [filters]);

    let sortedPosts = toggleSortFilters ? posts.sort((a, b) => b.date - a.date) : posts.sort((a, b) => b.likeNumber - a.likeNumber)

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
                error ?
                <div className="flex justify-center mt-14">
                    <img className="size-32 inline" src="./src/icons/error.svg" alt="" />
                </div>
                :
                sortedPosts.map(item => <Post key={item.id} postId={item.id} likesCount={item.likeNumber} commentsCount={item.commentNumber} text={item.text} author={item.author}></Post>)
            }
        </div>
    </>)
}
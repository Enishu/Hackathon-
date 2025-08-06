//const {data, loading, errors} = useFetch('http://monapi')

import { useEffect, useState } from "react";
import { toast } from "sonner"

//MOCK
import posts from './mocks/getPosts.json';


export function useFetch({ action, params }) {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [errors, setErrors] = useState(null)

    function mock(action) { //MOCK
        if (action == "getPosts")
            setData(posts)
        if (action) {
            setLoading(false)
            return true
        }
        return false
    }

    function wait() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("wait");
            }, 3000);
        });
    }


    //adaptateur
    let route = "/"
        if (action == "getPosts")
            route = "/"
    const options = {}

    const domain = "https://api.jeremiel.dev"
    const url = domain + route

    useEffect(() => {
        wait().then((wait) => {
            console.log(wait);
            if (!mock(action)) { //MOCK
                fetch(url, {
                    ...options,
                    headers: {
                        'Accept': 'application/json; charset=UTF-8',
                        ...options.headers
                    }
                }).then(r => r.json()).then(data => {
                    setData(data)
                }).catch((e) => {
                    setErrors(e)
                    toast.error(e.message)
                }).finally(() => {
                    setLoading(false)
                })

            }
        });
    }, []);

    return { loading, data, errors }
}


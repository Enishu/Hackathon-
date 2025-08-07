//const {data, loading, errors} = useFetch('http://monapi')

import { toast } from "sonner"

//MOCK
import posts from './mocks/getPosts.json';


export function request({ action, params }) {
    return new Promise((resolve, reject) => {
        // console.log("FETCH clg", params.filters)

        //MOCK
        function mock(action) {
            if (action == "getPosts")
                return({ loading: false, data: posts, error: null, params })
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
        let reqType = "GET"
        if (action == "getPosts") {
            route = "/"
            reqType = "GET"
        }

        const domain = "https://api.jeremiel.de"
        const url = domain + route

        wait().then((wait) => {
            // console.log(wait);
            let m = mock(action) //MOCK
            if (m) {
                resolve(m)
            } else {
                let data = []
                let error = null
                let loading = true
                fetch(url, {
                    headers: {
                        'Accept': 'application/json; charset=UTF-8',
                    }
                }).then(r => r.json()).then(r2 => {
                    data = r2
                    //if data container error: return error
                }).catch((e) => {
                    error = e
                    toast.error(e.message)
                }).finally(() => {
                    loading = false
                    resolve({ loading, data, error })
                })
            }
        });

        
    });
}


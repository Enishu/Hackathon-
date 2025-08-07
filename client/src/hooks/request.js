//const {data, loading, errors} = useFetch('http://monapi')

import { toast } from "sonner"

//MOCK
import posts from './mocks/getPosts.json';
import useStore from '../hooks/store';


export function request({ action, params }) {
    return new Promise((resolve, reject) => {

        //MOCK
        function mock(action) {
            if (action == "getPosts2")
                return ({ loading: false, data: posts, error: null, params })
            return false
        }

        function wait() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve("wait");
                }, 1000);
            });
        }

        // const token = useStore((state) => state.token)
        const { loginToken } = useStore.getState()

        //adaptateur
        let route = "/"
        let method = "GET"
        let headers = {}
        let body = {}

        if (action == "getPosts") {
            route = "/ideas "
            method = "GET"
        }
        if (action == "auth") {
            route = "/auth/login"
            method = "POST"
        }
        if (action == "addPost") {
            route = "/ideas"
            method = "POST"
        }
        if (action == "setLike") {
            route = `/ideas/${params.postId}/likes`
            params.like ? method = "POST" : method = "DELETE"
        }

        if (method == "POST" || method == "DELETE") {
            headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loginToken}`
            }
            body = JSON.stringify(params)
        }

        const domain = "http://localhost:3002/api"
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

                let payload = {}
                if (method == "GET") {
                    payload = {
                        method,
                        headers,
                    }
                } else {
                    payload = {
                        method,
                        headers,
                        body
                    }
                }

                fetch(url, payload).then(r => r.json()).then(r2 => {
                    data = r2
                    if (data.error)
                        throw new Error(`Erreur du serveur : ${data.error}`);
                    if (data.success == false) //PATCH TEMPORAIRE
                        throw new Error(`Erreur du serveur : ${data.message}`);
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


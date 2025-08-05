import { LoaderCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"


export default () => {

    const [datas, setDatas] = useState([])
    useEffect(() => {
        async function fetchData(){
            let res = await fetch('https://pokebuildapi.fr/api/v1/random/team').then(req => req.json())
            setDatas(res)
        }
        fetchData()
    }, [])

    return (<>
        <div>
            {datas.length ? 
                datas.map(el=> (
                                <motion.div
                                    key={el.id}
                                    initial={{x:100}}
                                    animate={{x:0}}
                                >{el.name}</motion.div>)
                            ): 
                <LoaderCircle className="animate-spin w-12 h-12"/>}
        </div>
    </>
    )
}
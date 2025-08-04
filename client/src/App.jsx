import Login from './components/Login'
import Cards from './components/Cards'
import { Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default () => {
    return (<>
        <div className="mx-32">
            <Login />
            <Badge className="bg-blue-500 text-white dark:bg-blue-600">Visuel<Eye /></Badge>
            <Cards />
        </div>
    </>)
}
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default () => {
    return (<>
        <div className="flex gap-5 flex-wrap sm:flex-nowrap justify-center">

            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Categories" />
                </SelectTrigger>
                <SelectContent>
                    {/* <SelectItem value="1">Éducation <Checkbox /></SelectItem> */}
                    <SelectItem value="1">Éducation</SelectItem>
                    <SelectItem value="2">Mobilité</SelectItem>
                    <SelectItem value="3">Santé</SelectItem>
                    <SelectItem value="4">Urbanisme</SelectItem>
                    <SelectItem value="5">Autres</SelectItem>
                </SelectContent>
            </Select>

            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Handicap" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">Cognitif</SelectItem>
                    <SelectItem value="2">Visuel</SelectItem>
                    <SelectItem value="3">Auditif</SelectItem>
                    <SelectItem value="4">Moteur</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </>
    )
}
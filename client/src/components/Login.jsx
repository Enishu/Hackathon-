import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogOverlay,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default () => {
    return <>
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Profile</Button>
                </DialogTrigger>
                <DialogOverlay className="bg-transparent backdrop-blur-sm" />
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Connection</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Mail</Label>
                            <Input id="name-1" name="name" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Mot de passe</Label>
                            <Input id="username-1" name="username" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Se connecter</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    </>
}
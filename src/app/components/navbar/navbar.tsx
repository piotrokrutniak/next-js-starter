import { FaPizzaSlice } from "react-icons/fa"
import Button from "../generic/button"


export default function NavBar(){
    return(
        <div className="bg-black/80 sticky top-0 z-20 backdrop-blur-xl">
            <div className="w-full flex bg-slate-700/50 ">
                <div className="p-3 m-auto w-full flex max-w-7xl justify-between items-center">
                    <div className="flex gap-1 h-fit select-none cursor-pointer active:opacity-80 hover:border-b-2 hover:pb-1 active:pb-0 border-opacity-0 border-vermilion-400 hover:border-opacity-100 border-b-0 transition-all">
                        <FaPizzaSlice className="h-full w-8 fill-vermilion-400"/>
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-vermilion-400 to-vermilion-500">Recipefy</h1>
                    </div>
                    <div className="flex text-lg gap-4">
                        <Button className="text-white bg-slate-200/5 active:bg-slate-100/5 hover:bg-slate-200/10" onClick={undefined}>
                            Recipes
                        </Button>
                        <Button className="text-white bg-slate-200/5 active:bg-slate-100/5 hover:bg-slate-200/10" onClick={undefined}>
                            Favorites
                        </Button>
                        <Button className="text-white bg-slate-200/5 active:bg-slate-100/5 hover:bg-slate-200/10" onClick={undefined}>
                            Ingredient Picker
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
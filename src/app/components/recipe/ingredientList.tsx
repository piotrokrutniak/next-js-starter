import { BsX, BsCircleFill } from "react-icons/bs"
import { FaDotCircle } from "react-icons/fa"

export default function IngredientList({ingredients} : {ingredients: Array<object>}){
    return(
        ingredients.map(x => 
            <li className="flex place-items-center gap-2 py-1">
                <BsCircleFill className="w-2 h-2"/>
                {x.desc} 
                <BsX className="w-6 h-6 hover:fill-red-500 hover:scale-110 active:scale-100 cursor-pointer"/>
            </li>)
    )

}
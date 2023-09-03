import { BsX, BsCircleFill, BsCheck, BsTrash } from "react-icons/bs"
import { FaDotCircle } from "react-icons/fa"
import FormInput from "../generic/formInput"
import SearchBar from "../generic/searchBar"
import IngredientSearchBar from "./ingredientSearchBar"
import { Dispatch, SetStateAction, useState } from "react"

export default function IngredientFormList({ingredients, setPopupOpen, setIngredients} : 
    {ingredients: {
        name: string;
        desc: string;
        key: number;
    }[], 
        setPopupOpen: any, 
        setIngredients: Dispatch<SetStateAction<{
            name: string;
            desc: string;
            key: number;
        }[]>>}){

    function Remove(index: number){
        let tempIngredients = ingredients
        console.log(ingredients)
        tempIngredients.splice(index, 1)
        console.log(ingredients)
        setIngredients([...tempIngredients])
    }

    return(
        ingredients.map((x, index) => 
            <Ingredient setPopupOpen={setPopupOpen} key={index+1} id={index} remove={Remove}/>)
    )
}

function Ingredient({setPopupOpen, id, remove}:
    {setPopupOpen: any, id: number, remove: (index: number) => void}){

    const [discardStarted, setDiscardStarted] = useState(false)
    function Discard(){
        if(discardStarted){
            setPopupOpen(false)
            console.log(id)
            remove(id)
            return setDiscardStarted(false)
        }    
        return setDiscardStarted(true)
    }

    return(
        <li className="flex place-items-center gap-4 py-1 text-base">
            <FormInput className="w-96" placeholder="Enter ingredient description"/>
            <IngredientSearchBar setPopupOpen={setPopupOpen}/>
            {discardStarted ? 
            <div className="flex gap-4">
                <div className="hover:text-red-500 flex cursor-pointer active:opacity-70 select-none place-items-center gap-1" onClick={() => Discard()}> 
                    Remove <BsTrash className="w-4 h-4 hover:fill-red-500 "/>
                </div>
                <div className="hover:text-red-500 flex cursor-pointer active:opacity-70 select-none place-items-center gap-1" onClick={() => setDiscardStarted(false)}> 
                    Cancel <BsX className="w-6 h-6 hover:fill-red-500 hover:scale-110 active:scale-100 cursor-pointer"/>
                </div></div> :
            <BsTrash className="w-4 h-4 hover:fill-red-500 hover:scale-110 active:scale-100 cursor-pointer" onClick={() => Discard()}/>}
        </li>
    )
}
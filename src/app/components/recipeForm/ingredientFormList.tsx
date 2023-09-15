import { BsX, BsCircleFill, BsCheck, BsTrash } from "react-icons/bs"
import { FaDotCircle } from "react-icons/fa"
import FormInput from "../generic/formInput"
import SearchBar from "../generic/searchBar"
import IngredientSearchBar from "./ingredientSearchBar"
import { Dispatch, SetStateAction, useState } from "react"
import GetIngredients from "@/app/integration/cloudinary/ingredients/getIngredients"

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
    const [resultsOpen, setResultsOpen] = useState(false)
    const [discardStarted, setDiscardStarted] = useState(false)
    const [searchString, setSearchString] = useState("")

    const [queriedIngredients, setQueriedIngredients] = useState([])

    const lastQueryTime = Date.now()

    // Add parameter to API request to search by name, useEffect that will refresh the list onChange
    // Load more on scroll in dropdown
    // GetIngredients()

    async function LoadIngredients(){
        GetIngredients(searchString)
            .then(x => setQueriedIngredients(queriedIngredients.concat(x)))
            .then(() => console.log(queriedIngredients))
    }
    async function QueryIngredients(value: string){
        await GetIngredients(value)
            .then(x => setQueriedIngredients(x))
            .then(() => console.log(queriedIngredients))
    }

    function Discard(){
        if(discardStarted){
            setPopupOpen(false)
            console.log(id)
            remove(id)
            return setDiscardStarted(false)
        }    
        return setDiscardStarted(true)
    }

    function OpenResults(){
        QueryIngredients("");
        setResultsOpen(true)
    }

    function CloseResults(){
        setResultsOpen(false)
    }

    async function UpdateIngredients(value: string){
        setSearchString(value)
        QueryIngredients(value)
    }

    return(
        <li className="flex relative w-fit place-items-center gap-4 py-1 text-base">
            <FormInput className="w-96" placeholder="Enter ingredient description"/>
            <IngredientSearchBar setPopupOpen={setPopupOpen}
                searchString={searchString}
                onChange={UpdateIngredients}
                onFocus={OpenResults}
                onBlur={CloseResults}/>
            {discardStarted ? 
            <div className="flex gap-4">
                <div className="hover:text-red-500 flex cursor-pointer active:opacity-70 select-none place-items-center gap-1" onClick={() => Discard()}> 
                    Remove <BsTrash className="w-4 h-4 hover:fill-red-500 "/>
                </div>
                <div className="hover:text-red-500 flex cursor-pointer active:opacity-70 select-none place-items-center gap-1" onClick={() => setDiscardStarted(false)}> 
                    Cancel <BsX className="w-6 h-6 hover:fill-red-500 hover:scale-110 active:scale-100 cursor-pointer"/>
                </div></div> :
            <BsTrash className="w-4 h-4 hover:fill-red-500 hover:scale-110 active:scale-100 cursor-pointer" onClick={() => Discard()}/>}
            {resultsOpen &&
            <div className="w-56 h-36 overflow-hidden bg-slate-400 rounded-lg absolute right-8 -bottom-36">
                <ul className="overflow-y-scroll h-full group">
                    {
                        // Add types
                    }
                    {
                        queriedIngredients ? 
                        queriedIngredients.map((x: any) => <li className="p-2 border-b-2 border-b-white/30">{x.name}</li>) :
                        <li className="p-2 border-b-2 border-b-white/30">No matching ingredients were found.</li>
                    }
                </ul>
            </div>
            }
        </li>
    )
}
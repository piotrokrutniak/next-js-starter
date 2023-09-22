import { BsX, BsCircleFill, BsCheck, BsTrash, BsPencil } from "react-icons/bs"
import { FaDotCircle } from "react-icons/fa"
import FormInput from "../generic/formInput"
import SearchBar from "../generic/searchBar"
import IngredientSearchBar from "./ingredientSearchBar"
import { Dispatch, SetStateAction, useState } from "react"
import GetIngredients from "@/app/integration/cloudinary/ingredients/getIngredients"

export default function IngredientFormList({ingredients, setPopupOpen, setIngredients, updateIngredient, updateIngredientDesc, validateForm} : 
    {ingredients: {
        _id: string;
        name: string;
        desc: string;
        ingredientId: string;
        key: number;
    }[], 
        setPopupOpen: any, 
        setIngredients: Dispatch<SetStateAction<{
            _id: string;
            name: string;
            desc: string;
            ingredientId: string;
            key: number;
        }[]>>;
        updateIngredient: (name: string, ingredientId: string, id: number) => void;
        updateIngredientDesc: (desc: string, id: number) => void;
        validateForm: () => boolean
    }){

    function Remove(index: number){
        let tempIngredients = ingredients
        console.log(ingredients)
        tempIngredients.splice(index, 1)
        console.log(ingredients)
        setIngredients([...tempIngredients])
    }

    return(
        ingredients.map((x, index) => 
            <Ingredient setPopupOpen={setPopupOpen} key={index+1} id={index} remove={Remove} 
                updateIngredientDesc={updateIngredientDesc} 
                updateIngredient={updateIngredient}
                validateForm={validateForm}/>)
    )
}

function Ingredient({setPopupOpen, id, remove, updateIngredient, updateIngredientDesc, validateForm}:
    {setPopupOpen: any, 
        id: number, 
        remove: (index: number) => void; 
        updateIngredient: (name: string, ingredientId: string, id: number) => void;
        updateIngredientDesc: (desc: string, id: number) => void;
        validateForm: () => boolean
    }){

    const [resultsOpen, setResultsOpen] = useState(false)
    const [discardStarted, setDiscardStarted] = useState(false)
    const [searchString, setSearchString] = useState("")

    const [selectedIngredient, setSelectedIngredient] = useState("")


    const [queriedIngredients, setQueriedIngredients] = useState([])

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

    function BrowseIngredients(){
        setSearchString(selectedIngredient)
        setSelectedIngredient("")
        SelectIngredient("", "", id)
    }

    function SelectIngredient(name: string, ingredientId: string, id: number){
        updateIngredient(name, ingredientId, id)
        setSelectedIngredient(name)
        setResultsOpen(false)
    }

    function OpenResults(){
        console.log(id)
        QueryIngredients(searchString);
        setResultsOpen(true)
    }

    function CloseResults(){
        setTimeout(() => setResultsOpen(false), 120)
    }

    async function UpdateIngredients(value: string){
        setSearchString(value)
        QueryIngredients(value)
    }

    function UpdateDescription(desc: string){
        updateIngredientDesc(desc, id)
        console.log(desc)
    }

    return(
        <li className="flex relative w-fit place-items-center gap-4 py-1 text-base">
            <FormInput className="w-96" placeholder="Enter ingredient description" onChange={UpdateDescription} onBlur={validateForm}/>

            {selectedIngredient ? 
            <>
                {selectedIngredient}
                <BsPencil className="w-4 h-4 hover:fill-green-500 hover:scale-110 active:scale-100 cursor-pointer" onClick={() => BrowseIngredients()} /> 
            </>  
            : 
            <IngredientSearchBar setPopupOpen={setPopupOpen}
                searchString={searchString}
                onChange={UpdateIngredients}
                onFocus={OpenResults}
                onBlur={CloseResults}/>
            }   

            
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
            <div className="w-56 h-36 overflow-hidden bg-slate-500/50 rounded-lg absolute right-8 -bottom-36">
                <ul className="overflow-y-scroll h-full group">
                    {
                        queriedIngredients.length > 0 ? 
                        queriedIngredients.map((x: any) => <li className="p-2 border-b-2 border-b-white/10 hover:bg-slate-400/20 cursor-pointer" onClick={() => SelectIngredient(x.name ,x._id, id)}>{x.name}</li>) :
                        <li className="p-2 border-b-2">No matching ingredients were found.</li>
                    }
                </ul>
            </div>
            }
        </li>
    )
}
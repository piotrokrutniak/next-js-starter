import Button from "@/app/components/generic/button"
import FormCheckbox from "@/app/components/generic/formCheckbox"
import FormInput from "@/app/components/generic/formInput"
import PostIngredient from "@/app/integration/cloudinary/ingredients/postIngredient"
import { useState } from "react"
import { BsArrowClockwise, BsTrash } from "react-icons/bs"
import { FaSave } from "react-icons/fa"

export default function AddIngredientPopup({setPopUpOpen, popupOpen} : {setPopUpOpen: any, popupOpen: boolean}){
    const [isSaved, setSaved] = useState(false)
    const [discardStarted, setDiscardStarted] = useState(false)
    const [ingredientData, setIngredientData] = useState({
        __id: "",
        name: "",
        vegan: false,
        vegetarian: false,
    })

    async function Save(){
        setSaved(true)
        
        if(ingredientData.name){
            await PostIngredient(ingredientData)
                .then(x => setSaved(false))
                .then(setPopUpOpen(false))
        }
    }

    function Discard(){
        if(discardStarted){
            setPopUpOpen(false)
            return setDiscardStarted(false)
        }    
        return setDiscardStarted(true)
    }

    function UpdateName(value: string){
        setIngredientData({...ingredientData, name: value})
    }

    function UpdateVegan(value: boolean){
        setIngredientData({...ingredientData, vegan: value})
    }

    function UpdateVegetarian(value: boolean){
        setIngredientData({...ingredientData, vegetarian: value})
    }

    return(
        <div className="w-full text-base h-full bg-black/60 backdrop-blur-sm flex absolute top-0 left-0 justify-center">
            <div className="w-96 h-fit mt-32 rounded-lg shadow-md shadow-black/40 overflow-hidden bg-black">
                <div className="w-full flex gap-2 flex-col p-10 h-full bg-slate-700/20">
                    <h2 className="font-semibold text-2xl mb-5">Add New Ingredient</h2>
                    <FormInput onChange={UpdateName} label="Name" inputClassName="w-fit p-3 mb-6" placeholder="Enter ingredient name"
                        validationMessage="The ingredient name is required." 
                        validationResult={ingredientData.name ? true : false}/>
                    <FormCheckbox value={ingredientData.vegan} updateValue={UpdateVegan} className="w-44" label="Vegan"/>
                    <FormCheckbox value={ingredientData.vegetarian} updateValue={UpdateVegetarian} className="w-44 mb-6" label="Vegetarian"/>
                    <div className="flex flex-row-reverse gap-2">
                        <Button className={`${ingredientData.name ? "bg-green-500/70 hover:bg-green-500/90 active:opacity-80" : "bg-slate-500/70 cursor-not-allowed hover:opacity-80"} text-sm font-normal py-1 transition-all flex items-center gap-2`}
                            onClick={() => Save()}
                            disabled={ingredientData.name ? false : true}> 
                            {isSaved ? <>Saving <BsArrowClockwise className="animate-spin h-4 w-4"/></> : <>Save <FaSave/></>}
                        </Button>
                        <Button className={`${discardStarted ? "hover:bg-vermilion-500/90 bg-vermilion-500/80" : "bg-slate-700/40 hover:bg-vermilion-500/90"} 
                            active:opacity-80 text-sm font-normal py-1 transition-all flex items-center gap-2`}
                            onClick={() => Discard()}> 
                            {discardStarted ? <> Are you sure? <BsTrash/></> : <>Discard <BsTrash/></>}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
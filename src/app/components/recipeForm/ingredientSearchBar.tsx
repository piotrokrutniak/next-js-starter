"use client"
import { Dispatch, SetStateAction, useState } from "react"
import { BsX, BsPlusCircle } from "react-icons/bs"
import { FaSearch, FaAngleDown } from "react-icons/fa"

export default function IngredientSearchBar({setPopupOpen, onFocus, onBlur, searchString, onChange} : {setPopupOpen: any; onFocus?: any; onBlur?: any; searchString: string; onChange: (value: string) => void}){
    const [dropdownOpened, setDropdownOpened] = useState(false)
    const [chosenOption, setChosenOption] = useState("")
    const [focused, setFocused] = useState(false)
    
    function ToggleDropdownOpened(){
        console.log("click")
        setDropdownOpened(true)
    }

    function Focus(){
        if(onFocus){
            onFocus()
        }
        
        setFocused(true)
    }

    function Blur(){
        if(onBlur){
            onBlur()
        }
        setFocused(false)
    }



    return(
        <div className="bg-slate-500/40 rounded-lg flex pl-5 gap-2 items-center focus-within:bg-slate-500/50 transition-colors ease-in border-2 border-transparent">
            <FaSearch className="fill-slate-50/40"/>
            <input type="text" value={searchString} onChange={(e) => onChange(e.target.value)} placeholder="Search for ingredients" className="bg-transparent p-3 pl-0 text-white w-48 outline-none border-none"
                onFocus={() => Focus()} onBlur={() => Blur()}/>

            <div className={`${focused ? "block w-32 border-white/20" : "block overflow-hidden w-0 border-transparent delay-100"} flex shrink-0 text-slate-50 cursor-pointer border-l-2 pl-3 relative transition-all`}>
                <div className="flex opacity-40 shrink-0 hover:opacity-60 active:opacity-40 transition-opacity place-items-center" onClick={() => setPopupOpen(true)}>

                {"Add New"}
                <BsPlusCircle className={`fill-slate-50 w-10 h-6 transition-all mr-2`}/>
                </div>

                <div className={`${dropdownOpened ? "block" : "hidden"} absolute top-14 right-0 h-44 w-56 bg-black rounded-lg overflow-hidden`}>
                    <div className="w-full h-full bg-slate-500/50 overflow-y-auto pt-0">
                    </div>
                </div>
            </div>
        </div>
    )
}
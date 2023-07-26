"use client"
import { useState } from "react"
import { FaSearch, FaAngleDown } from "react-icons/fa"

export default function SearchBar(){
    const [dropdownOpened, setDropdownOpened] = useState(true)

    return(
        <div className="bg-slate-500/40 rounded-lg flex pl-5 gap-2 items-center focus-within:bg-slate-500/50 transition-colors ease-in">
            <FaSearch className="fill-slate-50/40"/>
            <input type="text" placeholder="Search for a recipe" className="bg-transparent p-5 pl-0 text-white w-full outline-none text-lg border-none"/>

            <div className="flex text-slate-50 cursor-pointer border-l-2 pl-3 border-white/20 relative" onClick={() => setDropdownOpened(x => !x)}>
                <div className="flex opacity-40 hover:opacity-60 active:opacity-40 transition-opacity">

                Category
                <FaAngleDown className={`${dropdownOpened ? "rotate-180" : ""} fill-slate-50 w-10 h-6 transition-all`}/>
                </div>

                <div className={`${dropdownOpened ? "block" : "hidden"} absolute top-14 right-0 h-36 w-44 bg-black rounded-lg overflow-hidden`}>
                    <div className="w-full h-full bg-slate-400/40 overflow-y-auto pt-0 p-3">
                        <div className="border-b-2 border-solid border-white/25 py-2">Breakfast</div>
                        <div className="border-b-2 border-solid border-white/25 py-2">Breakfast</div>
                        <div className="border-b-2 border-solid border-white/25 py-2">Breakfast</div>
                        <div className="border-b-2 border-solid border-white/25 py-2">Breakfast</div>
                        <div className="border-b-2 border-solid border-white/25 py-2">Breakfast</div>
                    </div>
                </div>
            </div>
        </div>


    )
}
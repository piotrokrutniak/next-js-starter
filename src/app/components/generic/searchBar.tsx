"use client"
import { useState } from "react"
import { FaSearch, FaAngleDown } from "react-icons/fa"

export default function SearchBar(){
    const [dropdownOpened, setDropdownOpened] = useState(true)

    return(
        <div className="bg-slate-500/40 rounded-lg flex pl-5 gap-2 items-center focus-within:bg-slate-500/50 transition-colors ease-in">
            <FaSearch className="fill-slate-50/40"/>
            <input type="text" placeholder="Search for a recipe" className="bg-transparent p-5 pl-0 text-white w-full outline-none text-lg border-none"/>

            <div className="flex text-slate-50 cursor-pointer opacity-40 hover:opacity-60 active:opacity-40 transition-opacity" onClick={() => setDropdownOpened(x => !x)}>
                Category
                <FaAngleDown className={`${dropdownOpened ? "rotate-180" : ""} fill-slate-50 w-10 h-6 transition-all`}/>
            </div>
        </div>


    )
}
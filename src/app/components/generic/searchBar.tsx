import { FaSearch } from "react-icons/fa"

export default function SearchBar(){
    return(
        <div className="bg-slate-500/40 rounded-lg flex p-5 gap-2 items-center focus-within:bg-slate-500/50 transition-colors ease-in">
            <FaSearch className="fill-slate-50/40"/>
            <input type="text" placeholder="Search for a recipe" className="bg-transparent text-white w-full outline-none text-lg border-none"/>
        </div>
    )
}
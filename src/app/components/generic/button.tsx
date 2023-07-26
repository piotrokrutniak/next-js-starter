import { MouseEventHandler } from "react";

export default function Button({ children, className, onClick, } : { children: React.ReactNode, className: string, onClick: undefined | MouseEventHandler<HTMLButtonElement> }){
    return(
        <button className={`${className} px-5 py-3 rounded-lg bg-blue-500 bg-opacity-90 active:bg-opacity-80 hover:bg-opacity-100 cursor-pointer transition-all flex items-center gap-2`}
            onClick={onClick}>
            {children}
        </button>
    )
}
export default function FormCheckbox({...props}){
    return(
        <div className={`${props.className ?? ""} flex flex-row gap-2 justify-between place-items-center`}>
            <div className={`${props.label ? "" : "hidden"} py-1 text-xl}`} >
                {props.label || ""}
            </div>
            <input type="checkbox" defaultValue={props.defaultValue || ""} placeholder={props.placeholder ?? ""}
                className={`${props.inputClassName ?? ""} h-6 w-5 rounded-lg outline-none bg-slate-500/40 focus:bg-slate-500/50 border-2 border-transparent cursor-pointer focus:border-sky-100/50
                transition-all`}/>
        </div>
    )
}
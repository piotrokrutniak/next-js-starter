export default function TextArea({...props}){
    return(
        <div className="flex flex-col w-full">
            <div className="p-2 text-xl">
                {props.label || ""}
            </div>
            <textarea defaultValue={props.defaultValue || ""} placeholder={props.placeholder ?? ""}
                className={`${props.inputClassName ?? ""} resize-none h-32 p-4 w-full rounded-lg outline-none bg-slate-500/40 focus:bg-slate-500/50 border-2 border-transparent focus:border-sky-100/50`}/>
        </div>
    )
}
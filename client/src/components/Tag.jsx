export default ({text, img, className}) => {
    return (
        <div className={`cursor-pointer shadow-lg bg-stone-100 hover:bg-stone-200 active:bg-stone-300 transition rounded-lg px-5 py-2 
        dark:bg-slate-700 dark:hover:bg-slate-600 dark:active:bg-slate-500
        ${className}`}>
            {text} <img className="size-5 inline" src={img} alt={text} />
        </div>
    )
}
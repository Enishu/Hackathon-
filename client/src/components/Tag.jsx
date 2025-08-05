export default ({text, img}) => {
    return (
        <div className="cursor-pointer shadow-lg bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 transition rounded-lg px-5 py-2">
            {text} <img className="size-5 inline" src={img} alt={text} />
        </div>
    )
}
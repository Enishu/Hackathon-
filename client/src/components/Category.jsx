import Button from "./Button"

export default ({text, img, className, activated, handleClick}) => {
    return (
        <Button handleClick={handleClick} className={className} activated={activated}>
            {text} <img className="size-5 inline" src={img} alt={text} />
        </Button>
    )
}
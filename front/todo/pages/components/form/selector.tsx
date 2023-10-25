type SelectorProps = {
    title: string
    placeholder: string[]
}

const Selector = ({title, placeholder}: SelectorProps) => {
    return (
        <select className="select select-info w-full max-w-xs">
            <option disabled selected>{title}</option>
            {placeholder.map((item, index) => {
                return <option key={index}>{item}</option>
            })}
        </select>
    )
}
export default Selector;
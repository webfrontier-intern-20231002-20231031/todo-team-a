import { useState } from "react";

type SelectorProps = {
    title: string
    placeholder: string[]
    onValueChange: (newVal: string) => void
}

const Selector = ({title, placeholder, onValueChange}: SelectorProps) => {
    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
        if(event.target.value == 'Select Tag') event.target.value = '';
        onValueChange(event.target.value);
    };

    return (
        <select className="select select-info w-full max-w-xs"
            value={selectedValue}
            onChange={handleChange}
        >
            <option selected>{title}</option>
            {placeholder.map((item, index) => {
                return <option key={index}>{item}</option>
            })}
        </select>
    )
}
export default Selector;
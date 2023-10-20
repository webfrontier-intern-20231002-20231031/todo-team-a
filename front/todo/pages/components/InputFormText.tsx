import { Input } from "postcss";

type InputFormTextProps = {
    placeholder: string;
    value: string;
    onChange: (newValue: string) => void;
}

const InputFormText = ({ placeholder, value, onChange }: InputFormTextProps) => {

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    }

    return (
        <input type="text" onChange={onChangeInput} placeholder={placeholder} className="w-fll input input-bordered input-accent w-full max-w-xs w-96 " value={value}/>
        );
}
export default InputFormText;
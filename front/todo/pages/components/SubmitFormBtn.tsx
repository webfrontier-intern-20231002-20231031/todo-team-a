import { on } from "events";

type SubmitFormBtnProps = {
    page: string;
}

const SubmitFormBtn = ({page}: SubmitFormBtnProps) => {


    return (
        <button type="submit" className="btn btn-wide w-full max-w-xs w-96 btn-outline btn-secondary">{page}</button>
    )
}
export default SubmitFormBtn;
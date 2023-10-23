import { on } from "events";

type SubmitFormBtnProps = {
    page: string;
    onSubmit: (getCompleted: boolean) => void;
}

const SubmitFormBtn = ({page, onSubmit}: SubmitFormBtnProps) => {

    const onClickLoginBtn = () => {
        // ここにログイン処理を書く
        const res: boolean = true;
        onSubmit(res);
        console.log(res);
    }

    return (
        <button onClick={onClickLoginBtn} className="btn btn-wide w-full max-w-xs w-96 btn-outline btn-secondary">{page}</button>
    )
}
export default SubmitFormBtn;
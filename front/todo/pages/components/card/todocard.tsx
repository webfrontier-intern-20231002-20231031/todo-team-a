import { type } from "os";
import { TdesignDelete } from "../svg_button/deleteButton";

import { useEffect, useState } from "react";

type TodoCardProps = {
    id: number
    title: string
    owner: string
    tag: string[]
    created: string
    updated: string

    propBtnColor: string
    propCompleted: boolean
}

const TodoCard = ({ title,owner,tag,created,updated, propBtnColor, propCompleted }: TodoCardProps) => {

    const [completed, setCompleted] = useState(propCompleted);
    const [btnColor, setBtnColor] = useState(propBtnColor);

    useEffect(() => { setBtnColor(propBtnColor) }, [propBtnColor])
    useEffect(() => { setCompleted(propCompleted) }, [propCompleted])


    // front用のflag処理
    useEffect(() => {
        if (completed) {
            setBtnColor("btn-success");
        } else {
            setBtnColor("btn-error");
        }
    }, [completed])

    return (
        <div className="card w-11/12 bg-base-100 shadow-xl bg-indigo-800 mb-5">
            <div className="card-body">
                <div className="flex justify-between">
                    <h2 className="card-title line-clamp-1">{title}</h2>
                    <button className={"btn btn-outline btn-xs " + btnColor} onClick={() => { setCompleted(!completed); setBtnColor(completed ? "btn-error" : "btn-success") }}>{completed ? "COMPLETE" : "INCOMPLETE"}</button>
                </div>
                <div className="flex">
                    <div>
                        <p>Owner: {owner}</p>
                        <p>Tag:
                            {tag.map((tag, index) => {
                                return <span key={index}> {tag}</span>
                            })}
                        </p>
                    </div>
                    <div className="ml-10">
                        <p>Created: {created}</p>
                        <p>Updated: {updated}</p>
                    </div>
                </div>
                <div className="flex justify-end">
                    <TdesignDelete onClick={() => {
                        const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
                        if (modal) {
                            modal.showModal();
                        }
                    }} className="w-6 h-6 text-right hover:text-red-700" />
                </div>
            </div>
        </div>
        )
}

export default TodoCard;
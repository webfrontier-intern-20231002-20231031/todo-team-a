import { type } from "os";
import { TdesignDelete } from "../svg_button/deleteButton";
import Modal2 from "../modal/modal2";


import { useRecoilState } from "recoil";
import { todoListState } from "../../atoms";

import { useEffect, useState } from "react";
import { todo } from "node:test";

type TodoCardProps = {
    todo_id: number
    title: string
    owner: string
    tag: string[]
    created: string
    updated: string

    propBtnColor: string
    propCompleted: boolean
}

const TodoCard = ({ title,owner,tag,created,updated, propBtnColor, propCompleted, todo_id }: TodoCardProps) => {

    const [completed, setCompleted] = useState(propCompleted);
    const [btnColor, setBtnColor] = useState(propBtnColor);

    useEffect(() => { setBtnColor(propBtnColor) }, [propBtnColor])
    useEffect(() => { setCompleted(propCompleted) }, [propCompleted])


    // recoil用
    const [todo_delId, setTodo_delId] = useRecoilState(todoListState);


    const todoCompleted = () => {

        fetch("/api/todoCrud/completed/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: todo_id.toString(), completed: !completed }),
        })
            .then((res) => {
                if (res.ok) {
                    console.log("deleted");
                } else {
                    console.log("delete failed");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

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
                    <button className={"btn btn-outline btn-xs " + btnColor} onClick={() => { todoCompleted(); setCompleted(!completed); setBtnColor(completed ? "btn-error" : "btn-success") }}>{completed ? "COMPLETE" : "INCOMPLETE"}</button>
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
                        console.log(todo_id);
                        setTodo_delId(todo_id.toString());
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
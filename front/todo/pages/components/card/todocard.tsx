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

    // 時間のformat
    const formatTime = (time: string) => {
        const createdDate = new Date(time);
        const year = createdDate.getFullYear().toString().slice(-2);
        const createdFormatted = createdDate.toLocaleString("ja-JP", {
            timeZone: "Asia/Tokyo",
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });
        return createdFormatted;
    }

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
                        <p>作成者: {owner}</p>
                        {/* <p>タグ:
                            {tag.map((tag, index) => {
                                console.log(title,tag);
                                return tag !== null ? <span key={index}> {tag}</span> : <span key={index}>none</span>
                            })}
                        </p> */}
                        <p>Tag: {tag.length === 0 ? "none" : tag.join(", ")}</p>
                    </div>
                    <div className="ml-10">
                        <div><p className="inline-block">作成日: {formatTime(created)}</p></div>
                        <p className="inline-block">更新日: {formatTime(updated)}</p>
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
import { use, useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { deleteFlagState, todoListState, updateFlagState, userDataState } from "../../atoms";
import { todo } from "node:test";

const Modal2 = () => {

    // recoil用
    const [todo_delId, setTodo_delId] = useRecoilState(todoListState);
    const [deleteFlag, setDeleteFlag] = useRecoilState(deleteFlagState);
    const [updateFlag, setUpdateFlag] = useRecoilState(updateFlagState);
    const [userData, setUserData] = useRecoilState(userDataState);

    const todoDeleted = () => {


        fetch("/api/todoCrud/delete/",{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: todo_delId}),
        })
            .then((res) => {
                if (res.ok) {
                } else {
                    console.log("delete failed");
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                console.log("deleted");
                setDeleteFlag(!deleteFlag);
                setUpdateFlag(!updateFlag);
            });
    }

    return (
        <>
            {/* modal body */}
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Alert</h3>
                    <div className="ml-5">
                        <p className="mt-5">
                            Are you sure you want to delete &quot;title&quot;?</p>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-outline btn-accent btn-xs">CANCEL</button>
                        </form>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-outline btn-secondary btn-xs" onClick={()=>todoDeleted()}>DELETE</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default Modal2;
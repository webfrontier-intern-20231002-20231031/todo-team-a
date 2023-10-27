import Selector from "../form/selector";
import { useState } from "react";

type ModalSelectorProps = {
    title: string
    placeholder: string[]
}

const Modal = ({title, placeholder}: ModalSelectorProps) => {

    const [formData, setFormData] = useState({
        title: "",
        tag: "",
        newTag: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const selectorChange = (newVal: string) => {
        setFormData({
            ...formData,
            tag: newVal,
        });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("submit");

        const { title, tag, newTag } = formData;

        // fetch('api/mockpost', {
        //     method: 'POST',
        //     body: JSON.stringify({ title, tag, newTag }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        // })
        fetch('api/todoCrud/todo',{
            method: 'POST',
            body: JSON.stringify({ title, tag, newTag }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res) => {
            res.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
    };

    return (
        <>
            {/* modal body */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Input Todo</h3>
                    <form onSubmit={handleSubmit}>
                    <div className="ml-5">
                        <p className="mt-5">Title</p>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Type here" className="input input-bordered input-info w-full max-w-xs mb-5" />
                        <p>Tag</p>
                        <Selector title={title} placeholder={placeholder} onValueChange={selectorChange} />
                        <p className="mt-5">New Tag</p>
                        <input type="text" name='newTag' onChange={handleChange} placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" />
                    </div>
                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button type="button" onClick={() => {
                            const modal = document.getElementById(
                                "my_modal_1"
                            ) as HTMLDialogElement;
                            if (modal) {
                                modal.close();
                            }
                        }} className="btn btn-outline btn-secondary">CANCEL</button>
                        {/* if there is a button in form, it will close the modal */}
                        <button type="submit" className="btn btn-outline btn-accent">CREATE</button>
                    </div>
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default Modal;
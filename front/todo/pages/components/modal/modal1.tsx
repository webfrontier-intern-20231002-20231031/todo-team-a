import Selector from "../form/selector";
import { use, useEffect, useState } from "react";
import TagSelector from "../form/checobox";

type ModalSelectorProps = {
    title: string
    placeholder: string[]
}

interface tagList {
    tag_id: number
    name: string
}

type Tag = {
    tag_id: number,
    name: string
}

type FormData = {
    title: string,
    tagList: Tag[],
    newTag: string
}

const Modal = ({title, placeholder}: ModalSelectorProps) => {

    const [tagList, setTagList] = useState<tagList[]>([]);

    const [formData, setFormData] = useState<FormData>({
        title: "",
        tagList: [],
        newTag: "",
    });

    const [checkedTags, setCheckedTags] = useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({
            ...formData,
            [name]: value,
        });
    }


    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        if (checked) {
            setCheckedTags([...checkedTags, value]);
        } else {
            setCheckedTags(checkedTags.filter((tag) => tag !== value));
        }

        console.log(checkedTags);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("submit");

        const { title, tagList, newTag } = formData;

        // fetch('api/mockpost', {
        //     method: 'POST',
        //     body: JSON.stringify({ title, tag, newTag }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        // })
        fetch('api/todoCrud/todo',{
            method: 'POST',
            body: JSON.stringify({ title, checkedTags, newTag }),
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

    useEffect(() => {
        fetch('api/ui/getTag')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setTagList(data);
        })
    },[])

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
                        {/* <Selector title={title} placeholder={placeholder} onValueChange={selectorChange} /> */}
                            {/* <TagSelector tagName="test" /> */}
                        <div className="h-24 overflow-y-auto">{
                            tagList.map((tag) => {
                                return <label key={tag.tag_id} className="inline-block"><input type="checkbox" value={tag.name} className="checkbox checkbox-xs" onChange={handleCheckboxChange} /> {tag.name}　</label>
                            }
                            )
                        }</div>
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

                            console.log(checkedTags)
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
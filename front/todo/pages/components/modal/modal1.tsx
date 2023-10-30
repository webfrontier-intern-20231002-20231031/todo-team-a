import Selector from "../form/selector";
import { use, useEffect, useState } from "react";
import TagSelector from "../form/checobox";
import { useRecoilState } from "recoil";
import { todoListState, loadingState, updateFlagState } from "../../atoms";

type ModalSelectorProps = {
    title: string
    placeholder: string[]
}

interface tagList {
    tag_id: number
    name: string
    checked: boolean
}

type Tag = {
    tag_id: number
    name: string
    checked: boolean
}

type FormData = {
    title: string,
    tagList: Tag[],
    newTag: string
}

const alert = ()=>{
   return (
       <div className="alert alert-error w-11/12">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>タイトルが入力されていません</span>
        </div>
    );
}

const initialFormData: FormData = {
    title: "",
    tagList: [],
    newTag: "",
};

const Modal = ({title, placeholder}: ModalSelectorProps) => {

    const [tagDemo, setTagDemo] = useState<Tag[]>([]);

    const [loading, setLoading] = useRecoilState(loadingState);
    const [updateFlag, setUpdateFlag] = useRecoilState(updateFlagState);

    const [showAlert, setShowAlert] = useState<boolean>(false);

    const [tagList1, setTagList] = useState<tagList[]>([]);

    const [formData, setFormData] = useState<FormData>(initialFormData);

    const [checkedTags, setCheckedTags] = useState<string[]>([]);

    const [tagFlag, setTagFlag] = useState<boolean>(false);

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

        if (title === "") {
            setShowAlert(true);
            return undefined;
        }

        setLoading(true);

        fetch('api/todoCrud/todo',{
            method: 'POST',
            body: JSON.stringify({ title: formData.title, checkedTags, newTag: newTag === "" ? "none" : newTag, }),
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
        .finally(() => {

            setFormData(initialFormData);
            // setTagList((prevTagList) =>
            //     prevTagList.map((tag) => ({ ...tag, checked: false }))
            // );

            const modal = document.getElementById(
                "my_modal_1"
            ) as HTMLDialogElement;
            if (modal) {
                setUpdateFlag(!updateFlag);
                modal.close();
            }
            setLoading(false);
            setTagFlag(!tagFlag);
        })
    };

    useEffect(() => {
        setTagList((prevTagList) =>
            prevTagList.map((tag) => ({ ...tag, checked: false }))
        );
        // fetch('api/ui/getTag')
        // .then((res) => {
        //     try {
        //         return res.json();
        //     }catch(err) {
        //         setTagDemo([
        //             {
        //                 tag_id: 1,
        //                 name: "test",
        //                 checked: false
        //             }
        //         ]);
        //         return tagDemo;
        //     }
        // })
        // .then((data) => {
        //     const datas: Tag[] = data;
        //     setTagList(datas);
        // })
        const getTag = async () => {
        const response = await fetch('api/ui/getTag');
        var data;
            try {
                data = await response.json();
            } catch (error) {
                return;
            }
        }
        getTag();
    }, [tagFlag])


    const loadingWait = async () => {
        // 三秒後にローディングを終了
        setTimeout(() => {
            setLoading(false);
            console.log("loading end");
        }, 10000);
    }

    return (
        <>
            {/* modal body */}
            <dialog id="my_modal_1" className="modal">
                {
                    showAlert ? alert() : null
                }
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
                            tagList1.map((tag) => {
                                return <label key={tag.tag_id} className="inline-block"><input type="checkbox" value={tag.tag_id} className="checkbox checkbox-xs" onChange={handleCheckboxChange} checked={tag.checked}/> {tag.name}　</label>
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
                                setShowAlert(false);
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
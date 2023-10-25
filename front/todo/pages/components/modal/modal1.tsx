import Selector from "../form/selector";

type ModalSelectorProps = {
    title: string
    placeholder: string[]
}

const Modal = ({title, placeholder}: ModalSelectorProps) => {
    return (
        <>
            {/* modal body */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Input Todo</h3>
                    <div className="ml-5">
                        <p className="mt-5">Title</p>
                        <input type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs mb-5" />
                        <p>Tag</p>
                        <Selector title={title} placeholder={placeholder} />
                        <p className="mt-5">New Tag</p>
                        <input type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" />
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-outline btn-secondary">CANCEL</button>
                        </form>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-outline btn-accent">CREATE</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default Modal;
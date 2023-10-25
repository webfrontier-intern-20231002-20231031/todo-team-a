const Modal2 = () => {
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
                            <button className="btn btn-outline btn-secondary btn-xs">DELETE</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default Modal2;
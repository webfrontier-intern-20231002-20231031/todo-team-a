import { useState } from "react";

const Selector = () => {
    return (<select className="select select-info w-full max-w-xs">
        <option disabled selected>Selected Tag</option>
        <option>none</option>
        <option>School</option>
        <option>Office</option>
    </select>)
}

const Modal = () => {
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
                    <Selector />
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

const Sort= () => {
    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <label tabIndex={0} className="btn btn-outline m-1">Sort</label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-info-content rounded-box w-52">
                <li><a>Added order</a></li>
                <li><a>Update order</a></li>
            </ul>
        </div>
        )
}

const NavBar = () => {

    const [completed,setCompleted] = useState(false);
    const [btnColor, setBtnColor] = useState("btn-success");

    return (
        <>
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="w-full navbar bg-base-300">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="flex-1 px-2 mx-2">
                            <h1>TodoList Application</h1></div>
                        <div className="flex-none hidden lg:block">
                            <ul className="menu menu-horizontal">
                                {/* Navbar menu content here */}
                                {/* <li><a>Add</a></li> */}
                                <li onClick={() => {
                                    const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                                    if (modal) {
                                        modal.showModal();
                                    }
                                }}><a>Add Todo</a></li>
                            </ul>
                        </div>
                    </div>
                    {/* Page content here */}
                    {/* Content */}
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between">
                            <h1 className="text-5xl font-bold mt-5 ml-5">ALL Todo</h1>
                            <div className="mt-6 me-5"><Sort /></div>
                        </div>
                        <div className="divider"></div>
                        <div className="card w-10/12 bg-base-100 shadow-xl bg-indigo-800 ml-5">
                            <div className="card-body">
                                <div className="flex justify-between">
                                    <h2 className="card-title">Todo Title</h2>
                                    <button className={"btn btn-outline btn-xs " + btnColor} onClick={() => { setCompleted(!completed); setBtnColor(completed ? "btn-error" : "btn-success") }}>{completed ? "COMPLETE" : "INCOMPLETE"}</button>
                                </div>
                                <div className="flex">
                                    <div>
                                        <p>Owner: me990928</p>
                                        <p>Tag: tag1, tag2, tag3</p>
                                    </div>
                                    <div className="ml-10">
                                        <p>Created: 2023/10/24</p>
                                        <p>Updated: 2023/10/24</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal />
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200">
                        {/* Sidebar content here */}
                        <li onClick={() => { console.log('Hallo!') }}><a>Add Todo</a></li>
                        <li onClick={() => { console.log('Hallo!') }}><a>Add Tag</a></li>
                        {/* <li><a>Sidebar Item 2</a></li> */}
                    </ul>
                </div>
            </div>
        </>
        );  
}
export default NavBar;
import { useState } from "react";
import { useEffect } from "react";
import { TdesignDelete } from "./svg_button/deleteButton";
import Modal from "./modal/modal1";
import Modal2 from "./modal/modal2";
import Reload from "./svg_button/reload";
import Sort from "./svg_button/sort";
import TodoCard from "./card/todocard";

interface Todo {
    title: string;
    completed: boolean;
    owner: string;
    tag: string[];
    created: string;
    updated: string;
}

const m1_selector_placeholder = ["tag1", "tag2", "tag3"];

const NavBar = () => {

    const [completed,setCompleted] = useState(false);
    const [btnColor, setBtnColor] = useState("btn-success");
    const [todoList, setTodoList] = useState<Todo[]>([]);

    // front用の全件取得処理
    useEffect(() => {
        getTodoList();
    }, [])

    const getTodoList = () => {
        fetch("http://localhost:8000/todos")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTodoList(data);
            })
            .catch(error => console.error(error));
    }

    const checkTodo = () => {
        console.log(todoList);
    }

    return (
        <>
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="w-full navbar bg-base-300 fixed">
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
                            <h1 className="text-5xl font-bold mt-5 ml-5 mt-20">ALL Todo</h1>
                            {/* <div className="mt-6 me-5"><Sort /></div> */}
                        </div>
                        <div className="divider"></div>
                        <div className="flex justify-end"><div onClick={getTodoList}><Reload /></div><Sort /></div>
                        <div className="flex flex-col items-center justify-center">
                            {/* <div className="card w-11/12 bg-base-100 shadow-xl bg-indigo-800">
                                <div className="card-body">
                                    <div className="flex justify-between">
                                        <h2 className="card-title line-clamp-1">Todo TitleTodo TitleTodo TitleTodo TitleTodo TitleTodo TitleTodo TitleTodo TitleTodo TitleTodo TitleTodo TitleTodo TitleTodo TitleTodo TitleTodo TitleTodo TitleTodo TitleTodo TitleTodo Title</h2>
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
                                    <div className="flex justify-end">
                                        <TdesignDelete onClick={() => {
                                            const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
                                            if (modal) {
                                                modal.showModal();
                                            }
                                        }} className="w-6 h-6 text-right hover:text-red-700" />
                                    </div>
                                </div>
                            </div> */}
                            <TodoCard title="test" owner="test" tag={["tag1","tag2","tag3"]} created="2023/10/25" updated="2023/10/25" propBtnColor={btnColor} propCompleted={completed} />
                            {
                                todoList.map((todo, index) => {
                                    return <TodoCard key={index} title={todo.title} owner={todo.owner} tag={todo.tag} created={todo.created} updated={todo.updated} propBtnColor={btnColor} propCompleted={completed} />
                                })
                            }
                        </div>
                    </div>
                    <Modal title="Select Tag" placeholder={m1_selector_placeholder} />
                    <Modal2 />
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200">
                        {/* Sidebar content here */}
                        <li onClick={() => {
                            const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                            if (modal) {
                                modal.showModal();
                            }
                        }}><a>Add Todo</a></li>
                        <li onClick={() => { console.log('Hallo!') }}><a>Add Tag</a></li>
                        {/* <li><a>Sidebar Item 2</a></li> */}
                    </ul>
                </div>
            </div>
        </>
        );  
}
export default NavBar;
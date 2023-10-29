import { useState } from "react";
import { useEffect } from "react";
import { TdesignDelete } from "./svg_button/deleteButton";
import { useRecoilState } from "recoil";
import { todoListState, loadingState, updateFlagState } from "../atoms";
import Modal from "./modal/modal1";
import Modal2 from "./modal/modal2";
import Reload from "./svg_button/reload";
import Sort from "./svg_button/sort";
import TodoCard from "./card/todocard";

interface Todo {
    id: number;
    title: string;
    completed: boolean;
    user: string;
    tag: string[];
    created: string;
    updated: string;
}

interface fastTodo {
    todo_id: number;
    title: string;
    tags: Tag[];
    completed: boolean;
    deleted: boolean;
    created_at: string;
    updated_at: string;
}

interface Tag {
    tag_id: number;
    name: string;
}


const m1_selector_placeholder = ["tag1", "tag2", "tag3"];

const NavBar = () => {

    // ローディング用
    const [loading, setLoading] = useRecoilState(loadingState);

    // const [completed,setCompleted] = useState(false);
    const [btnColor, setBtnColor] = useState("btn-success");
    const [todoList, setTodoList] = useState<Todo[]>([]);

    // recoil用
    const [todo_delId, setTodo_delId] = useRecoilState(todoListState);
    const [updateFlag, setUpdateFlag] = useRecoilState(updateFlagState);

    // 通信テスト用
    const [fastTodoList, setFastTodoList] = useState<fastTodo[]>([]);

    const [sortNum, setSortNum] = useState(0);


    const todoCreatedSort = (a: Todo, b: Todo, f: number) => {
        if (a.created < b.created) {
            return -1;
        }
        if (a.created > b.created) {
            return 1;
        }
        return 0;
    }

    const todoUpdatedSort = (a: Todo, b: Todo, f: number) => {
        if (a.updated < b.updated) {
            return -1;
        }
        if (a.updated > b.updated) {
            return 1;
        }
        return 0;
    }

    const todoSort = (data: any, f: number) => {

        var sortData;

        switch (f) {
            case 1:
                sortData = data.sort(todoCreatedSort);
                break;
            case 2:
                sortData = data.sort(todoCreatedSort).reverse();
                break;
            case 3:
                sortData = data.sort(todoUpdatedSort);
                break;
            case 4:
                sortData = data.sort(todoUpdatedSort).reverse();
                break;
            default:
                sortData = data.sort(todoUpdatedSort);
                break;
        }
    }

    // front用の全件取得処理
    useEffect(() => {
        getTodoList();
    }, [])

    // 更新フラグの監視
    useEffect(() => {
        if (updateFlag) {
            getTodoList();
            setUpdateFlag(false);
        }
    }, [updateFlag])

    const getTodoList = () => {
        // fetch("api/addTodo/todo")
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //         setTodoList(data);
        //     })
        //     .catch(error => console.error(error));

        // fetch("/api/ui/getTodo")
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //         // const sortData = data.sort(todoCreatedSort);
        //         // const sortData = todoSort(data, sortNum);
        //         // setApiTodoList(data);
        //     })
        //     .catch(error => console.error(error));    

        // 通信テスト用
        fetch("/api/ui/getTodo")
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setFastTodoList(data);
                console.log(fastTodoList);
            })
            .catch(error => console.error(error));
    }

    const checkTodo = () => {
        console.log(todoList);
    }


    const handleTabIndexChange = (newTabIndex: number) => {
        setSortNum(newTabIndex);
    };

    useEffect(() => {
        // console.log(sortNum);
        const sortData = todoSort(fastTodoList, sortNum);
        setFastTodoList(fastTodoList);
    })

    return (
        <>
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="w-full navbar bg-base-300 fixed z-50">
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
                            <h1 className="text-5xl font-bold mt-5 ml-5 pt-20">ALL Todo</h1>
                            {/* <div className="mt-6 me-5"><Sort /></div> */}
                        </div>
                        <div className="divider"></div>
                        <div className="flex justify-end"><div onClick={getTodoList}><Reload /></div><Sort sortNum={sortNum} onTabIndexChange={handleTabIndexChange}/></div>
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
                            {/* <TodoCard title="test" owner="test" tag={["tag1","tag2","tag3"]} created="2023/10/25" updated="2023/10/25" propBtnColor={btnColor} propCompleted={completed} /> */}
                            {
                                // todoList.map((todo, index) => {
                                //     return <TodoCard key={index} title={todo.title} owner={todo.user} tag={todo.tag} created={todo.created} updated={todo.updated} propBtnColor={btnColor} propCompleted={todo.completed} />
                                // })
                                fastTodoList.map((todo, index) => {
                                    return <TodoCard key={index} title={todo.title} owner="FastAPI" tag={todo.tags.map((tag) => tag.name)} created={todo.created_at} updated={todo.updated_at} propBtnColor={btnColor} propCompleted={todo.completed} todo_id={todo.todo_id} />
                                }
                                )
                            }
                        </div>
                    </div>
                    <Modal title="Select Tag" placeholder={m1_selector_placeholder} />
                    <Modal2 />
                    { loading ? <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div> : null}
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200">
                        {/* Sidebar content here */}
                        <li className="mt-20" onClick={() => {

                            const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                            if (modal) {
                                modal.showModal();
                            }
                        }}><a>Add Todo</a></li>
                        {/* <li onClick={() => { console.log('Hallo!') }}><a>Add Tag</a></li> */}
                        {/* <li><a>Sidebar Item 2</a></li> */}
                    </ul>
                </div>
            </div>
        </>
        );  
}
export default NavBar;
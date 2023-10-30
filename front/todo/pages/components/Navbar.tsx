import { use, useState } from "react";
import { useEffect } from "react";
import { TdesignDelete } from "./svg_button/deleteButton";
import { useRecoilState } from "recoil";
import { todoListState, loadingState, updateFlagState, deleteFlagState, userDataState } from "../atoms";
import Modal from "./modal/modal1";
import Modal2 from "./modal/modal2";
import Reload from "./svg_button/reload";
import Sort from "./svg_button/sort";
import TodoCard from "./card/todocard";
import { todo } from "node:test";
import { get } from "node:https";
import { da } from "date-fns/locale";

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
    created_at: number;
    updated_at: number;
    user: string;
}

interface Tag {
    tag_id: number;
    name: string;
}

const noData: fastTodo[] =[{
        todo_id: -1,
        title: "No Data... Please add Todo.",
        tags: [
        ],
        completed: false,
        deleted: false,
        created_at: 0,
        updated_at: 0,
        user: "unkown",
    }];


const m1_selector_placeholder = ["tag1", "tag2", "tag3"];

const NavBar = () => {

    // ローディング用
    const [loading, setLoading] = useRecoilState(loadingState);


    const [btnColor, setBtnColor] = useState("btn-success");

    // recoil用
    const [todo_delId, setTodo_delId] = useRecoilState(todoListState);
    const [updateFlag, setUpdateFlag] = useRecoilState(updateFlagState);
    const [deleteFlag, setDeleteFlag] = useRecoilState(deleteFlagState);
    const [userData, setUserData] = useRecoilState(userDataState);

    // 通信テスト用
    const [fastTodoList, setFastTodoList] = useState<fastTodo[]>([]);

    const [sortNum, setSortNum] = useState(1);
    const [sortData, setSortData] = useState<fastTodo[]>([]);

    const [first, setFirst] = useState(true);

    // ソート関数
    const [sortFlag, setSortFlag] = useState(false);
    // 作成順
    const sortByCreatedAtDesc = (list: fastTodo[]) => {
        return list.sort((a, b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
    };
    // 更新順
    const sortByUpdatedAtDesc = (list: fastTodo[]) => {
        return list.sort((a, b) => {
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });
    };

    const loadingWait = async () => {
        // 三秒後にローディングを終了
        setTimeout(() => {
            setLoading(false);
            console.log("loading end");
        }, 3000);
    }

    const getTodoList = async () => {
        const response = await fetch("/api/ui/getTodo");
        console.log(response);
        var data;
        try {
            data = await response.json();
        } catch (error) {
            setFastTodoList(noData);
            return;
        }
        console.log(data);
        setFastTodoList(data);
        // fetch("/api/ui/getTodo")
        // .then((res) => {
        //     console.log(res.json());
        // })
    }

    const sort = async () => {
        const sortData = await todoSort(fastTodoList, sortNum);
        setSortData(sortData);
        setFastTodoList(sortData);
    }

    useEffect(() => {
        const sortEff = async () => {
            setLoading(true);
            console.log(sortNum);
            sort();
            await loadingWait();
        }
        console.log("sort");
        sortEff();
    }, [sortFlag, sortNum])

    useEffect(() => {
        const first = async () => {
        setLoading(true);
        const response = await fetch("/api/ui/getTodo");
        var data;
        try {
            data = await response.json();
        } catch (error) {
            setFastTodoList(noData);
            return;
        }
        setFastTodoList(data);
        await loadingWait();
        }
        if (first){
            first();
            setFirst(false);
            console.log("first");
        }
     }, [first])

     useEffect(() => {
        const loadingEff = async () => {
            setLoading(true);
            setFastTodoList(noData);
            await getTodoList();
            await sort();
            console.log("update");

            await loadingWait();
        }
        loadingEff();
        console.log(userData);
    }, [updateFlag])

    useEffect(() => {
        const deleteEff = async () => {
            setLoading(true);
            await getTodoList();
            console.log("delete");
        }
        deleteEff();
    }, [deleteFlag])

    const todoSort = (list: fastTodo[], sortNum: number) => {
        console.log(sortNum)

        if (sortNum == 1) {
            console.log("sort1");
            return sortByCreatedAtDesc(list);
        }
        else if (sortNum == 2) {
            console.log("sort2");
            return sortByUpdatedAtDesc(list);
        }
        else {
            console.log("sort3");
            return sortByUpdatedAtDesc(list);
        }
    }


    const handleTabIndexChange = (newTabIndex: number) => {
        setSortNum(newTabIndex);
    };

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
                        <div className="flex justify-end"><div onClick={getTodoList}><div onClick={() => { setUpdateFlag(!updateFlag) }}><Reload /></div></div><Sort sortNum={sortNum} onTabIndexChange={handleTabIndexChange}/></div>
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
                                fastTodoList.map((todo, index) => {
                                    return <TodoCard key={index} title={todo.title} owner={todo.user} tag={todo.tags.map((tag) => tag.name)} created={todo.created_at} updated={todo.updated_at} propBtnColor={btnColor} propCompleted={todo.completed} todo_id={todo.todo_id} />
                                }
                                )
                            }
                        </div>
                    </div>
                    <Modal title="Select Tag" placeholder={m1_selector_placeholder} />
                    <Modal2 />
                    {loading ?
                        <div className="fixed w-screen h-screen backdrop-blur-sm">
                            <span className="fixed bottom-7 left-7 flex justify-center items-center loading loading-spinner loading-lg"></span> 
                        </div>
                        : null
                        }
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
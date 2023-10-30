import { time } from "console";
import { create } from "domain";
import type { NextApiRequest, NextApiResponse } from "next";
import { todo } from "node:test";
import { useState } from "react";
interface fastTodo {
    todo_id: number;
    title: string;
    tags: Tag[];
    completed: boolean;
    deleted: boolean;
    created_at: number;
    updated_at: number;
}

interface Tag {
    tag_id: number;
    name: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    var todos :fastTodo[] = [];

    if (req.method !== "GET") {
        return new Response(null, { status: 400, statusText: "Must be GET method" });
    }

    await fetch("http://127.0.0.1:8000/v1/todo/")
        .then(res => res.json())
        .then(json => {
            console.log(json);
            // console.log(json[0].tags);
             todos = json.map((item: any) => ({
                ...item,
                created_at: Math.floor(new Date(item.created_at).getTime() / 1000),
                updated_at: Math.floor(new Date(item.updated_at).getTime() / 1000),
            }));

            console.log(todos[0].title+":"+todos[0].created_at);
            console.log( todos[1].title+":"+todos[2].created_at);
            console.log(todos[2].title + ":" +todos[3].created_at);

            todos.sort((a, b) => {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            });


            res.status(200).json(todos);
        })
        .catch(e => { console.error(e.message); });

    res.end();
}
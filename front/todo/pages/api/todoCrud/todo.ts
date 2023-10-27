// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Ewert } from 'next/font/google';

type Data = {
    name: string
}

function addTodo(title: string) {
    fetch('http://127.0.0.1:8000/v1/todo/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data); // APIからのレスポンスデータをコンソールに表示する例
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    console.log(req.body);

    const { title } = req.body;

    await addTodo(title);
}

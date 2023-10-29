// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Ewert } from 'next/font/google';
import { json } from 'stream/consumers';

type Data = {
    name: string
}

function comp(id: string, completed: boolean) {

    console.log('id:', id);
    console.log('http://127.0.0.1:8000/v1/todo/' + id);

    fetch('http://127.0.0.1:8000/v1/todo/' + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            completed: completed,
        })
    }).catch(error => {
        console.error('Error:', error);
    });
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "PUT") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    console.log('test',req.body);

    console.log('hallo')

    const compId = req.body;

    // console.log('oldTag:',checkedTags);
    await comp(compId.id, compId.completed);
    // await console.log('id:',id);
    res.status(200).json({ message: "ok" });
}
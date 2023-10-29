// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Ewert } from 'next/font/google';
import { json } from 'stream/consumers';

type Data = {
    name: string
}

function del(id: string) {

    console.log('id:', id);
    console.log('http://127.0.0.1:8000/v1/todo/' + id);

    fetch('http://127.0.0.1:8000/v1/todo/' + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            deleted: true,
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

    // console.log(req.body);

    const delid = req.body;

    // console.log('oldTag:',checkedTags);
    await del(delid.id);
    // await console.log('id:',id);
    res.status(200).json({ message: "ok" });
}
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Ewert } from 'next/font/google';

type Data = {
    name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    fetch("http://localhost:8000/todos")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            res.status(200).json(data);
        })
        .catch(error => console.error(error));
}

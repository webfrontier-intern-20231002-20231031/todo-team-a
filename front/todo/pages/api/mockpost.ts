// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Ewert } from 'next/font/google';

type Data = {
    name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method !== "POST") {
        return res.status(405).json({message: "Method not allowed"});
    }

    console.log(req.body);

    const data = req.body;
    const jsonData = JSON.stringify(data);
    var datas = JSON.parse(jsonData);
    // client side から受け取った値をjson化
    console.log(datas);
    var tags1 = datas.newTag.split(/[ ,]+/);
    var tag2 = datas.tag.split(/[ ,]+/);
    var tags = tags1.concat(tag2);
    const createJsonData = {
        "title": datas.title, // tag必須->todoの作成
        "completed": false,
        "user": 'tester',
        "tag": tags,
        "created": new Date().toISOString(),
        "updated": new Date().toISOString()
    }

    console.log(data);
    fetch("http://localhost:8000/todos",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(createJsonData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            res.status(200).json(data);
        })
        .catch(error => console.error(error));
}

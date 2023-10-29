import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // if (req.method !== "GET") {
    //     return new Response(null, { status: 400, statusText: "Must be GET method" });
    // }
    if(req.method==='GET'){
        await fetch("http://localhost:8000/v1/todo")
        .then(res => res.json())
        .then(json => {
          console.log(json);
          res.status(200).json(json);
        })
        .catch(e => { console.error(e.message); });
    }
    else if(req.method === 'POST'){
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
        fetch("http://localhost:8000/v1/todo",{
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
    else{
        return res.status(405).json({message: "Method not allowed"});
    }



    //res.end();
}
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== "GET") {
        return new Response(null, { status: 400, statusText: "Must be GET method" });
    }

    await fetch("http://127.0.0.1:8000/v1/todo/")
        .then(res => res.json())
        .then(json => {
            console.log(json);
            console.log(json[0].tags);
            res.status(200).json(json);
        })
        .catch(e => { console.error(e.message); });

    res.end();
}
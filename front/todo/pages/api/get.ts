import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== "GET") {
        return new Response(null, { status: 400, statusText: "Must be GET method" });
    }

    await fetch("http://localhost:8000/todo/", {
        method: 'GET',
        body: JSON.stringify(req.body),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        res.status(200).json(json);
      })
      .catch(e => { console.error(e.message); });

    res.end();
}
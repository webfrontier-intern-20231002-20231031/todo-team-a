import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // if (req.method !== "PUT") {
    //     return new Response(null, { status: 400, statusText: "Must be PUT method" });
    // }

    const { id } = req.query;
    if(req.method==='PUT'){
    await fetch(`http://localhost:8000/v1/todo/${id}`, {
        method: 'PUT',
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
    }
    else if(req.method === 'DELETE'){
      fetch(`http://localhost:8000/todo/${id}`, {
        method: 'DELETE',
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
    }
    else{
      return res.status(405).json({message: "Method not allowed"});
    }

    //res.end();
}
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== "POST") {
        return new Response(null, { status: 400, statusText: "Must be POST method" });
    }

    await fetch("http://localhost:8000/todo/create", {
        method: 'POST',
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

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {

//   if (req.method !== "POST") {
//       return new Response(null, { status: 400, statusText: "Must be POST method" });
//   }

//   await fetch("https://jsonplaceholder.typicode.com/todos/1")
//     .then(res => res.json())
//     .then(json => {
//       console.log(json);
//       res.status(200).json(json);
//     })
//     .catch(e => { console.error(e.message); });

//   res.end();
// }
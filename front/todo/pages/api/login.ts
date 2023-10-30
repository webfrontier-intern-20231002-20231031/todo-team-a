import { da } from "date-fns/locale";
import type { NextApiRequest, NextApiResponse } from "next";


interface user {
    id: number;
    name: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<user[]>) {

    if (req.method !== "POST") {
        return new Response(null, { status: 400, statusText: "Must be GET method" });
    }

    console.log(req.body);

    const data = {
        email: req.body.userId,
        password: req.body.password,
    }

    console.log(JSON.stringify(data));

    fetch("http://127.0.0.1:8000/v1/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then(async (res1) => {
            const jsonData = await res1.json();
            console.log(jsonData);
            res.status(200).json(jsonData);
        })
        .catch((err) => {
            console.log(err);
        });


    // res.end();
}
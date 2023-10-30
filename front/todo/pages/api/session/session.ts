import {  } from 'next-session';

export default withIronSession(async (req, res) => {
    if (req.method === 'POST') {
        // Handle POST request
        req.session.views = (req.session.views || 0) + 1;
        res.end(`Views: ${req.session.views}`);
    } else {
        // Handle other HTTP methods
        res.status(405).end();
    }
}, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'todo-session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
});
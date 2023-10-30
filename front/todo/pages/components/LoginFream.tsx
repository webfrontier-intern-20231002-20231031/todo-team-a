import React, { useEffect, useState } from 'react';
import InputFormText from './InputFormText';
import SubmitFormBtn from './SubmitFormBtn';
import { useRouter } from 'next/router';
import { useRecoilState } from "recoil";
import { userDataState, user } from "../atoms";
import { set } from 'date-fns';
import { da } from 'date-fns/locale';

const LoginFream = () => {

    const [page, setPage] = useState('login');
    const [url, setUrl] = useState('api/login');

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false);

    const [loginBtn, setLoginBtn] = useState('btn btn-active w-44');
    const [registerBtn, setRegisterBtn] = useState('btn w-44');

    const [loading, setLoading] = useState(false);

    // recoil
    const [data, setData] = useRecoilState(userDataState);

    const loadingWait = async () => {
        // 三秒後にローディングを終了
        setTimeout(() => {
            setLoading(false);
            console.log("loading end");
        }, 3000);
    }

    const router = useRouter();

    const onClickLoginBtn = () => {
        setRegisterBtn('btn w-44');
        setLoginBtn('btn btn-active w-44');

        setPage('login');
    }

    const onClickRegisterBtn = () => {
        setLoginBtn('btn w-44');
        setRegisterBtn('btn btn-active w-44');

        setPage('regist');
    }

    const onChangeUserId = (newValue: string) => {
        setUserId(newValue);
    }

    const onChangePassword = (newValue: string) => {
        setPassword(newValue);
    }

    const formData = {
        email: userId,
        password: password
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        var jsonData: user[];
        event.preventDefault();
        // handle form submission
        console.log("submit");



        setLoading(true);
        fetch('api/login', {
            method: 'POST',
            body: JSON.stringify({ userId, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(async(res) => {
            jsonData = await res.json();
        })
        .finally(() => {
            setData(jsonData);
            loadingWait();
            // router.push('/todo');
        }
        );
    };


    return (
        <>
        {loading ?
            <div className="fixed w-full h-full backdrop-blur-sm">
                <span className="fixed bottom-7 left-7 loading loading-spinner loading-lg"></span>
            </div>
            : null
        }
            <div className="flex flex-col items-center">
            <div className="btn-group">
                <button onClick={onClickLoginBtn} className={loginBtn}>Login</button>
                <button onClick={onClickRegisterBtn} className={registerBtn}>Regist</button>
            </div>
            <form onSubmit={onSubmit}>
                <div className="flex flex-col justify-center items-center h-64">
                    <InputFormText placeholder='USERID' value={userId} onChange={onChangeUserId}></InputFormText><br/>
                    <InputFormText placeholder='PASSWORD' value={password} onChange={onChangePassword}></InputFormText><br/>
                    <SubmitFormBtn page={page}></SubmitFormBtn>
                </div>
            </form>
        </div>
        </>
        )
};
export default LoginFream;
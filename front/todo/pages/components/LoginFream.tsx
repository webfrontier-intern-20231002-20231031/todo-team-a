import React, { useState } from 'react';
import InputFormText from './InputFormText';
import SubmitFormBtn from './SubmitFormBtn';
import { useRouter } from 'next/router';


const LoginFream = () => {

    const [page, setPage] = useState('login');

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false);

    const [loginBtn, setLoginBtn] = useState('btn btn-active w-44');
    const [registerBtn, setRegisterBtn] = useState('btn w-44');


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

    const onSubmit = (getCompleted: boolean) => {
        setLogin(getCompleted);
        console.log(userId);
        console.log(password);

        router.push('/todo');
    }

    return (
        <div className="flex flex-col items-center">
            <div className="btn-group">
                <button onClick={onClickLoginBtn} className={loginBtn}>Login</button>
                <button onClick={onClickRegisterBtn} className={registerBtn}>Regist</button>
            </div>
            <div className="flex flex-col justify-center items-center h-64">
                <InputFormText placeholder='USERID' value={userId} onChange={onChangeUserId}></InputFormText><br/>
                <InputFormText placeholder='PASSWORD' value={password} onChange={onChangePassword}></InputFormText><br/>
                <SubmitFormBtn page={page} onSubmit={onSubmit}></SubmitFormBtn>
            </div>
        </div>
        )
};
export default LoginFream;
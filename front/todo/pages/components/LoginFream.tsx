import React, { useState } from 'react';
import InputFormText from './InputFormText';


const LoginFream = () => {

    const [page, setPage] = useState('login');

    const [userId, setUserId] = useState('');

    const [loginBtn, setLoginBtn] = useState('btn btn-active w-52');
    const [registerBtn, setRegisterBtn] = useState('btn w-52');

    const onClickLoginBtn = () => {
        setRegisterBtn('btn w-52');
        setLoginBtn('btn btn-active w-52');

        setPage('login');
    }

    const onClickRegisterBtn = () => {
        setLoginBtn('btn w-52');
        setRegisterBtn('btn btn-active w-52');

        setPage('regist');
    }

    const onChangeUserId = (newValue: string) => {
        setUserId(newValue);
    }

    const onSubmit = () => {
        console.log(userId);
    }


    // #5
    // 予定：コンポーネントごとにファイルを分ける->push


    return (
        <div className="flex flex-col items-center">
            <div className="btn-group">
                <button onClick={onClickLoginBtn} className={loginBtn}>Login</button>
                <button onClick={onClickRegisterBtn} className={registerBtn}>Regist</button>
            </div>
            <div className="flex flex-col justify-center items-center h-64">
                <InputFormText placeholder='USERID' value={userId} onChange={onChangeUserId}></InputFormText><br/>
                <input type="text" placeholder="PASSWORD" className="input input-bordered input-accent w-full max-w-xs" /><br/>
                <button onClick={onSubmit} className="btn btn-wide w-full max-w-xs w-96 btn-outline btn-secondary">{page}</button>
            </div>
        </div>
        )
};
export default LoginFream;
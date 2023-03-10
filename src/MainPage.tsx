import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';


const MainPage = () => {
    const values = useContext(UserContext);
    const goReg = useNavigate();
    const userName: (null|string) = localStorage.getItem("userName");
    const logout = ()=>{
        values?.actions.logout();
        goReg("/member/login");
    };
    return (
        <div>
            {userName? `${userName}님 환영합니다` : `로그인 해주세요`}&nbsp;&nbsp;&nbsp;
            <span onClick={logout}>{userName?"로그아웃":""}</span>
        </div>
    )
}

export default MainPage
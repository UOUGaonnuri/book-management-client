import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import UserContext, {userType} from './UserContext';
import LoginStyle from './LoginPage.module.css'


const userList = [
  { id: "123", pw: "123", userName: "lee"},
  { id: "132", pw: "132", userName: "kin"},
  { id: "321", pw: "321", userName: "park"},
]

const LoginPage = () => {
    const [id, setId] = useState<string>("");
    const [pw, setPw] = useState<string>("");
    const goReg = useNavigate();
    const values = useContext(UserContext);
    const loginFunc = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!id) {
        return alert("ID를 입력하세요.");
      }
      else if (!pw) {
        return alert("Password를 입력하세요.");
      }
      else{
        let body = {
          id: id,
          pw: pw,
        };
        const resultLogin = userList.filter((index) => index.id===id && index.pw === pw);
        if(resultLogin===null){
          return alert("아이디 혹은 비밀번호가 틀렸습니다.");
        }
        let uT: userType = {
          userName: resultLogin[0].userName,
          accessToken: pw,
          refreshToken: pw,
        }
        values?.actions.login(uT);
        goReg('/');
        // axios.post("login",body)
        // .then((res)=>{
        //   if(res.status===200){ // 로그인 성공시
        //     let uT: userType = {
        //       userName: res.data.username,
        //       accessToken: res.data.accessToken,
        //       refreshToken: res.data.accessToken,
        //     }
        //   }
        // })
      }
    }

  return (
    <div className={LoginStyle.body}>
      <div className={LoginStyle.loginform}>
        <form onSubmit={loginFunc}>
          <h1>로그인 페이지</h1>
          <input placeholder='아이디' type='text' value={id} className={LoginStyle.textField} onChange={(e) => setId(e.target.value)}/>
          <br />
          <input placeholder='비밀번호' type='password' value={pw} className={LoginStyle.textField} onChange={(e) => setPw(e.target.value)}/>
          <br />
          <button className={LoginStyle.submitBtn} type='submit'>로그인</button>
          <br />
          <button className={LoginStyle.submitBtn} onClick={()=>goReg('/member/join')}>회원가입</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
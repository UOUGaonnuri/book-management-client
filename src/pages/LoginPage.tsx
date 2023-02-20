import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoginStyle from './style/LoginPage.module.css'
import { AnyAction, Dispatch } from 'redux'
import { connect } from 'react-redux'
import LoginActionCreater from '../redux/LoginActionCreater'

type PropsType = {
  setToken: (userName:string, accessToken: string) => void;
}

const LoginPage = (props: PropsType) => {
    const [id, setId] = useState<string>("");
    const [pw, setPw] = useState<string>("");
    const goReg = useNavigate();
    
    const loginFunc = async(e: React.FormEvent<HTMLFormElement>) => {
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
        try{
          let data = {id: id, pw: pw};
          const res = await axios.post(
            "/api/login",
            data
          );
          if(res.status==200){
            props.setToken(res.data.userName, res.data.accessToken);
            goReg('/');
          }
          else{
            alert(res.data);
            setId("");
            setPw("");
          }
        }
        catch(e){
          console.log(e);
        }
      }
    }

  return (
    <div>
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

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  setToken: (userName:string, accessToken: string) => dispatch(LoginActionCreater.setToken({userName, accessToken})),
});

export default connect(null, mapDispatchToProps)(LoginPage)
import axios from 'axios';
import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoginStyle from '../LoginPage.module.css'


const RegisterPage = () => {
    const [id, setId] = useState<string>("");
    const [pw, setPw] = useState<string>("");
    const [ckPw, setCkPw] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [ckIdMsg, setCkIdMsg] = useState<string>("");
    const [ckEmailMsg, setCkEmailMsg] = useState<string>("");
    const [ckId, setCkId] = useState<boolean>(false);
    const [ckEmail, setCkEmail] = useState<boolean>(false);


    const ckIdChg = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
        setCkId(false);
        setCkIdMsg("");
    }

    const ckIdBtn = () => {
        axios.post('ckId',{
            id: id,
        })
        .then((res)=>{
            if(res.status===100){//중복하는 아이디가 없을 경우
                setCkIdMsg("사용가능한 아이디입니다.");
                setCkId(true);
            }
            else{
                setCkIdMsg("이미 존재하는 아이디입니다.");
                setCkId(false);
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const ckEmailChg = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setCkEmail(false);
        setCkEmailMsg("");
    };

    const ckEmailBtn = () => {
        axios.post('ckEmail',{
            email: email,
        })
        .then((res)=>{
            if(res.status===100){//중복하는 이메일이 없을 경우
                setCkEmailMsg("사용가능한 이메일입니다.");
                setCkEmail(true);
            }
            else{
                setCkEmailMsg("이미 존재하는 이메일입니다.");
                setCkEmail(false)
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    };

    const registFunc = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!id) return alert("아이디를 적어주세요");
        else if (!pw) return alert("비밀번호를 적어주세요");
        else if (!ckPw) return alert("비밀번호 확인을 적어주세요");
        else if (!email) return alert("이메일를 적어주세요");
        else if (pw!==ckPw) return alert("비밀번호가 일치하지 않습니다");
        else if (!ckId) return alert("아이디 중복을 확인해주세요");
        else if (!ckEmail) return alert("이메일 중복을 확인해주세요");
        
        const body = {
            id: id,
            pw: pw,
            email: email,
        };
        axios.post('regist',{
            id,
            pw,
            email,
        })
        .then((res)=>{
            if(res.status===100){
                const goReg = useNavigate();
                alert("회원가입 성공");
                goReg('/member/login');
            }
        })
        .catch((e)=>{
            alert(e);
        })
    }

    return (
        <div className={LoginStyle.registform}>
            <h1 className={LoginStyle.regTitle}>회원가입</h1>
            <form onSubmit={registFunc}>
                <div className={LoginStyle.compo}>
                    <input className={LoginStyle.regInput} type='text' value={id} onChange={ckIdChg} placeholder='아이디' />&nbsp;&nbsp;&nbsp;
                    <button className={LoginStyle.checkBtn} onClick={ckIdBtn}>아이디 중복 확인</button>
                </div>
                <span>{ckIdMsg}</span>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input className={LoginStyle.regInput} type='password' value={pw} onChange={(e)=>setPw(e.target.value)} placeholder='비밀번호'/>
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input className={LoginStyle.regInput} type='password' value={ckPw} onChange={(e)=>setCkPw(e.target.value)} placeholder='비밀번호 확인'/>
                <br />
                <span className={(!pw||!ckPw)?"":((ckPw===pw)?LoginStyle.ckGoodMsg:LoginStyle.ckErrorMsg)}>{(!pw||!ckPw)?"":((ckPw===pw)?"비밀번호가 일치합니다":"비밀번호가 일치하지 않습니다")}</span>
                <br />
                <div className={LoginStyle.compo}>
                    <input className={LoginStyle.regInput} type='email' value={email} onChange={ckEmailChg}  placeholder='이메일'/>&nbsp;&nbsp;&nbsp;
                    <button className={LoginStyle.checkBtn} onClick={ckEmailBtn}>이메일 중복 확인</button>
                </div>
                <br />
                <span>{ckEmailMsg}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className={LoginStyle.submitBtn} type='submit'>회원 가입</button>
            </form>
        </div>
    )
}

export default RegisterPage
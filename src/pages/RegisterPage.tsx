import axios from 'axios';
import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoginStyle from './style/LoginPage.module.css'


const RegisterPage = () => {
    const [id, setId] = useState<string>("");
    const [pw, setPw] = useState<string>("");
    const [ckPw, setCkPw] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [ckIdMsg, setCkIdMsg] = useState<string>("");
    const [ckEmailMsg, setCkEmailMsg] = useState<string>("");
    const [ckId, setCkId] = useState<boolean>(false);
    const [ckEmail, setCkEmail] = useState<boolean>(false);
    const goReg = useNavigate();


    const ckIdChg = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
        setCkId(false);
        setCkIdMsg("");
    }

    const ckIdBtn = async() => {
        if(id===""){
            alert("아이디를 적어주세요");
            return;
        }
        try{
            const res = await axios.get('http://localhost:3000/ckID',{
                params: {id: id}
            })
            if(res.status===200){//중복하는 아이디가 없을 경우
                setCkIdMsg("사용가능한 아이디입니다.");
                setCkId(true);
            }
            else{
                setCkIdMsg("이미 존재하는 아이디입니다.");
                setCkId(false);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const ckEmailChg = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setCkEmail(false);
        setCkEmailMsg("");
    };

    const ckEmailBtn = async() => {
        if(email===""){
            alert("이메일을 적어주세요");
            return;
        }
        try{
            const res = await axios.get('http://localhost:3000/ckEmail',{
                params: {email: email}
            })
            if(res.status===200){//중복하는 아이디가 없을 경우
                setCkEmailMsg("사용가능한 이메일입니다.");
                setCkEmail(true);
            }
            else{
                setCkEmailMsg("이미 존재하는 이메일입니다.");
                setCkEmail(false);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const registFunc = async() => {
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
        try{
            const res = await axios.post(
                "http://localhost:3000/regist",
                {
                    id: id,
                    pw: pw,
                    email: email,
                }
            )
            if(res.status===200){
                alert("회원가입 성공");
                goReg('/member/login');
            }
            else{
                const a: string = ""
                if(res.data.userName!==undefined){
                    a.concat(res.data.userName+"\n");
                }
                if(res.data.password!==undefined){
                    a.concat(res.data.password+"\n");
                }
                if(res.data.email!==undefined){
                    a.concat(res.data.email+"\n");
                }
                alert(a);
            }
        }
        catch(e){
            console.log(e);
            alert("서버통신에 실패하였습니다. 다시 시도해주세요");
        }
    }

    return (
        <div className={LoginStyle.registform}>
            <h1 className={LoginStyle.regTitle}>회원가입</h1>
            <div>
                <div className={LoginStyle.compo}>
                    <input className={LoginStyle.regInput} type='text' value={id} onChange={ckIdChg} placeholder='아이디'/>&nbsp;&nbsp;&nbsp;
                    <button className={LoginStyle.checkBtn} onClick={ckIdBtn} >아이디 중복 확인</button>
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
                <button className={LoginStyle.submitBtn} onClick={registFunc}>회원 가입</button>
            </div>
        </div>
    )
}

export default RegisterPage
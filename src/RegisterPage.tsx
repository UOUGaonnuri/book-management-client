import axios from 'axios';
import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {}

const RegisterPage = (props: Props) => {
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
        <div>
            <form onSubmit={registFunc}>
                <span>아이디</span>
                <br />
                <input type='text' value={id} onChange={ckIdChg} />&nbsp;&nbsp;&nbsp;
                <span onClick={ckIdBtn}>아이디 중복 확인</span>
                <br />
                <span>{ckIdMsg}</span>
                <br />
                <span>비밀번호</span>
                <br />
                <input type='password' value={pw} onChange={(e)=>setPw(e.target.value)} />
                <br />
                <br />
                <span>비밀번호 확인</span>
                <br />
                <input type='password' value={ckPw} onChange={(e)=>setCkPw(e.target.value)} />
                <br />
                <span>{(!pw||!ckPw)?"":((ckPw===pw)?"비밀번호가 일치합니다":"비밀번호가 일치하지 않습니다")}</span>
                <br />
                <span>이메일</span>
                <br />
                <input type='email' value={email} onChange={ckEmailChg} />&nbsp;&nbsp;&nbsp;
                <span onClick={ckEmailBtn}>이메일 중복 확인</span>
                <br />
                <span>{ckEmailMsg}</span>
                <br />
                <button type='submit'>회원 가입</button>
            </form>
        </div>
    )
}

export default RegisterPage
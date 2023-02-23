import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {}

const AddPage = (props: Props) => {
  const [fileData, setFileData] = useState<FileList|null>(null);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [publisher, setPublisher] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [stock, setStock] = useState<number>(1);
  const [ISBN, setISBN] = useState<string>("");
  const [ckISBN, setCkISBN] = useState<boolean>(false);
  const [ISBNMsg, setISBNMsg] = useState<string>("");
  const goReg = useNavigate();
  const textAreaStyle = {
    height: 100
  }
  const addBtnFunc = async() => {
    const data = {
      title: title,
      author: author,
      publisher: publisher,
      content: content,
      stock: stock,
      ISBN: ISBN
    };
    if(title===""){
      alert("제목을 입력해주세요");
    }
    else if(author===""){
      alert("지은이를 입력해주세요");
    }
    else if(publisher===""){
      alert("출판사를 입력해주세요");
    }
    else if(content===""){
      alert("내용을 입력해주세요");
    }
    else if(ISBN===""){
      alert("ISBN을 입력해주세요");
    }
    else if(ckISBN===true){
      alert("ISBN중복을 체크해주세요");
    }
    else{
      try{
        const res = await axios.post("url",{
          bookPostReqDto: data,
          file: fileData
        });
        if(res.status===200){
          alert("책 추가에 성공하였습니다");
          goReg("/admin");
        }
        else{
          alert("알 수 없는 에러가 발생하였습니다 콘솔창을 확인해 주세요");
          console.log(res);
        }
      }
      catch(e){
        console.log(e);
      }
    }
  }
  const ISBNChg = (e:React.ChangeEvent<HTMLInputElement>) => {
    setISBN(e.target.value);
    setCkISBN(false);
  }

  const ckISBNBtn = async() => {
    try{
      const res = await axios.get("/api/admin/isbn", {params: {ISBN: ISBN}});
      if (res.status===200){
        setCkISBN(true);
        setISBNMsg(res.data);
        alert(res.data);
      }
      else if(res.status===409){
        setCkISBN(false);
        setISBNMsg(res.data);
        alert(res.data);
      }
    }
    catch(e){
      console.log(e);
    }
  }
  const fileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileData(e.target.files);
  }



  return (
    <div>
      <h4>책 표지 <input type='file' accept='image/*' onChange={(e)=>fileInput} name='file'/></h4>
      <h4>제목 <input value={title} onChange={(e)=>setTitle(e.target.value)} /></h4>
      <h4>지은이 <input value={author} onChange={(e)=>setAuthor(e.target.value)} /></h4>
      <h4>출판사 <input value={publisher} onChange={(e)=>setPublisher(e.target.value)} /></h4>
      <h4>내용 <input type='text' style={textAreaStyle} value={content} onChange={(e)=>setContent(e.target.value)}/></h4>
      <h4>재고 <input type="number"value={stock} onChange={(e)=>setStock(parseInt(e.target.value))}/></h4>
      <h4>ISBN <input value={ISBN} onChange={ISBNChg}/>&nbsp;&nbsp;&nbsp;<button onClick={ckISBNBtn}>중복 확인</button></h4>
      <button onClick={()=>console.log(title,author,publisher,content,stock,ISBN)}>추가하기</button>
    </div>
  )
}

export default AddPage
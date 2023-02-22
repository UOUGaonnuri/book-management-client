import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import Style from './style/BookPage.module.css'
import BookImg from './youUgly.png'

type BookIdParam = { id: string }

type bookType = {
    title: string;
    author: string;
    publisher: string;
    stock: number;
    content: string;
    isbn: string;
    fileName: string;
    fileUrl: string;
}

const BookPage = () => {
    const params = useParams<BookIdParam>();
    const [bookData, setBookData] = useState<bookType>({
        title: "NOT FOUND",
        author: "NOT FOUND",
        publisher: "NOT FOUND",
        stock: -1,
        content: "NOT FOUND",
        isbn: "NOT FOUND",
        fileName: "NOT FOUND",
        fileUrl: "NOT FOUND",
    });
    const getAxios = async() => {
        try{
            const res = await axios.get(`http://localhost:3000/bookData`,{params: {id: params.id}});
            if(res.status===200){
                console.log(res.data);
                setBookData(res.data[0]);
                // setBookData(res.data);
            }
        }
        catch(e){
            console.log(e);
        }
    }
    useEffect(()=>{
        getAxios();
    },[]);
    return (
        <div>
            <div className={Style.leftconstainer}>
                <img className={Style.ImgStyle} src={BookImg}/>
            </div>
            <div className={Style.rightconstainer}>
                <h2>제목 : {bookData.title}</h2>
                <br />
                <h4>지은이 : {bookData.author}</h4>
                <br />
                <h4>출판사 : {bookData.publisher}</h4>
                <br />
                <h5>남은 부록 수 : {bookData.stock}</h5>
                <li>{bookData.content}</li>
            </div>
        </div>
    )
}

export default BookPage
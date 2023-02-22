import axios from "axios"
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import BookImg from './youUgly.png'

type bookType = {
    id: number;
    title: string;
    author: string;
    publisher: string;
    content: string;
    fileName: string;
    fileUrl: string;
}


const MasterPage = () => {
    const [bookListData, setBookListData] = useState<Array<bookType>>([]);
    const goReg = useNavigate();
    const listFunc = async() => {
        try{
            const res = await axios.get("http://localhost:3000/books");
            setBookListData(res.data);
            console.log(res);
        }
        catch(e){
            console.log(e);
        }
    };
    useEffect(() => {
        listFunc();
    }, []);
    const imgstyle = { width: 90, height: 80};
    console.log(bookListData);
    let bookList = bookListData.map((book: bookType) => {
        return(
            <div key={book.id} className="col-6 col-md-4 col-lg-3">
                <img src={/*book.fileUrl*/BookImg} className="img-thumbnail" style={imgstyle} />
                <br />
                <h6>{book.title}<button>수정</button><button>삭제</button></h6>
                <br />
                <br />
            </div>
        );
    });
    return (
        <div>
            <h2 className="m-4">BOOK LIST<button>추가</button></h2>
            <div className="row">{bookList}</div>
        </div>
    )
}

export default MasterPage;
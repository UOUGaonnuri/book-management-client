import React from 'react'
import { useParams } from 'react-router'
import Style from './style/BookPage.module.css'
import BookImg from './youUgly.png'

type Props = {}
type BookIdParam = { id: string }

const BookPage = (props: Props) => {
    const params = useParams<BookIdParam>();
    return (
        <div>
            <div className={Style.leftconstainer}>
                <img className={Style.ImgStyle} src={BookImg}/>
            </div>
            <div className={Style.rightconstainer}>
                <h2>제목입니다</h2>
                <br />
                <li>내용입니다~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</li>
            </div>
        </div>
    )
}

export default BookPage
import React from 'react'
import { useParams } from 'react-router'

type Props = {}
type BookIdParam = { id: string }

const BookPage = (props: Props) => {
    const params = useParams<BookIdParam>();
    return (
        <div>book ID : {params.id}</div>
    )
}

export default BookPage
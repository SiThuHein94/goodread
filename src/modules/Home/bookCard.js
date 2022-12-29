import bookImg from '../../assets/images/book.jpg'
export const BookCard = ({ value }) => {

    return (
        <div className="card grid grid-cols-3 card-zoom">
            <div className='col-span-1 card-zoom-image'>
                <img style={{ height: 200, borderRadius:5 }} src={bookImg} />
            </div>
            <div className='col-span-2 card-zoom-text'>
                <div style={{fontSize:20, fontWeight:'bold'}}>{value.bookTitle}</div>
                <div style={{fontSize:10}}>{value.summary}</div>
            </div>
        </div>
    )
}
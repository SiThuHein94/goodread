import Moment from 'react-moment'
import bookImg from '../../assets/images/book1.jpg'
export const BookCard = ({ value }) => {

    return (
        <div className="card grid grid-cols-12 card-zoom">
            <div className='col-span-4 xl:col-span-3 lg:col-span-3 card-zoom-image flex justify-center'>
                <img style={{ height: 200, borderRadius: 5, boxShadow:'4px 4px 4px gray' }} src={bookImg} />
            </div>
            <div className='ml-3 col-span-8 xl:col-span-9 lg:col-span-8'>
                <div className='pb-1 card-zoom-text' style={{ fontSize: 20, fontWeight: 'bold' }}>{value.bookTitle}</div>
                <div className=' card-zoom-text' style={{ fontSize: 14 }}>{value.summary}</div>
                <div className=' card-zoom-text pt-5 flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg>
                    <span className='font-bold pl-1 pr-2'>Release Date:</span> <Moment format="YYYY/MM/DD"> {value.rlsDate} </Moment>
                </div>
                <div className=' card-zoom-text flex pt-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className='font-bold pl-1 pr-2'>Price:</span>${value.bookPrice}</div>
                <div className='flex justify-end'>
                    <button
                        style={{ width: 120 }}
                        className='card-zoom-image hover:bg-blue-500 bg-blue-700 text-white font-bold py-2 rounded mt-5 flex justify-center'
                        type="submit"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 mr-1 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    )
}
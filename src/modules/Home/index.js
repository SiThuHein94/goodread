import { inject } from "mobx-react"
import { useEffect, useState } from "react"
import { BookCard } from "./bookCard";

const Home = (props) => {
  console.log(props)
  const { getAllBooks } = props.authStore;
  const [bookData, setBookData] = useState([])
  useEffect(() => {
    getAllBooks().then(
      data => {
        console.log({ data });
        setBookData(data)
      }
    )
  }, [getAllBooks])
  console.log(bookData)
  return (
    <div className="mx-5 mt-20">
      <div className="text-center" style={{ fontSize: 30, fontFamily: 'Helvetica Neue' }}>Available Books</div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 xs:grid-cols-2 gap-4">
        {
          bookData?.map((v, k) => (
            <div className="" key={k}>
              <BookCard value={v} />
            </div>
          ))
        }
      </div>
    </div>
  )
}
export default inject(({ authStore }) => ({ authStore }))(Home);
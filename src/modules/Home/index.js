import Loading from "components/common/Loading";
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
        setBookData(data)
      }
    )
  }, [getAllBooks])

  return (
    <div className="mx-5 mt-20">
      {bookData.length>0 ? <><div className="text-center font-bold pb-3" style={{ fontSize: 30, textShadow: '4px 4px 4px #00000045', fontFamily: 'Helvetica Neue' }}>Available Books</div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 xs:grid-cols-2 gap-4">
          {
            bookData?.map((v, k) => (
              <div className="" key={k}>
                <BookCard value={v} />
              </div>
            ))
          }
        </div></> : <Loading />}
    </div>
  )
}
export default inject(({ authStore }) => ({ authStore }))(Home);
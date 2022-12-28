import { inject } from "mobx-react"
import { useEffect } from "react"

const Home = (props) => {
  console.log(props)
  const { getAllBooks } = props.authStore;
  useEffect(() => {
    getAllBooks().then(
      data=>console.log(data)
    )
  }, [])
  return (
    <div>HOme</div>
  )
}
export default inject(({ authStore }) => ({ authStore }))(Home);
import { Provider } from 'mobx-react';
import { Route, BrowserRouter as Router,Routes,useRoutes } from 'react-router-dom';
import ProtectedRoute from 'components/common/ProtectedRoute';
import Login from 'modules/Login';
import Home from 'modules/Home/index';
import About from 'modules/About/index';
import stores from 'stores';
// import {ROUTES} from 'definitions';
import MainLayout from 'components/MainLayout'

// ...

export default function App() {
  return (
    <Provider {...stores}>
        <Routes>
        <Route path='/' element={<Login />} />
        <Route  element={<MainLayout />}>
          <Route path="/home"  element={<Home />} />
          <Route path='/about' element={<About />} />
        </Route>
        </Routes>
    </Provider>
  )
}


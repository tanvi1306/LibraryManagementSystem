import { useContext, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import './styles/App.css'
import { initFlowbite } from 'flowbite'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './views/pages/LoginPage'
import Dashboard from './views/pages/Dashboard'
import LoginContext from './context/LoginContext'
import AddBook from './views/pages/AddBook'
import ShowBooks from './views/pages/ShowBooks'
import IssueBook from './views/pages/IssueBook'
import IssuedBooks from './views/pages/IssuedBooks'
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserRegister from './views/pages/UserRegister'
import { BookProvider } from './context/BookContext'
import ShowUsers from './views/pages/ShowUsers'
import UserDashboard from './views/pages/UserDashBoard'
import { Button } from 'flowbite-react'


function App() {

  useEffect(() => {
    initFlowbite();
  })

  const { isLogin} = useContext(LoginContext);
  const {isUserLogin} = useContext(LoginContext);
  console.log(isLogin);
  console.log(isUserLogin);

  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          hideProgressBar={false}
          newestOnTop={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="dark"
          transition="Bounce"
          autoClose={500}
        />
        {(isLogin || isUserLogin) &&
          <>
            <Navbar />
            <Sidebar />
          </>
        }

        {
          isLogin ? <BookProvider>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/dashboard' element={isLogin ? <Dashboard /> : <LoginPage />} />
          <Route path='/addbook' element={isLogin ? <AddBook /> : <LoginPage />} />
          <Route path='/showbooks' element={isLogin ? <ShowBooks /> : <LoginPage />} />
          <Route path='/issuebook' element={isLogin ? <IssueBook /> : <LoginPage />} />
          <Route path='/issuedbooks' element={isLogin ? <IssuedBooks /> : <LoginPage />} />
          <Route path='/userregister' element={isLogin ? <UserRegister /> : <LoginPage />} />
          <Route path='/showusers' element={isLogin ? <ShowUsers /> : <LoginPage />} />
          </Routes>
          </BookProvider>:
          isUserLogin?
          <BookProvider>
          <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/dashboard' element={isUserLogin ? <UserDashboard /> : <LoginPage />} />
          <Route path='/showbooks' element={isUserLogin ? <ShowBooks /> : <LoginPage />} />
          <Route path='/issuebook' element={isUserLogin ? <IssueBook /> : <LoginPage />} />
          <Route path='/issuedbooks' element={isUserLogin ? <IssuedBooks /> : <LoginPage />} />
          </Routes>
          </BookProvider>:
          <Routes>
          <Route path='/' element={<LoginPage />} />
          </Routes>


          
        }


      </BrowserRouter>

    </>
  )
}

export default App

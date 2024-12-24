
// import Home from './Pages/Home'
// import './App.css'

// function App() {
  
//   return (
    
//     <Home />
//   )
// }

// export default App
import React,{Suspense,lazy} from 'react'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
const Home  = lazy(()=>import('./Pages/Home'))
const Login = lazy(()=>import('./Pages/Login'))
const Register = lazy(()=>import('./Pages/Register'))
const Videos = lazy(()=>import('./Pages/Videos'))
// const Dashboard = lazy(()=>import('./Pages/Dashboard'))
// const Myprofile = lazy(()=>import('./Pages/Myprofile'))
// const IndividualProfile = lazy(()=>import('./Pages/IndividualProfile'))
//import Home from './Pages/Home'
//import Login from './Pages/Login'
//import Register from './Pages/Register'
// import Dashboard from './Pages/Dashboard'
// import Myprofile from './Pages/Myprofile'
// import IndividualProfile from './Pages/IndividualProfile'

const App = () => {
  return (
   <Router>
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route exact path="/" element={<Home />}/>
      <Route exact path="/login" element={<Login />}/>
      <Route exact path="/register" element={<Register />}/>
      <Route exact path="/Videos" element={<Videos />}/>
      {/* <Route exact path="/dashboard" element={<Dashboard />}/>
      <Route exact path="/myprofile" element={<Myprofile />}/>
      <Route exact path="/individualProfile/:id" element={<IndividualProfile />}/> */}
    </Routes>
    </Suspense>
   </Router>
  )
}

export default App

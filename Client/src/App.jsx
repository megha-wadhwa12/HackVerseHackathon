import React from 'react'
import {Box} from '@chakra-ui/react'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Content from './Components/Content'
import Signup from './Components/Signup'
import Login from './Components/Login'
import AllRoutes from './Components/AllRoutes'
import Theme from './Components/Theme'
import NavBar_Responsive from './Components/Navbar_Responsive/NavBar_Responsive'

const App = () => {
  const vw = window.innerWidth
  return (
    <Box overflowX={'hidden'} background={Theme.colors.primary[100]}>
      {vw>426?<Navbar/>:<NavBar_Responsive/>}
      <AllRoutes />
      {/* <Home/> */}
      {/* <Content/> */}
      {/* <Signup />
      <Login /> */}
    </Box>
  )
}

export default App
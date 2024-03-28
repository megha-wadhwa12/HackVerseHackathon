import React from 'react'
import {Box} from '@chakra-ui/react'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Content from './Components/Content'
import Signup from './Components/Signup'
import Login from './Components/Login'
import AllRoutes from './Components/AllRoutes'
import Theme from './Components/Theme'

const App = () => {
  return (
    <Box overflowX={'hidden'} background={Theme.colors.primary[100]}>
      <Navbar/>
      <AllRoutes />
      {/* <Home/> */}
      {/* <Content/> */}
      {/* <Signup />
      <Login /> */}
    </Box>
  )
}

export default App
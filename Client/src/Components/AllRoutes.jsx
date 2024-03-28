import { Box } from '@chakra-ui/react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import Content from './Content'


const AllRoutes = () => {
  return (
    <Box>
        <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<AboutUs />} /> */}
        {/* <Route path="/contact" element={<ContactUs />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/content" element={<Content />} />
        </Routes>
    </Box>
  )
}

export default AllRoutes
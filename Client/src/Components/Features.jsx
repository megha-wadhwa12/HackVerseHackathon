import React, { useContext } from 'react';
import { AppContext } from '../Context/ParentContext';
import { useNavigate } from 'react-router-dom';
import { Link } from '@chakra-ui/react';

const Features = () => {
  const { login,featureRef } = useContext(AppContext);
  const navigate = useNavigate();

  const handleTryNowClick = (route) => {
    if (!login) {
      // Redirect to login page if not logged in
      navigate('/login'); 
    } else {
      console.log('Trying now...');
      navigate(route)
    }
  };

  return (
    <div className='w-full px-4 sm:px-0 h-auto text-center pt-10 sm:pt-28 mb-10 sm:mb-60 ' ref={featureRef}>
      <h2 className='text-3xl sm:text-6xl font-bold text-white mb-10'>Features</h2>
      <div className='space-y-10 sm:space-y-20 pt-5 sm:pt-10'>
        {/* 1st feature */}
        <div className='flex flex-col-reverse items-center justify-center sm:flex-row sm:justify-evenly'>
          <img className="w-full sm:w-1/4 sm:h rounded-box mb-5 sm:mb-0" src="https://img.freepik.com/premium-vector/illustration-programmer-working-his-desk_23-2148270201.jpg?w=1060" alt="" />
          <div className='text-white w-full sm:w-1/3 space-y-5 sm:space-y-8 text-center sm:text-left'>
            <h1 className='text-xl sm:text-3xl font-bold text-start'>Code Assistance</h1>
            <p className='text-sm sm:text-xl text-justify'>The Code Assistance function is a versatile tool designed to support developers in various stages of the software development lifecycle. It utilizes artificial intelligence to provide assistance in debugging, code generation, and language conversion tasks, enhancing productivity and reducing development time.</p>
            <div className='flex justify-center sm:justify-start'>
              <button className='btn mb-4 sm:mb-0' onClick={()=>{
                handleTryNowClick("/codegen")
              }}>Try Now</button>
            </div>
          </div>
        </div>
        {/* 2nd feature */}
        <div className='flex flex-col-reverse items-center justify-center sm:flex-row sm:justify-evenly'>
          <div className='text-white w-full sm:w-1/3 space-y-5 sm:space-y-8 text-center sm:text-left'>
            <h1 className='text-xl sm:text-3xl font-bold text-start'>Education Topic Searcher</h1>
            <p className='text-sm sm:text-xl text-justify'>Access our AI-based Education Topic Searcher to explore diverse educational subjects. Gain comprehensive information, including subtopics and detailed descriptions, to enrich your learning experience efficiently.</p>
            <div className='flex justify-center sm:justify-start'>
              <button className='btn mb-4 sm:mb-0' onClick={()=>{
                handleTryNowClick("/content")
              }}>Try Now</button>
            </div>
          </div>
          <img className="w-full sm:w-2/6 rounded-box mb-5 sm:mb-0" src="https://images.hindustantimes.com/rf/image_size_640x362/HT/p2/2015/12/01/Pictures/_c34102da-9849-11e5-b4f4-1b7a09ed2cea.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Features;

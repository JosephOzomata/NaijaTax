import React, { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa';
import { IoIosArrowUp } from "react-icons/io";


const ToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when user scrolls down
    useEffect(() => {
      const toggleVisibility = () => {
        if (window.scrollY > 200) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
  
      window.addEventListener("scroll", toggleVisibility);
      return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  return (
    <>
        {isVisible && (

            <div onClick={scrollToTop} className='bg-teal-700 cursor-pointer hover:bg-teal/20 z-50 transition duration-150 backdrop-blur-md  rounded-full fixed bottom-10 shadow-xl right-10'>
                    <IoIosArrowUp className='m-3 text-white text-2xl' />
            </div>
        )}
    </>
  )
}

export default ToTop

// import React, { useEffect, useState } from 'react';
// import ProductCard from '../Product/ProductCard';
// import logo from '../../../public/Photo/digibox_logo_login.jpg';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// //import { ReactComponent as CoffeeAnimation } from './CoffeeCupAnimation.svg'; // Make sure you have a Coffee cup animation SVG

// export default function Home() {
//   const [currentDateTime, setCurrentDateTime] = useState(new Date());
//   const [uiToken, setUiToken] = useState(null);  // State to hold uiToken value
//   const [openModal, setOpenModal] = useState(false);  // State to control modal visibility

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentDateTime(new Date());
//     }, 1000);

//     const fetchUiToken = async () => {
//       const response = await fetch("https://digiboxcafe-server.onrender.com/api/vending/68d3c79b0435cc57850b6474");
//       const data = await response.json();
//       setUiToken(data.uiToken);  // Set uiToken value from API response
//     };

//     fetchUiToken();  // Fetch uiToken on component mount
//     const intervalId = setInterval(fetchUiToken, 500); // Check every 500ms

//     return () => {
//       clearInterval(timer);
//       clearInterval(intervalId);  // Clean up the interval on component unmount
//     };
//   }, []);

//   useEffect(() => {
//     if (uiToken === "false") {
//       setOpenModal(true);  // Open modal only when uiToken is false
//     }
//   }, [uiToken]);  // This effect runs when uiToken changes

//   const formatDate = (date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const handleModalClose = () => {
//     setOpenModal(false);
//   };

//   return (
//     <>
//       {/* Navbar with green to orange gradient background and no hover effect */}
//       <div className="bg-gradient-to-r from-green-400 to-orange-500 h-16 w-full flex justify-between items-center md:px-20 px-5 shadow-lg transform transition-all duration-500">
//         <img src={logo} alt="logo" className="w-40 md:w-64 md:h-10 h-9" />
//         <div className="text-white text-md md:text-xl flex space-x-4">
//           <p className="px-2 md:px-3">{currentDateTime.toLocaleTimeString()}</p>
//           <p>{formatDate(currentDateTime)}</p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="md:px-20 px-5 py-10 w-full h-full">
//         {uiToken === "true" ? (
//           <ProductCard />  // Show ProductCard only if uiToken is true
//         ) : (
//           <div 
//             className="text-center text-red-500 bg-gray-200 p-10 rounded-lg pointer-events-none" 
//             style={{ opacity: 0.6 }}>
//             <div className="text-xl mb-4">Home page is currently unavailable.</div>
//             <div>Please try again later.</div>
//           </div>  // Display this if uiToken is false (Disabled Home Page)
//         )}
//       </div>

//       {/* Modal for UI Token False */}
//       <Modal
//         open={openModal}
//         onClose={handleModalClose}
//         aria-labelledby="modal-title"
//         aria-describedby="modal-description"
//       >
//         <Box className="flex flex-col items-center justify-center bg-white p-10 rounded-lg max-w-md mx-auto mt-20">
//           <h2 id="modal-title" className="text-xl font-bold mb-4">Please Push Button</h2>
//           <div id="modal-description" className="mb-6">
//             {/* <CoffeeAnimation className="w-20 h-20 animate-spin-slow" /> Coffee Cup Animation */}
//           </div>
//           <button onClick={handleModalClose} className="bg-green-500 text-white py-2 px-4 rounded">
//             Close
//           </button>
//         </Box>
//       </Modal>
//     </>
//   );
// }


import React, { useEffect, useState } from 'react';
import ProductCard from '../Product/ProductCard';
import logo from '../../../public/Photo/digibox_logo_login.jpg';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export default function Home() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [uiToken, setUiToken] = useState(null);  // State to hold uiToken value
  const [openModal, setOpenModal] = useState(false);  // State to control modal visibility
  const [progress, setProgress] = useState(0); // For progress bar

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    const fetchUiToken = async () => {
      const response = await fetch("https://digiboxcafe-server.onrender.com/api/vending/68d3c79b0435cc57850b6474");
      const data = await response.json();
      setUiToken(data.uiToken);  // Set uiToken value from API response
    };

    fetchUiToken();  // Fetch uiToken on component mount
    const intervalId = setInterval(fetchUiToken, 500); // Check every 500ms

    return () => {
      clearInterval(timer);
      clearInterval(intervalId);  // Clean up the interval on component unmount
    };
  }, []);

  useEffect(() => {
    if (uiToken === "false") {
      setOpenModal(true);  // Open modal only when uiToken is false
      let timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer); // Stop the timer once progress reaches 100
            setTimeout(() => {
              handleModalClose(); // Close the modal after 3 seconds
            }, 1000); // Delay to show full progress before closing
            return 100;
          }
          return prev + 3; // Increment progress
        });
      }, 100); // Increment progress every 100ms
    }
  }, [uiToken]);  // This effect runs when uiToken changes

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      {/* Navbar with green to orange gradient background and no hover effect */}
      <div className="bg-gradient-to-r from-green-400 to-orange-500 h-16 w-full flex justify-between items-center md:px-20 px-5 shadow-lg transform transition-all duration-500">
        <img src={logo} alt="logo" className="w-40 md:w-64 md:h-10 h-9" />
        <div className="text-white text-md md:text-xl flex space-x-4">
          <p className="px-2 md:px-3">{currentDateTime.toLocaleTimeString()}</p>
          <p>{formatDate(currentDateTime)}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:px-20 px-5 py-10 w-full h-full">
        {uiToken === "true" ? (
          <ProductCard />  // Show ProductCard only if uiToken is true
        ) : (
          <div 
            className="text-center text-red-500 bg-gray-200 p-10 rounded-lg pointer-events-none" 
            style={{ opacity: 0.6 }}>
            <div className="text-xl mb-4">Home page is currently unavailable.</div>
            <div>Please try again later.</div>
          </div>  // Display this if uiToken is false (Disabled Home Page)
        )}
      </div>

      {/* Modal for UI Token False */}
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="flex flex-col items-center justify-center bg-white p-10 rounded-lg max-w-md mx-auto mt-20">
          <h2 id="modal-title" className="text-xl font-bold mb-4">Please Push Button</h2>
          <div id="modal-description" className="mb-6">
            {/* <CoffeeAnimation className="w-20 h-20 animate-spin-slow" /> Coffee Cup Animation */}
          </div>
          <button onClick={handleModalClose} className="bg-green-500 text-white py-2 px-4 rounded">
            Close
          </button>
          {/* Progress Bar at the Bottom */}
          <div className="w-full mt-4 h-2 bg-gray-300 rounded-full">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${progress}%`, transition: 'width 0.1s' }}
            ></div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

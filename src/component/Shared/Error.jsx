import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Error({ description = "Please try again later.", show, onClose }) {
  const searchParams = new URLSearchParams(window.location.search);
  const message = searchParams.get('message') || 'An error occurred';
    const navigate = useNavigate();
   useEffect(() => {
      const timer = setTimeout(() => {
        navigate('/'); // Change to your target route
      }, 2000); // 2 seconds
  
      return () => clearTimeout(timer); // Cleanup
    }, [navigate]);

    // useEffect(() => {
    //   axios.patch(`https://digibox-server-29io.onrender.com/api/vending/6832ac756fb85a7094390c6a`, {
    //         onKey: null
    //       }).then(() => {
           
    //       }).catch((err) => {
    //         console.error("PATCH error", err);
    //       });
    // }, []);

    

    
            

  useEffect(() => {
    if (show) {
      setVisible(true);
      // Auto-hide after 3 seconds
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  const [visible, setVisible] = useState(true);
  return (
     <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div
        className={`bg-red-100 border border-red-400 text-red-700 p-6 rounded-xl shadow-lg max-w-sm w-full
          transform transition-all duration-300 ease-in-out text-center pointer-events-auto
          ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90 hidden"}`}
      >
        {/* Error Icon */}
        <div className="flex justify-center mb-4">
          <img
            src="https://img.icons8.com/color/48/error--v1.png"
            alt="Error"
            className="w-12 h-12"
          />
        </div>

        {/* Main Message */}
        <h2 className="text-lg font-semibold">{message}</h2>

        {/* Optional Description */}
        <p className="text-sm mt-2">{description}</p>
      </div>
    </div>
  )
}

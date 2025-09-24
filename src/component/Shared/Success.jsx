import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Success({
  message = "Your Purchase completed successfully!",
  description = "Thank You :).",
  show,
  onClose,
}) {
      const navigate = useNavigate();

      setTimeout(() => {
        localStorage.removeItem("selectedProductId");
        console.log("productId removed from localStorage");
      }, 1000);
    //  Patch request to backend
    //      useEffect(() => {
    //   axios.patch(`https://digibox-server-29io.onrender.com/api/vending/6832ac756fb85a7094390c6a`, {
    //         onKey: null
    //       }).then(() => {
           
    //       }).catch((err) => {
    //         console.error("PATCH error", err);
    //       });
    // }, []);
        useEffect(() => {
          const timer = setTimeout(() => {
            navigate('/'); // Change to your target route
          }, 2000); // 2 seconds

          return () => clearTimeout(timer); // Cleanup
        }, [navigate]);

       const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);


  return (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div
        className={`bg-green-100 border border-green-400 text-green-700 p-6 rounded-xl shadow-lg max-w-sm w-full
          transform transition-all duration-300 ease-in-out text-center pointer-events-auto
          ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90 hidden"}`}
      >
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <img
            src="https://img.icons8.com/color/48/ok--v1.png"
            alt="Success"
            className="w-12 h-12"
          />
        </div>

        {/* Success Message */}
        <h2 className="text-lg font-semibold">{message}</h2>

        {/* Optional Description */}
        <p className="text-sm mt-2">{description}</p>
      </div>
    </div>
  )
}

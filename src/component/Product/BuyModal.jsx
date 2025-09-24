import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bkash from '../../../public/Photo/bkash_payment_logo.png';
const API_URL = "https://digiboxcafe-server.onrender.com";
import {
  Modal,
  Box,
  Typography,
  Button,
  Fade,
  Backdrop,
  LinearProgress,
} from '@mui/material';

export default function BuyModal({ open, onClose, product }) {
  const TOTAL_TIME = 90; 
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_TIME);
  const [loading, setLoading] = useState(false);

  localStorage.setItem('selectedProductId', product?.product_id);

  // Countdown timer logic
  useEffect(() => {
    let interval, timeout;

    if (open && product?.availableProduct) {
      setSecondsLeft(TOTAL_TIME);

      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      timeout = setTimeout(() => {
        onClose(); 
      }, TOTAL_TIME * 1000);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [open, product?.id]);

  // Handle order confirmation
  const handleConfirmOrder = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/bkash/create-payment`, {
        amount: product.price, product_Id: product.product_id
      }, { withCredentials: true });

      window.location.href = res.data.bkashURL; // redirect to bKash gateway
    } catch (error) {
      console.error(error.response.data);
    }
  };

  if (!product) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: {
              xs: '90%',
              sm: '80%',
              md: 450,
              lg: 550,
            },
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
            textAlign: 'center',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
          }}
        >
          {product.availableProduct ? (
            <>
              <Typography variant="h5" className="text-green-600 font-semibold">
                Confirm Purchase
              </Typography>
              <img
                className="m-auto w-48 md:py-3 py-1"
                src={product.image}
                alt="product"
              />
              <Typography sx={{ mt: 2, fontWeight: 'bold' }}>
                <strong>{product.title}</strong>
              </Typography>
              <Typography
                className="text-green-600 md:py-3 pb-1"
                sx={{ mt: 1, fontSize: '2rem' }}
              >
                <span className="font-bolder">
                  <strong>৳</strong>{' '}
                </span>
                <strong>{product.price}</strong>
              </Typography>

              <img
                className="m-auto"
                width="70%"
                src={bkash}
                alt="qr code"
              />

              <Box mt={3} display="flex" justifyContent="space-between" flexDirection="column">
                <Button
                  sx={{
                    mb: 1,
                    background: 'linear-gradient(90deg, #28a745 0%, #ff9800 100%)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #218838 0%, #e65100 100%)',
                    },
                  }}
                  variant="contained"
                  onClick={handleConfirmOrder}
                  disabled={loading}
                >
                  {loading ? 'Placing Order...' : 'Confirm'}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={onClose}
                  sx={{ borderColor: '#f44336', color: '#f44336' }}
                >
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h3" color="error" gutterBottom>
                Out of Stock
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Sorry! This product is currently unavailable.
              </Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={onClose}
                sx={{ borderColor: '#f44336', color: '#f44336' }}
              >
                Close
              </Button>
            </>
          )}

          {/* Countdown display */}
          <Typography sx={{ mt: 1, color: 'gray', fontSize: '0.9rem' }}>
            Auto closing in {secondsLeft} second{secondsLeft !== 1 ? 's' : ''}...
          </Typography>

          <LinearProgress
            variant="determinate"
            value={((TOTAL_TIME - secondsLeft) / TOTAL_TIME) * 100}
            sx={{ mt: 1, mb: 2 }}
          />
        </Box>
      </Fade>
    </Modal>
  );
}


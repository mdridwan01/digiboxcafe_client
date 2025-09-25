import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ModernCard({ products, onBuyClick }) {
  const { product_id, title, subTitle, price, availableProduct, image } = products;
  //console.log(product_id, availableProduct)

  return (
    <Card
      className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.05] hover:rotate-1"
      sx={{
        width: {
          xs: '100%',
          sm: '100%',
          md: '100%',
          lg: '100%',
        },
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
        maxWidth: '345px',
        margin: '0 auto',
      }}
    >
      {/* Top Badge with dynamic background color */}
      <div
        className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-12 rounded-tl-lg rounded-br-lg flex items-center justify-center shadow-lg animate-pulse z-10 ${
          availableProduct
            ? 'bg-gradient-to-r from-green-400 to-orange-500'
            : 'bg-gradient-to-r from-red-500 to-yellow-600'
        }`}
      >
        <h1 className="text-white text-xl font-semibold"></h1>
      </div>

      {/* Subtitle with infinite sliding animation */}
      <Typography
        className="text-center text-slate-600 font-medium mt-20 animate-slide-right-to-left"
        sx={{
          fontSize: {
            xs: '1rem',
            sm: '1.1rem',
            md: '1.2rem',
            lg: '1.2rem',
          },
        }}
        gutterBottom
        component="div"
      >
        {subTitle}
      </Typography>

      {/* Product Image */}
      <CardMedia
        component="img"
        alt={title}
        image={image}
        className="m-auto rounded-xl shadow-lg mt-3"
        sx={{
          height: 'auto',
          width: {
            xs: '60%',
            sm: '70%',
            md: 200,
            lg: 220,
          },
        }}
      />

      {/* Modern Title with Gradient Background */}
      <CardContent>
        <Typography
          className="text-center font-extrabold tracking-wider bg-clip-text text-transparent from-indigo-500 via-pink-500 to-orange-500 animate-pulse"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: {
              xs: '1.2rem',
              sm: '1.4rem',
              md: '1.6rem',
              lg: '1.8rem',
            },
            backgroundImage: 'linear-gradient(to right, #FF6B6B, #FFD93D)',
            fontWeight: '700',
            letterSpacing: '0.5px',
            transition: 'none', // Remove hover effect
          }}
          gutterBottom
          component="div"
        >
          {title}
        </Typography>
      </CardContent>

      {/* Action Button */}
      <CardActions>
        {availableProduct ? (
          <Button
            sx={{
              borderRadius: '16px',
              background: 'linear-gradient(90deg, #28a745 0%, #ff9800 100%)',
              '&:hover': {
                background: 'linear-gradient(90deg, #218838 0%, #e65100 100%)',
              },
              transition: 'all 0.3s ease',
              width: '100%',
              fontWeight: 'bold',
            }}
            variant="contained"
            onClick={() => onBuyClick(products)}
          >
            ৳ {price}
          </Button>
        ) : (
          <Button
            sx={{
              borderRadius: '16px',
              background: 'linear-gradient(90deg, #ef4444 0%, #b91c1c 100%)',
              '&:hover': {
                background: 'linear-gradient(90deg, #dc2626 0%, #991b1b 100%)',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
              width: '100%',
              fontWeight: 'bold',
            }}
            variant="contained"
          >
            Out of Stock
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

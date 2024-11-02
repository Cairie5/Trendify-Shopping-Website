import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Snackbar,
  Box,
} from '@mui/material';

const ProductCard = ({ product, onAddToCart }) => {
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await onAddToCart(product.product_id);
      setSnackbarMessage('Added to cart!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      setSnackbarMessage('Failed to add to cart. Try again.');
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 200,
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s',
        '&:hover': { boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' },
        margin: '10px',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={product.image_url}  // Assuming product has an image_url property
          alt={product.title}
          sx={{ objectFit: 'cover' }}
        />
        <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
          }}
        >
          ${product.price}
        </Typography>
      </Box>
      <CardContent sx={{ padding: '10px', textAlign: 'center' }}>
        <Typography gutterBottom variant="subtitle1" fontWeight="bold">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Color: {product.color}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Stock: {product.stock_quantity}
        </Typography>
      </CardContent>
      <Button
        size="small"
        variant="contained"
        onClick={handleAddToCart}
        disabled={loading}
        sx={{
          bgcolor: '#2196F3',
          color: '#fff',
          borderRadius: '20px',
          margin: '10px auto',
          width: '80%',
          display: 'block',
          '&:hover': {
            bgcolor: '#1976D2',
          },
        }}
      >
        {loading ? 'Adding...' : 'Add to Cart'}
      </Button>

      {/* Snackbar for Feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Card>
  );
};

export default ProductCard;

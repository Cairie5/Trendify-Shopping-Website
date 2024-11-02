import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" component="div">
          Price: ${product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Stock Quantity: {product.stockQuantity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {product.category}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => onAddToCart(product)}
          sx={{ marginTop: 2 }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

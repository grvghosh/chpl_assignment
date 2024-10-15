import React from "react";
import productService from "./productService";

const ProductItem = ({ product }) => {
	const handleAddToCart = async () => {
		try {
			const cartItem = {
				productId: product.id,
				quantity: 1,
                description: product.description,
                image: product.image,
                title: product.title
			};

			await productService.addToCart(cartItem);
            
		} catch (error) {
			console.error("Error adding to cart:", error);
		}
	};

	return (
		<div style={{
			border: '1px solid #ccc',
			padding: '15px',
			borderRadius: '8px',
			width: '200px',
			textAlign: 'center'
		  }}>
			<img
			  src={product.image}
			  alt={product.title}
			  style={{ width: '200px', height: '100px', objectFit: 'cover', marginBottom: '10px' }}
			/>
			<h3 style={{ fontSize: '18px', margin: '10px 0' }}>{product.title}</h3>
			<p style={{ fontSize: '14px', color: '#555' }}>{product.description}</p>
			
			<button
			  onClick={handleAddToCart}
			  style={{
				backgroundColor: 'green',
				color: 'white',
				padding: '10px 15px',
				border: 'none',
				borderRadius: '5px',
				cursor: 'pointer',
			  }}
			>
			  Add to Cart
			</button>
		  </div>


	);
};

export default ProductItem;

import React, { useEffect, useState } from "react";
import productService from "./productService";
import ProductItem from "./ProductItem";

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState("");

	const fetchProducts = async () => {
		try {
			const data = await productService.getAllProducts();
			if (Array.isArray(data) && data.length > 0) {
				setProducts(data);
			} else {
				console.error("No products found");
			}
		} catch (error) {
			setError("Error fetching products.");
			console.error(error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);
	return (
		<div style={{ background: '#ff9900', padding: '20px', width: '1300px' }}>
			<h1>Available Products</h1>
			{error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
				{products.map((product) => (
					<ProductItem key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default ProductList;



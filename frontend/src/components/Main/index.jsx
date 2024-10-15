
import { useEffect, useState } from "react";
import productService from './productService';
import ProductList from "./ProductList";
import styles from "./styles.module.css";
import Cart from "./Cart";
const Main = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const data = await productService.getAllProducts();
				setProducts(data); 
			} catch (error) {
				setError("Failed to load products");
			}
		};

		fetchProducts();
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Welcome to your cart!</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			{error && <div className={styles.error_msg}>{error}</div>}
			<div style={{display: 'flex'}}>
			<ProductList products={products} />
			<Cart />
			</div>
		</div>
	);
};

export default Main;

import axios from "axios";
const apiUrl = "https://fakestoreapi.com";
const getAllProducts = async () => {
	try {
		const response = await axios.get(`${apiUrl}/products`);
		return response.data;
	} catch (error) {
		console.error("Error fetching products:", error);
		throw error;
	}
};

const addToCart = (cartItem) => {
	try {
		let cart = JSON.parse(localStorage.getItem("cart")) || [];
		const existingItemIndex = cart.findIndex(item => item.productId === cartItem.productId);
		if (existingItemIndex !== -1) {
			cart[existingItemIndex].quantity += cartItem.quantity;
		} else {
			cart.push(cartItem);
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		console.log("Item added to cart:", cartItem);
		return true;
	} catch (error) {
		console.error("Error adding to cart:", error);
		throw error;
	}
};
const productService = {
	getAllProducts,
	addToCart,
};

export default productService;

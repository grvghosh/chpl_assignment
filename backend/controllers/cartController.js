// const Cart = require('../models/cartModel');
// const Product = require('../models/productModel');

// // Add to cart
// exports.addToCart = async (req, res) => {
//     const { productId, quantity } = req.body;
//     const userId = req.user._id;

//     try {
//         const product = await Product.findById(productId);
//         if (!product || product.stock < quantity) {
//             return res.status(400).json({ message: 'Insufficient stock' });
//         }

//         let cart = await Cart.findOne({ userId });
//         if (!cart) {
//             cart = new Cart({ userId, items: [{ productId, quantity }] });
//         } else {
//             const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
//             if (itemIndex > -1) {
//                 cart.items[itemIndex].quantity += quantity;
//             } else {
//                 cart.items.push({ productId, quantity });
//             }
//         }

//         await cart.save();
//         res.status(200).json(cart);
//     } catch (err) {
//         res.status(500).json({ message: 'Server Error' });
//     }
// };

// // Get cart for user
// exports.getCart = async (req, res) => {
//     const userId = req.user._id;

//     try {
//         const cart = await Cart.findOne({ userId }).populate('items.productId');
//         if (!cart) {
//             return res.status(404).json({ message: 'Cart not found' });
//         }
//         res.status(200).json(cart);
//     } catch (err) {
//         res.status(500).json({ message: 'Server Error' });
//     }
// };


const { Cart } = require("../models/cartModel");
const { Product } = require("../models/productModel");

exports.addToCart = async (req, res) => {
	try {
		//const { error } = validateCartItem(req.body);
		if (error) return res.status(400).send({ message: error.details[0].message });

		const product = await Product.findById(req.body.productId);
		if (!product || product.stock < req.body.quantity)
			return res.status(400).send({ message: "Product not available or insufficient stock" });

		let cart = await Cart.findOne({ userId: req.user._id });
		if (!cart) {
			cart = new Cart({
				userId: req.user._id,
				items: [{ productId: req.body.productId, quantity: req.body.quantity }],
			});
		} else {
			const itemIndex = cart.items.findIndex(item => item.productId.toString() === req.body.productId);
			if (itemIndex > -1) {
				cart.items[itemIndex].quantity += req.body.quantity;
			} else {
				cart.items.push({ productId: req.body.productId, quantity: req.body.quantity });
			}
		}

		await cart.save();
		res.status(200).send({ message: "Product added to cart", data: cart });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

exports.getCart = async (req, res) => {
	try {
		const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");
		if (!cart) return res.status(404).send({ message: "Cart not found" });

		res.status(200).send(cart);
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

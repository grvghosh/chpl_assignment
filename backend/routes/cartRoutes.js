const router = require("express").Router();
const { Cart } = require("../models/cartModel");
const { Product } = require("../models/productModel");
const auth = require("../middleware/authMiddleware");
const Joi = require("joi");

// Add a product to the user's cart
router.post("/", auth, async (req, res) => {
	try {
		const { error } = validateCart(req.body);
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
});

// Get the user's cart
router.get("/", auth, async (req, res) => {
	try {
		const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");
		if (!cart) return res.status(404).send({ message: "Cart not found" });

		res.status(200).send(cart);
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// Validate cart request body
const validateCart = (data) => {
	const schema = Joi.object({
		productId: Joi.string().required().label("Product ID"),
		quantity: Joi.number().min(1).required().label("Quantity"),
	});
	return schema.validate(data);
};

module.exports = router;

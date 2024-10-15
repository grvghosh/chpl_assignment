const router = require("express").Router();
const { Product } = require("../models/productModel");
const auth = require("../middleware/authMiddleware");
const Joi = require("joi");

// Get all products with available stock
router.get("/", async (req, res) => {
	try {
		const products = await Product.find({ stock: { $gt: 0 } });
		res.status(200).send(products);
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// Add a new product (Admin protected)
router.post("/", auth, async (req, res) => {
	try {
		const { error } = validateProduct(req.body);
		if (error) return res.status(400).send({ message: error.details[0].message });

		const product = new Product(req.body);
		await product.save();
		res.status(201).send({ message: "Product created successfully", data: product });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// Update a product by ID (Admin protected)
router.put("/:id", auth, async (req, res) => {
	try {
		const { error } = validateProduct(req.body);
		if (error) return res.status(400).send({ message: error.details[0].message });

		const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!product) return res.status(404).send({ message: "Product not found" });

		res.status(200).send({ message: "Product updated successfully", data: product });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// Delete a product by ID (Admin protected)
router.delete("/:id", auth, async (req, res) => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id);
		if (!product) return res.status(404).send({ message: "Product not found" });

		res.status(200).send({ message: "Product deleted successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// Validate product data
const validateProduct = (data) => {
	const schema = Joi.object({
		name: Joi.string().required().label("Product Name"),
		description: Joi.string().required().label("Product Description"),
		images: Joi.array().items(Joi.string()).label("Images"),
		stock: Joi.number().min(0).required().label("Stock"),
	});
	return schema.validate(data);
};

module.exports = router;

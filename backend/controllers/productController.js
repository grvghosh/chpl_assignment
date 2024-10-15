// const Product = require('../models/productModel');

// // Get all products with available stock
// exports.getProducts = async (req, res) => {
//     try {
//         const products = await Product.find({ stock: { $gt: 0 } });
//         res.status(200).json(products);
//     } catch (err) {
//         res.status(500).json({ message: 'Server Error' });
//     }
// };

// // Create a new product
// exports.createProduct = async (req, res) => {
//     const { name, description, images, stock } = req.body;

//     try {
//         const newProduct = new Product({ name, description, images, stock });
//         await newProduct.save();
//         res.status(201).json(newProduct);
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to create product' });
//     }
// };

// // Update a product
// exports.updateProduct = async (req, res) => {
//     const { id } = req.params;
//     const { name, description, images, stock } = req.body;

//     try {
//         const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, images, stock }, { new: true });
//         res.status(200).json(updatedProduct);
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to update product' });
//     }
// };

// // Delete a product
// exports.deleteProduct = async (req, res) => {
//     const { id } = req.params;

//     try {
//         await Product.findByIdAndDelete(id);
//         res.status(200).json({ message: 'Product deleted' });
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to delete product' });
//     }
// };


const { Product } = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({ stock: { $gt: 0 } });
		res.status(200).send(products);
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

exports.createProduct = async (req, res) => {
	try {
		const { error } = validateProduct(req.body);
		if (error) return res.status(400).send({ message: error.details[0].message });

		const product = new Product(req.body);
		await product.save();
		res.status(201).send({ message: "Product created successfully", data: product });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

exports.updateProduct = async (req, res) => {
	try {
		const { error } = validateProduct(req.body);
		if (error) return res.status(400).send({ message: error.details[0].message });

		const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!product) return res.status(404).send({ message: "Product not found" });

		res.status(200).send({ message: "Product updated successfully", data: product });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

exports.deleteProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id);
		if (!product) return res.status(404).send({ message: "Product not found" });

		res.status(200).send({ message: "Product deleted successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

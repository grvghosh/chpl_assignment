// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     images: [String], // Array of image URLs
//     stock: { type: Number, required: true }, // Product stock
// }, { timestamps: true });

// module.exports = mongoose.model('Product', productSchema);

const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	images: [{ type: String }], // Array of image URLs
	stock: { type: Number, required: true }, // Stock available for the product
});

const validateProduct = (product) => {
	const schema = Joi.object({
		name: Joi.string().required().label("Product Name"),
		description: Joi.string().required().label("Description"),
		images: Joi.array().items(Joi.string()).label("Images"),
		stock: Joi.number().min(0).required().label("Stock"),
	});
	return schema.validate(product);
};

const Product = mongoose.model("Product", productSchema);
module.exports = { Product, validateProduct };

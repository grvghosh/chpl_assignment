// const mongoose = require('mongoose');

// const cartSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     items: [
//         {
//             productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//             quantity: { type: Number, required: true },
//         }
//     ],
// }, { timestamps: true });

// module.exports = mongoose.model('Cart', cartSchema);


const mongoose = require("mongoose");
const Joi = require("joi");

const cartSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	items: [
		{
			productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
			quantity: { type: Number, required: true, min: 1 },
		},
	],
});

const Cart = mongoose.model("Cart", cartSchema);

const validateCartItem = (cartItem) => {
	const schema = Joi.object({
		productId: Joi.string().required().label("Product ID"),
		quantity: Joi.number().min(1).required().label("Quantity"),
	});
	return schema.validate(cartItem);
};

module.exports = { Cart, validateCartItem };

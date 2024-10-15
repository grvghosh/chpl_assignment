const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
	try {
		const token = req.header("x-auth-token"); // Token is expected in the request header
		if (!token) return res.status(401).send({ message: "Access Denied. No token provided." });

		const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY); // Verify the JWT token
		req.user = decoded; // Attach decoded user to request object
		next();
	} catch (error) {
		res.status(400).send({ message: "Invalid token." });
	}
};

module.exports = auth;

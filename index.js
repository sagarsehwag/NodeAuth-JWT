const express = require("express");
const jwt = require("jsonwebtoken");

// App Init
const app = express();

app.get("/", (req, res) => {
	res.json("Welcome to the API");
});

function verifyToken(req, res, next) {
	const bearerHeader = req.headers["authorization"];

	if (typeof bearerHeader !== "undefined") {
		req.token = bearerHeader.split(" ")[1];
		next();
	} else {
		return res.sendStatus(403);
	}
}

app.post("/api/posts", verifyToken, (req, res) => {
	jwt.verify(req.token, "SECRET", (err, authData) => {
		if (err) {
			res.sendStatus(403);
		} else {
			res.json({
				message: "Post Created...",
				authData: authData
			});
		}
	});
});

app.post("/api/login", (req, res) => {
	const user = {
		id: 1,
		username: "sagarsehwag",
		email: "isagarsehwag@gmail.com"
	};

	jwt.sign({ user: user }, "SECRET", { expiresIn: "1 day" }, (err, token) => {
		if (err) {
			return res.json({
				message: err
			});
		} else {
			res.json({
				token: token
			});
		}
	});
});

app.listen(5000, () => {
	console.log("Server Started on 5000");
});

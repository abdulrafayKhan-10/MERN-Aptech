const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const userController = require("./controllers/userController");
const productController = require("./controllers/productController");
const Role = require("./models/roleModel");
const connectDB = require("./config/db");
connectDB();

app.use(cors());

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type"], 
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());


app.route("/api/roles").get(async(req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching roles', error: error.message });
    }
})
app.route("/api/user").get(userController.getUsers).post(userController.createUser);
app.route("/api/user/:id").get(userController.getUserById).put(userController.updateUser).delete(userController.deleteUser);
app.route("/api/products").get(productController.getProducts).post(productController.createProduct);
app.route("/api/products/:id").get(productController.getProductById).put(productController.updateProduct).delete(productController.deleteProduct)
app.route("/api/user/login").post(userController.loginUser);



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

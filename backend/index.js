const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { createUser,getUsers,getUserById,updateUser,deleteUser} = require("./controllers/userController");
const {getHome} = require("./controllers/homeController");
const connectDB = require("./config/db");
connectDB();

app.use(express.json());

app.use(cors());


app.get("/", getHome)
app.route("/user").get(getUsers).post(createUser);
app.route("/user/:id").get(getUserById).put(updateUser).delete(deleteUser);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`	)
}
)
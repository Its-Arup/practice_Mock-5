const express = require("express");
const { Server_Connections } = require("./Db");
const { userRouter } = require("./Routes/user.route");
const { productRoute } = require("./Routes/product.route");
require("dotenv").config();
const app = express();

app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/users", userRouter);
app.use("/products", productRoute)

app.listen(PORT, async () => {
  try {
    await Server_Connections;
    console.log("server is running on port :", PORT);
  } catch (error) {
    console.log(error);
  }
});

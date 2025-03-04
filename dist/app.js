import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import { config } from "dotenv";
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
import morgan from "morgan";
config({
    path: "./.env"
});
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI || "";
connectDB(mongoURI);
export const myCache = new NodeCache();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
    res.send("API Working with /api/v1");
});
//using routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", userRoute);
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`Express is Working on http://localhost:${port}`);
});

import express from "express";
import { userRouter } from "./routes/user.route.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4080;

app.use("/users", userRouter);

app.listen(PORT, () => {
    console.log("Server is running ", PORT);
});

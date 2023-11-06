import express from "express";
import { userRouter } from "./routes/user.route.js";
import dotenv from "dotenv";
import { GlobalError } from "./middlewares/global-error.middleware.js";
import { projectRouter } from "./routes/project.route.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4080;

app.use("/users", userRouter);
app.use("/projects", projectRouter);
app.use(GlobalError.handle);

app.listen(PORT, () => {
    console.log("Server is running ", PORT);
});

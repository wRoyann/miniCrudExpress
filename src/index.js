import dotenv from "dotenv";
import express from "express";
import { notFound, errorHandler } from "./middlewares/index.js";
import { connectDB } from "./config/db.js";
import routes from "./routes/index.js";
import cookiesparser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiesparser());

// untuk routing.
app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server berjalan di http://localhost:${PORT}`);
    });
});

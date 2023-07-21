import express from "express";
import dotenv from "dotenv";
import tasksRoutes from "./routes/tasks.js";
import { connectDB } from "./db/connect.js";
import { notFound } from "./middleware/not-found.js";
import { errorHandler } from "./middleware/error-handler.js";

const app = express();
dotenv.config();

// middleware
app.use(express.static("./public"));
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasksRoutes);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

// start the server only if connection with database is established
const startBackendServer = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () => {
			console.log(`Server is running at Port ${port}...`);
		});
	} catch (error) {
		console.log(error);
	}
};

startBackendServer();

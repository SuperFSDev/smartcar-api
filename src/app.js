import express from "express";
import router from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());

app.use("/vehicles", router);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

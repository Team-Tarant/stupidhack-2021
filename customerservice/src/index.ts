require('dotenv').config()
import express from "express";
import cors from "cors";
import pingRouter from "./routes/ping";
import customerServiceRouter from "./routes/customerservice";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
app.use("/api/ping", pingRouter);
app.use("/api/customerservice", customerServiceRouter);
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
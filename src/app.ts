import express, { Request, Response } from "express";
import router from "./router";
const app = express();

app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use("/", (req: Request, res: Response, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/v1", router);

// Start server
app.listen(3000, (port: number = 3000) => {
  console.log(`Server running on Port ${port}`);
});

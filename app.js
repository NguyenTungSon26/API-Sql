const express = require("express");
const queryController = require("./controller/queryController");
const queryMiddleWare = require("./middleware/query.middleware");
const app = express();

// khai báo endpoint GET "/films" để trả về danh sách phim và số lần thuê của chúng
app.get("/actor/name", queryController.query1, queryMiddleWare);
app.get("/1.2", queryController.query2, queryMiddleWare);
app.get("/1.3", queryController.query3);
app.get("/1.4", queryController.query4);
app.get("/1.5", queryController.query5);
app.get("/1.6", queryController.query6);
app.get("/1.7", queryController.query7);
app.get("/1.8", queryController.query8);
app.get("/2.1", queryController.query9);
app.get("/2.2", queryController.query10);
app.get("/2.3", queryController.query11);
app.get("/2.4", queryController.query12);
app.get("/2.5", queryController.query13);
app.get("/2.6", queryController.query14);
app.get("/2.7", queryController.query15);
app.get("/2.8", queryController.query16);
app.get("/2.9", queryController.query17);
app.get("/2.10", queryController.query18);
app.get("/3.1", queryController.query19);
app.get("/3.2", queryController.query20);
app.get("/3.3", queryController.query21);
app.get("/3.4", queryController.query22);
app.get("/3.5", queryController.query23);
app.get("/3.6", queryController.query24);
app.get("/3.7", queryController.query25);
app.get("/3.8", queryController.query26);
app.get("/3.9", queryController.query27);
app.get("/3.10", queryController.query28);

// Start server
app.listen((port = 8000), function () {
  console.log(`Server running on port ${port}`);
});

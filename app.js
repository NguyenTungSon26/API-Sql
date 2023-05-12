const express = require("express");
const queryController = require("./controller/queryController");
const app = express();

// khai báo endpoint GET "/films" để trả về danh sách phim và số lần thuê của chúng
app.get("/test", queryController.test);
app.get("/test1", queryController.test1);

// Start server
app.listen((port = 8000), function () {
  console.log(`Server running on port ${port}`);
});

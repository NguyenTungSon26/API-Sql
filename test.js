const express = require("express");
const filmController = require("./controller/testController");
const app = express();

// khai báo endpoint GET "/films" để trả về danh sách phim và số lần thuê của chúng
app.get("/films", filmController.test);

// Start server
app.listen((port = 8000), function () {
  console.log(`Server running on port ${port}`);
});

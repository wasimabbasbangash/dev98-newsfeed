const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

const blogs = require("./routes/blogsRoute");
const app = express();

app.use(cors({ origin: "*" }));
app.use(blogs);

app.listen(8080);

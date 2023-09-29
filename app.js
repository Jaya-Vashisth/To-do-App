const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const ratelimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const routes = require("./routes/userRoutes");

dotenv.config({ path: "./config.env" });

//start express app
const app = express();

const port = process.env.PORT || 1101;
const DB = process.env.DATABASE;

//mongodb connection
mongoose.connect(DB).then((con) => {
  console.log("connected to Database");
});

//GLOBAL MIDDLEWARES

//set security http header
app.use(helmet());

//develoment logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//limit request from same API
const limiter = ratelimit({
  max: 200,
  windosMs: 60 * 60 * 1000,
  message: "Too many requests from this IP. Please try again in an hour",
});

//body parser , reading data from body into req.body
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(cookieParser());

//data sanitization against NoSQL query injection
app.use(mongoSanitize());

//data sanitization against XSS
app.use(xss());

app.use("/", routes);

//handler for url that are not define
app.use("*", (req, res) => {
  return res.status(400).json({
    status: "Failed",
    message: `Cann't find ${req.originalUrl} on the server`,
  });
});

//sever
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

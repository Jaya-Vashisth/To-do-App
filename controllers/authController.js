const { decrypt } = require("dotenv");
const User = require("./../models/usermodel");
const jwt = require("jsonwebtoken");

//create jwt token
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

//user sing up
exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    console.log("i m here before token");

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  //check email and password entered
  if (!email || !password) {
    res.status(400).json({
      status: "fail",
      message: "Please provide email and password",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  //check if email and password exist
  if (!user || !(await user.correctPassword(user.password, password))) {
    res.status(400).json({
      status: "fail",
      message: "Incorrect email or  password",
    });
  }

  //create token
  const token = signToken(user._id);

  //send login token
  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

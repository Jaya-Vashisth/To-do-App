const User = require("./../models/usermodel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

//create jwt token
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

//send token in cookies for testing through postman sending in response too
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  //cookie option setting
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  //currently in development env hence secure:false
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  //remove the password from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
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

    createSendToken(newUser, 201, res);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

//login handle
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  //1) check if email and password exist
  if (!email || !password)
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password",
    });

  //2) check if user exist
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(201).json({
      status: "fail",
      message: "Incorrect Email or Password !",
    });
  }

  //3) if everything ok ,send token to client
  createSendToken(user, 200, res);
};

//Protect the routes (only login users can acces some of the pages)

exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;

  //for postman authorization testing
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  //token in cookies
  else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    res.status(401).json({
      status: "fail",
      message: "You are not Logged in Please login to get access",
    });
  }

  // 2) Verification of token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    res.status(401).json({
      status: "fail",
      message: "User no longer axist",
    });
  }

  // 4) Check if user changed password after the token was issued can be implemented in future
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    res.status(401).json({
      status: "fail",
      message: "User recently changed Password!",
    });
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
};

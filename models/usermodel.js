const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide Name"],
  },

  password: {
    type: String,
    required: [true, "Please provide Password"],
    minlength: 8,
    select: false,
  },

  confirmPassword: {
    type: String,
    required: [true, "Please confirm your Password"],
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: "confirm password is not same as Password!",
    },
  },

  email: {
    type: String,
    required: [true, "please provide your email"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
    lowercase: true,
  },
});

//hash the password
UserSchema.pre("save", async function (next) {
  //only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
  next();
});

UserSchema.methods.correctPassword = async function (
  validPassword,
  loginPassword
) {
  return await bcrypt.compare(loginPassword, validPassword);
};

User = mongoose.model("User", UserSchema);

module.exports = User;

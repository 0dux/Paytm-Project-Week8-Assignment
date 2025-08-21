const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../config/.env") });

mongoose
  .connect(process.env.MONGO_CONNECTION_URL)
  .then(() => {
    console.log("✅ Database connected succesfully!!! ✅");
  })
  .catch((error) => {
    console.log("❌ Some error has occured while connecting ❌ :" + error);
    return;
  });

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    minLength: 3,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
});

const User = mongoose.model("User", userSchema);

const accountsSchema = mongoose.Schema({
  userId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", accountsSchema);

module.exports = {
  User,
  Account,
};

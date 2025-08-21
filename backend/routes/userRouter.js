const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const z = require("zod");
const path = require("path");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db/db.js");
const authUser = require("../middleware/authMiddleware.js");

dotenv.config({ path: path.resolve(__dirname, "../config/.env") });

const JWT_SECRET = process.env.JWT_SECRET;

//SignUp Request-------------------------------------------------------------------------------------------------------------------------

const signupSchema = z.object({
  email: z.string().email().min(3).trim().max(50),
  password: z.string().min(6).trim(),
  firstName: z.string().min(3).trim().max(50),
  lastName: z.string().min(3).trim().max(50),
});

router.post("/signup", async (req, res) => {
  const dataObj = req.body;

  if (!signupSchema.safeParse(dataObj).success) {
    res.status(411).json({
      message: "Invalid data entered!!, Rejected on input validation",
    });
    return;
  }

  const { email } = dataObj;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(411).json({
      message: "Email already used or user already exists",
    });
    return;
  }

  const user = await User.create(dataObj);
  const userId = user._id;
  const token = jwt.sign({ userId }, JWT_SECRET);

  await Account.create({
    userId: userId,
    balance: 1 + Math.random() * 1000,
  });

  res.json({
    token: token,
    message: "User created succesfully",
  });
});

//Signin Request-------------------------------------------------------------------------------------------------------------------------

const signinSchema = z.object({
  email: z.string().email().min(3).trim().max(50),
  password: z.string().min(6).trim(),
});

router.post("/signin", async (req, res) => {
  const dataObj = req.body;
  if (!signinSchema.safeParse(dataObj).success) {
    res.status(411).json({
      message: "Invalid data entered!!, Rejected on input validation",
    });
    return;
  }
  const { email, password } = dataObj;

  const existingUser = await User.findOne({ email, password });
  if (existingUser == null) {
    res.status(411).json({
      message: "User doesn't exist / email or password is incorrect",
    });
    return;
  }

  const userId = existingUser._id;

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.json({
    token: token,
  });
});

//Update User Information-------------------------------------------------------------------------------------------------------------

const updateSchema = z.object({
  password: z.string().min(6).trim().optional(),
  firstName: z.string().min(3).trim().max(50).optional(),
  lastName: z.string().min(3).trim().max(50).optional(),
});

router.put("/update", authUser, async (req, res) => {
  const dataObj = req.body;
  if (
    !updateSchema.safeParse(dataObj).success ||
    Object.keys(dataObj).length === 0
  ) {
    res.status(411).json({
      message:
        "Invalid inputs entered or empty object recieved - rejected during input validation",
    });
    return;
  }
  const userId = req.userId;

  const user = await User.findOne({ _id: userId });
  if (!user) {
    res.status(411).json({
      message: "Invalid userId / user not found",
    });
    return;
  }
  await User.findByIdAndUpdate(userId, { $set: dataObj });
  res.json({
    message: "User updated succesfully!!!",
  });
  return;
});

//Get users---------------------------------------------------------------------------------------------------------------------------

router.get("/bulk", authUser, async (req, res) => {
  const filter = req.query.filter || "";
  const userId = req.userId;
  try {
    const users = await User.find({
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
      ],
    });

    res.json({
      users: users
        .filter((user) => userId !== user._id.toString()) // keep only others
        .map((user) => ({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        })),
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
});

module.exports = router;

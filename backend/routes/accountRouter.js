const express = require("express");
const authUser = require("../middleware/authMiddleware");
const { Account, User } = require("../db/db");
const router = express.Router();
const mongoose = require("mongoose");

//Balance request------------------------------------------------------------------------------------------------------------------------
router.get("/balance", authUser, async (req, res) => {
  const userId = req.userId;
  const user = await User.find({ _id: userId });
  const accountData = await Account.find({ userId });

  res.json({
    balance: accountData[0].balance,
    firstName: user[0].firstName,
    message: "Your balance is :" + accountData[0].balance,
  });
});

//transfer request-----------------------------------------------------------------------------------------------------------------------
router.post("/transfer", authUser, async (req, res) => {
  const fromUserId = req.userId;
  const { to, amount } = req.body.to;
  const transferAmount = parseInt(amount);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // 1. Fetch sender
    const user = await Account.findOne({ userId: fromUserId }).session(session);

    if (!user || user.balance < transferAmount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // 2. Fetch receiver
    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res
        .status(400)
        .json({ message: "Receiver account doesn't exist" });
    }

    // 3. Update balances
    await Account.updateOne(
      { userId: fromUserId },
      { $inc: { balance: -transferAmount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: transferAmount } }
    ).session(session);

    // 4. Commit
    await session.commitTransaction();
    res.json({ message: "Transfer successful" });
  } catch (error) {
    await session.abortTransaction();
    console.error("Transfer failed ❌", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    session.endSession();
  }
});

module.exports = router;

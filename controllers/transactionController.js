import Transaction from "../models/TransactionModel.js";

export const getTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Pagination
    const transactions = await Transaction.find({ user: req.user.id })
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Transaction.countDocuments({ user: req.user.id });

    res.status(200).json({ success: true, data: transactions, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });

    const totalIncome = transactions
      .filter((t) => t.transactionType === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.transactionType === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    res
      .status(200)
      .json({
        success: true,
        data: {
          totalIncome,
          totalExpenses,
          balance: totalIncome - totalExpenses,
        },
      });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

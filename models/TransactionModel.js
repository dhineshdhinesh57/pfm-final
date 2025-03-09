import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, min: 1 },
  category: { type: String, required: true },
  description: { type: String },
  transactionType: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  date: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  aiCategory: { type: String }, // AI-based categorization (Future Feature)
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;

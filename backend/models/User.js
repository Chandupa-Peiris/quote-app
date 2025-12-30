
const mongoose = require("mongoose");

/**
 * Reusable sub-schema for a quote
 * This will be used for favorites and dailyQuote
 */
const quoteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      default: "Unknown",
      trim: true
    },
    savedAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false } // prevents MongoDB from creating _id for sub-documents
);

/**
 * User schema
 */
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      trim: true
    },

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    favorites: {
      type: [quoteSchema],
      default: []
    },

    dailyQuote: {
      type: quoteSchema,
      default: null
    }
  },
  {
    timestamps: true
  }
);

/**
 * Export User model
 */
module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
});

const TeamRegistrationSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
      trim: true,
    },
    collegeName: {
      type: String,
      required: true,
      trim: true,
    },
    studentClass: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    problemStatementId: {
      type: String,
      required: true,
    },
    members: {
      type: [MemberSchema],
      validate: [arr => arr.length > 0 && arr.length <= 4, "Team must have 1-4 members"],
    },
    registrationFee: {
      type: Number,
      default: 300,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeamRegistration", TeamRegistrationSchema);

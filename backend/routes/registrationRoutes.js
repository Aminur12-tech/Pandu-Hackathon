const express = require("express");
const router = express.Router();
const TeamRegistration = require("../models/TeamRegistration");

// POST: Register Team
router.post("/register", async (req, res) => {
  try {
    const {
      teamName,
      collegeName,
      studentClass,
      address,
      selectedProblem,
      members,
    } = req.body;

    // Basic validation
    if (
      !teamName ||
      !collegeName ||
      !studentClass ||
      !address ||
      !selectedProblem ||
      !members ||
      members.length === 0
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRegistration = new TeamRegistration({
      teamName,
      collegeName,
      studentClass,
      address,
      problemStatementId: selectedProblem,
      members,
    });

    await newRegistration.save();

    res.status(201).json({
      success: true,
      message: "Team registered successfully",
      data: newRegistration,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;

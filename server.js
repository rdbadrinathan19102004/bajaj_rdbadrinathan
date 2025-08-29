const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Helper function to check if a character is alphabetic
function isAlpha(char) {
  return /^[A-Za-z]$/.test(char);
}

// Helper function to check if a character is numeric
function isNumeric(char) {
  return /^[0-9]$/.test(char);
}

// Helper function to check if a character is special
function isSpecialChar(char) {
  return !isAlpha(char) && !isNumeric(char);
}

// Main POST endpoint
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    // Validate input
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input: 'data' should be an array",
      });
    }

    // Initialize arrays and variables
    const oddNumbers = [];
    const evenNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;
    const allAlphabets = [];

    // Process each element in the data array
    data.forEach((item) => {
      const str = String(item);

      // Check if the entire string is a number
      if (!isNaN(str) && str.trim() !== "") {
        const num = parseInt(str);
        if (num % 2 === 0) {
          evenNumbers.push(str);
        } else {
          oddNumbers.push(str);
        }
        sum += num;
      } else {
        // Process each character in the string
        for (let char of str) {
          if (isAlpha(char)) {
            alphabets.push(char.toUpperCase());
            allAlphabets.push(char);
          } else if (isSpecialChar(char)) {
            specialCharacters.push(char);
          }
        }
      }
    });

    // Create concatenated string with alternating caps in reverse order
    let concatString = "";
    const reversedAlphabets = allAlphabets.reverse();

    reversedAlphabets.forEach((char, index) => {
      if (index % 2 === 0) {
        concatString += char.toLowerCase();
      } else {
        concatString += char.toUpperCase();
      }
    });

    // Response object
    const response = {
      is_success: true,
      user_id: "rdbadrinathan_19102004", // Replace with your actual details
      email: "badrinathan.rd2022@vitstudent.ac.in", // Replace with your actual email
      roll_number: "22bce3955", // Replace with your actual roll number
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialCharacters,
      sum: sum.toString(),
      concat_string: concatString,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({
      is_success: false,
      message: "Internal server error",
    });
  }
});

// GET endpoint for testing
app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "BFHL API is running!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

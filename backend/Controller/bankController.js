const axios = require("axios");
const users = require("../Models/userSchema");

exports.verifyAccount = async (req, res) => {
  const { accountNumber, ifsc } = req.body;
//  console.log(email)
const email='sreyas.sc@gmail.com'
  console.log(accountNumber, email, ifsc);

  if (!accountNumber || !ifsc || !email) {
    return res
      .status(400)
      .json({ message: "Account number, IFSC code and email are required" });
  }

  const options = {
    method: "POST",
    url: "https://indian-bank-account-verification.p.rapidapi.com/v3/tasks/async/verify_with_source/validate_bank_account",
    headers: {
      "x-rapidapi-key": "961a5b12ecmsh06628088916a8f5p17377djsna2999a8e5d6b",
      "x-rapidapi-host": "indian-bank-account-verification.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      task_id: "123",
      group_id: "1234",
      data: {
        bank_account_no: accountNumber,
        bank_ifsc_code: ifsc,
      },
    },
  };

  try {
    console.log("try");
    const response = await axios.request(options);
    console.log(response.data);
    const requestId = response.data.request_id;

    if (!requestId) {
      return res
        .status(400)
        .json({ message: "Failed to initiate bank verification" });
    }

    const optionsTask = {
      method: "GET",
      url: "https://indian-bank-account-verification.p.rapidapi.com/v3/tasks",
      params: {
        request_id: requestId,
      },
      headers: {
        "x-rapidapi-key": "f1a8304e44mshb99b7af6784fb28p1a817ajsn580087d49d1f", // Use environment variables for sensitive data
        "x-rapidapi-host": "indian-bank-account-verification.p.rapidapi.com",
      },
    };

    const responseTask = await axios.request(optionsTask);
    console.log(responseTask.data);
    if (responseTask.status == "200") {
      const userData = await users.findOneAndUpdate(
        { email },
        { accountNumber, ifsc, account_verify: true },
        { new: true }
      );

      if (!userData) {
        return res.status(404).json({ message: "User Not Found" });
      }
      return res.status(200).json({ message: "GST Verified" });
    } else {
      // If verification fails
      return res.status(404).json({ message: "Invalid Account Number" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something Went Wrong" });
  }
};
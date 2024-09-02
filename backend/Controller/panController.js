
const axios = require('axios');
const users = require('../Models/userSchema'); // Ensure the correct path

exports.verifyPanCard = async (req, res) => {
    const { pan, email } = req.body; // Include email in the request body
    console.log(pan, email);

    if (!pan) {
        return res.status(400).json({ message: "PAN Card number is required" });
    }

    const panCardPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panCardPattern.test(pan)) {
        return res.status(400).json({ message: "Invalid PAN Card format" });
    }

    const options = {
        method: 'POST',
        url: 'https://aadhaar-number-verification-api-using-pan-number.p.rapidapi.com/api/validation/pan_to_aadhaar',
        headers: {
            'x-rapidapi-key': '067729ede1mshd3cbe5f1764515ap1c14fajsn824affe75c15',
            'x-rapidapi-host': 'aadhaar-number-verification-api-using-pan-number.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            pan,
            consent: 'y',
            consent_text: 'I hereby declare my consent agreement for fetching my information via AITAN Labs API'
        }
    };

    try {
        const response = await axios.request(options);
        
        if (response.status !== 200) {
            return res.status(response.status).json({ message: "Failed to verify PAN Card", details: response.data });
        }

        if (response.data.pan) {
            const user = await users.findOneAndUpdate(
                { email: email }, // Update user by email
                { 
                    $set: { 
                        pan_verify: true,
                        pan: pan 
                    } 
                },
                { new: true } // Return the updated document
            );

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            

            // Update session storage if necessary
            req.session.user = {
                ...req.session.user,
                pan: pan,
                pan_verify: true
            };

            return res.json(response.data);
        } else {
            return res.status(404).json({ message: "PAN Card does not exist" });
        }
    } catch (error) {
        console.error('Error verifying PAN:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

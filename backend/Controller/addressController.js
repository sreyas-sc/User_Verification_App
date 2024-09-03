const https = require('https');
const users = require('../Models/userSchema');

exports.getPincodeDetails = async (req, res) => {
    // Extract pincode from request params
    const { pincode } = req.params; 
    // const email = req.body;
    const { email } = req.body;
    console.log(email);

    try {

            const options = {
                method: 'GET',
                hostname: 'india-pincode-with-latitude-and-longitude.p.rapidapi.com',
                port: null,
                path: `/api/v1/pincode/${pincode}`, 
                headers: {
                    'x-rapidapi-key': '067729ede1mshd3cbe5f1764515ap1c14fajsn824affe75c15', 
                    'x-rapidapi-host': 'india-pincode-with-latitude-and-longitude.p.rapidapi.com'
                },
                // Set a timeout of 5 seconds
                timeout: 5000 
            };

            const apiReq = https.request(options, function (apiRes) {
                let body = '';

                // Collect response data
                apiRes.on('data', (chunk) => {
                    body += chunk;
                });

                apiRes.on('end', async function () {
                    try {
                        // Check content type
                        if (apiRes.headers['content-type'] && apiRes.headers['content-type'].includes('application/json')) {
                            if (body) {
                                // Attempt to parse the response body
                                const response = JSON.parse(body);

                                if (Array.isArray(response) && response.length === 0) {
                                    // No data found for the given pincode
                                    res.status(404).json({ message: 'Pincode not found' });
                                } else {
                                    // Save the pincode in the database
                                    await users.updateOne({ email: email }, { $set: { address: pincode , address_verify: true} });
                                    res.json({ message: 'Pincode verified and updated successfully', response });
                                }
                            } else {
                                // Empty response body
                                res.status(204).json({ message: 'No content returned from API' });
                            }
                        } else {
                            // Unexpected content type
                            res.status(500).json({ message: 'Unexpected response format', response: body });
                        }
                    } catch (parseError) {
                        console.error(`Error parsing response: ${parseError.message}`);
                        res.status(500).json({ message: 'Error parsing API response', error: parseError.message });
                    }
                });
            });

            apiReq.on('error', (e) => {
                console.error(`Problem with request: ${e.message}`);
                res.status(500).json({ message: 'Internal server error', error: e.message });
            });

            apiReq.on('timeout', () => {
                console.error('Request timed out');
                apiReq.abort(); // Abort the request
                res.status(504).json({ message: 'Request timed out' });
            });

            apiReq.end();
        
    } catch (error) {
        console.error(`Unexpected error: ${error.message}`);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
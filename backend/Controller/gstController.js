const users = require('../Models/userSchema');
const https = require('https');

exports.verifyGst = async(req, res) => {
    const { gstin, email } = req.body; // Extract GSTIN from the request body
    // const userId = req.payload;
    console.log(gstin, email);


    const existingUser = await users.findOne({ email: email });
    if(existingUser){
        const options = {
            method: 'POST',
            hostname: 'gst-verification.p.rapidapi.com',
            port: null,
            path: '/v3/tasks/sync/verify_with_source/ind_gst_certificate',
            headers: {
                'x-rapidapi-key': '067729ede1mshd3cbe5f1764515ap1c14fajsn824affe75c15', 
                'x-rapidapi-host': 'gst-verification.p.rapidapi.com',
                'Content-Type': 'application/json'
            }
        };
    
        const apiReq = https.request(options, (apiRes) => {
            const chunks = [];
    
            apiRes.on('data', (chunk) => {
                chunks.push(chunk);
            });
    
            apiRes.on('end', async() => {
                const body = Buffer.concat(chunks);
                try {
                    const response = JSON.parse(body.toString());
                    if(response.status == 'completed'){
                        await users.updateOne({ email: email }, { $set: { gst_verify: true, gst: gstin } });
                        res.json({ message: 'GST verified', response });
                    }
                    else{
                        res.status(400).json({ message: 'GST verification failed', response });
                    }
                } catch (error) {
                    res.status(500).json({ message: 'Error parsing API response', error: error.message });
                }
            });
        });
    
        apiReq.on('error', (e) => {
            console.error(`Problem with request: ${e.message}`);
            res.status(500).json({ message: 'Internal server error', error: e.message });
        });
    
        apiReq.write(JSON.stringify({
            task_id: '74f4c926-250c-43ca-9c53-453e87ceacd1', 
            group_id: '8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e', 
            data: {
                gstin: gstin // Use GSTIN from the request body
            }
        }));
    
        apiReq.end();
    }
    else {
        res.status(401).json({ message: 'User not registered' });
    }
    
};
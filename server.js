
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.post('/submit', async (req, res) => {
    const { email } = req.body.email;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const DATACENTER = process.env.MAILCHIMP_DC;
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const url= `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;
    
    try {
        const response = await axios.post(
            url,
            {
                email_address:email,
                status:'subscribed'
            },
            {
                headers: {
                    'Authorization': `apikey ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.status(200).send('Successfully added to Mailchimp!');
    } catch {
        console.error('Error adding to Mailchimp:', error);
        res.status(500).send('Faild to add to Mailchimp');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
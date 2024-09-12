const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');


// Express initialization
const app = express();
app.use(express.json());


// MongoDb Connections
const { Schema, model } = mongoose;
mongoose.connect("mongodb://localhost:27017/messageHost");

// Schema and Model
const commentSchema = new Schema({
    postId: Number,
    id: Number,
    name: String,
    email: String,
    body: String
});
const Message = model('messages', commentSchema);


// Populate API
app.get('/populate', async (req, res) => {
    try {
        // URLs for Broadcasting Message
        const linkUrl = 'https://jsonplaceholder.typicode.com/comments';
        const csvUrl = 'http://cfte.mbwebportal.com/deepak/csvdata.csv';
        const bigCsvUrl = 'http://cfte.mbwebportal.com/deepak/bigcsvdata.csv';

        // Making broadcasting Requests
        await Promise.all([
            fetchAndSaveMessage(linkUrl)
            , fetchAndSaveCsvMessage(csvUrl, 'csvdata.csv')
            // ,fetchAndSaveBigCSVMessage(bigCsvUrl, 'bigcsvdata.csv')
        ]);

        res.status(200).json({
            success: true,
            message: 'Data populated successfully!',
            details: {
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error occurred on populate API',
            error: error.message
        });
    }
})

const fetchAndSaveMessage = async (url) => {
    const response = await fetch(url);
    const messages = await response.json();
    await Message.insertMany(messages);
    console.log('Messages data saved to DB');
};

const fetchAndSaveCsvMessage = async (url, fileName) => {
    const response = await fetch(url);
    const fileStream = fs.createWriteStream(fileName);

    await new Promise((resolve, reject) => {
        response.body.pipe(fileStream);
        response.body.on('error', reject);
        fileStream.on('finish', resolve);
    });

    // Reading the CSV file and inserting rows into DB
    fs.createReadStream(fileName)
        .pipe(csv())
        .on('data', async (row) => {
            await Message.create(row);
        })
        .on('end', () => {
            console.log(`${fileName} rows saved to DB`);
        });
};


// Search API for Message Broadcasting
app.post('/search', async (req, res) => {
    try {
        const { name, email, body, limit, sort } = req.body;

        // filter objects
        const filter = {};
        if (name) filter.name = { $regex: name, $options: 'i' };
        if (email) filter.email = { $regex: email, $options: 'i' };
        if (body) filter.body = { $regex: body, $options: 'i' };

        // Sorting and limit
        const options = {};
        // asending order
        if (sort) options.sort = { [sort]: 1 };
        // default limit - 10
        const limitValue = limit ? parseInt(limit) : 10;

        // Fetch data from DB
        const results = await Message.find(filter).limit(limitValue).sort(options.sort);

        res.status(200).json({
            success: true,
            limit: limitValue,
            sort: sort || 'none',
            totalResults: results.length,
            results: results
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error occurred on searching',
            error: error.message
        });
    }
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
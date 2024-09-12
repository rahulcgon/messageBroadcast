// getting-started.js
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema({
    postId: Number,
    id: Number,
    name: String,
    email: String,
    body: String
});

const Message = model('messages', commentSchema);

mongoose.connect("mongodb://localhost:27017/messageHost");



// Create a new blog post object
const article = new Blog({
    title: 'Awesome Post!',
    slug: 'awesome-post',
    published: true,
    content: 'This is the best post ever',
    tags: ['featured', 'announcement'],
});

// Insert the article in our MongoDB database using await and async
(async () => {
    await article.save();
    console.log('Article saved');
    mongoose.disconnect();
})();
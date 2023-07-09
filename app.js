// Creating Personal Portfolio website using PUG & Express

const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
const port = 5000;

// body parser is a middleware, we haven't used it here
// app.use.bodyparser.json

// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Define mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    Enquiry: String,
    Checkbox: Boolean
});

const Contact = mongoose.model('Contact', contactSchema);

// Express Specific Stuff
app.use('/static', express.static('static')); // For serving static files:
app.use(express.urlencoded()); // to get from data

// PUG Specific Stuff
app.set('view engine', 'pug'); // Set the template engine as pug:
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// End-points
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params);
});

app.get('/about', (req, res) => {
    const params = {};
    res.status(200).render('about.pug', params);
});

app.get('/projects', (req, res) => {
    const params = {};
    res.status(200).render('projects.pug', params);
});

app.get('/blog', (req, res) => {
    const params = {};
    res.status(200).render('blog.pug', params);
});

app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res) => {
    let myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item have been saved to the database.")
    }).catch(() => {
        res.status(400).send("Item was not saved to the database.")
    })
    // res.status(200).render('contact.pug');
});

// Start the server
app.listen(port, () => {
    console.log(`This application started successfully on port: http://localhost:${port}`)
});
const express = require("express");
const path = require("path");
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require("./Members");


const app = express();


//Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

//Logger middleware
app.use(logger);

//Express BodyParser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Set static directory for website
app.use(express.static(path.join(__dirname, "public")));

//Members api routes
app.use('/api/members', require('./routes/api/members'));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
app.use(cors());


// = to app.js
// Express body parser
app.use(express.urlencoded({ extended: true }));

app.use(expressLayouts);
app.set("view engine", "ejs");

app.set("views", path.join("C:\\Users\\Daytona211\\Desktop\\Code Projects\\newCodeBuddy", "views"));
app.use(express.static('C:\\Users\\Daytona211\\Desktop\\Code Projects\\newCodeBuddy\\public'));
console.log(app.get("views"));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'coding_buddy_login'
});

const PORT = ('port', process.env.PORT || 3000);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

db.connect();

// routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/practice", require("./routes/practice"));

module.exports.db = db;
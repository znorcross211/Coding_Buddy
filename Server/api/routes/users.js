    const express = require("express");
    const mysql = require("mysql");
    const router = express.Router();

    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'coding_buddy_login'
    });

    router.get("/login", (req, res) => {
        res.render("login");
    });

    router.get("/register", (req, res) => {
        res.render("signUp");
    });

    router.get("/learnMore", (req, res) => {
        res.render("learnMore");
    });


    router.post("/subRegister", (req, res) => {
        var name = req.body.userName;
        var pass1 = req.body.passwordOne;
        var pass2 = req.body.passwordTwo;
        var errorMsg = "";

        if (req.body.userName.length <= 0) {
            console.log("Error on username"); //alert logic
            errorMsg = "The username needs to be at least 1 character";
            res.render("signUp", {
                name,
                pass1,
                pass2,
                errorMsg
            });
            return;
        }
        if (req.body.passwordOne.length <= 0) {
            var name = req.body.userName;
            errorMsg = "The passwords needs to be at least 1 character";
            console.log("Error on password 1"); //alert logic
            res.render("signUp", {
                name,
                pass1,
                pass2,
                errorMsg
            });
            return;
        }
        if (req.body.passwordOne != req.body.passwordTwo) {
            console.log("Error on password's not matching"); //alert logic 
            errorMsg = "The passwords need to be the same";
            res.render("signUp", {
                name,
                pass1,
                pass2,
                errorMsg
            });
            return;
        }
        var user = {
            userName: req.body.userName,
            passWord1: req.body.passwordOne,
            passWord2: req.body.passwordTwo,
        };

        db.query("SELECT * FROM logins WHERE Name = '" + req.body.userName + "'", function (error, results, fields) {
            if (error) throw error;
            if (results.length == 0) {
                registerNewUser(user);
                res.render("homepage", {userName});
            } else {
                console.log("aaa");
                errorMsg = "UserName already exists";
                console.log("Already exists");
                res.render("signUp", {
                    name,
                    pass1,
                    pass2,
                    errorMsg
                });
            }
        });
    });

    function registerNewUser(user) {
        var sqlQuery = "INSERT INTO logins (Name, Password) VALUES ('" + user.userName + "', '" + user.passWord1 + "')";
        db.query(sqlQuery, (error, result) => {
            if (error)
                console.log("Error creating new user");
            else
                console.log(result);
        });
    }

    router.post("/subLogin", (req, res) => {
        var userName = req.body.Username;
        var passWord = req.body.Password;
        var sqlQuery = "SELECT * FROM logins WHERE Name IN ('" + userName + "')";
        db.query(sqlQuery, (error, result) => {
            if (error)
                console.log(error);
            else {
                if (result.length == 0) {
                    // User doesn't exist
                    var errorMsg = "We don't recognize that username. Please register";
                    res.render("login", {
                        errorMsg
                    });
                } else {
                    for (var i = 0; i < result.length; i++) {
                        if (passWord == result[i].Password) {
                            console.log(result);
                            result.loggedIn = 1;
                            res.render("homepage", {userName});
                            return;
                        }
                    }

                    var errorMsg = "We don't recognize that password. Please try again";
                    res.render("login", {
                        errorMsg
                    });
                }
            }
        });
    });

    module.exports = router;
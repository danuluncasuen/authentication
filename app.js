const express = require("express");
const app = express();
const port = 3000;

app.get("/", function(req, res) {
    res.send("All good");
});

app.post("/", function(req, res) {
    console.log(req.headers);
    res.send("All good bruh");
});

app.get('/secured', function(req, res) {
    if(secured(req.headers.cookie)) {
        res.sendFile(__dirname + "/public/securedPage.html");
    } else {
        res.redirect('/login');
    }
});

app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', function(req, res) {
    if(validate(req.headers)) {
        res.cookie("session", "secured", {
            expires: new Date(Date.now() + 30000)
        });
        res.send("Login success");
    } else {
        res.send("Login failed");
    }
});

function validate(data) {
    if(data.username === "admin") {
        if(data.password === "admin") {
            return true;
        }
    }
    return false;
}

function secured(data) {
    if(data) {
        let cookies = data.split("; ");
        for(let i=0; i<cookies.length; i++) {
            if(cookies[i].split("=")[0] === "session") {
                if(cookies[i].split("=")[1] === "secured") {
                    return true;
                }
            }
        }
    }
    return false;
}

app.listen(port, () => console.log(`App listening on port ${port}!`))
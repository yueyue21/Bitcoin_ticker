//ES version 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;
  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: { from: crypto, to: fiat, amount: amount }
  };
  request(options, (error, response, body) => {
    var data = JSON.parse(body);
    var time = data.time;
    var price = data.price;
    console.log(time);

    res.write("<h1>Time: " + time + " Price: " + price + "</h1>");
    res.send();
  });
});

app.listen(3000, function() {
  console.log("server is running on port 3000");
});

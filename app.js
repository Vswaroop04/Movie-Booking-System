const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const _ = require("lodash");
app.set('view engine', 'ejs');
const mysql = require('mysql');


const connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	port: 3306,
	password : '',
	database : 'movie_booking'
});





var Seats = ["1"] ;
var seatnames=Array.from(Array(100).keys()) 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    connection.connect(function(err) {
        if (err) throw err;
        //Select all customers and return the result object:
        con.query("SELECT * FROM movie", function (err, result, fields) {
          if (err) throw err;
          res.render("basic", { result:result});
        });
      });
  
})
app.get("/booknow",function(req,res){

    res.render("booknow", { });
  })
  app.get("/process",function(req,res){

    res.render("process", { });
  })
  app.get("/success",function(req,res){

    var last = Seats[Seats.length - 1]

    var prize = last*170;

    var tax = last*15;

    var total = prize + tax;


    res.render("success", { last:last,prize:prize,tax:tax,total:total,seatnames:seatnames,Seats:Seats });
  })
  app.post("/process",function(req,res){

    var numofseats = req.body.Seats ;

    Seats.push(numofseats);
    
    res.redirect("/success")
  })

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  
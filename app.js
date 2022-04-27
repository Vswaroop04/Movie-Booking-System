const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const _ = require("lodash");
app.set('view engine', 'ejs');
const mysql = require('mysql');


const connection = mysql.createConnection({
	host : '13.233.15.93',
	user : 'vishnu',
	port: 3306,
	password : 'vishnu',
	database : 'movie_booking'
});


var Seats = [] ;
var seatnames=Array.from(Array(100).keys()) 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  
  res.render("login1");





      
  
})
app.get('/signup', function(req, res){
  res.render("signup");
})

app.post("/signup", function(req, res){

  person = req.body.person;
  var name = req.body.name;
  var userTd = req.body.userid;
  var email = req.body.email;
  var password = req.body.password;



    var sql0 = "Select * from users where email = ?" ;
    connection.query(sql0,[email],function(err, check) {
      if(err){
        console.log(err);
      } else {
          if(check.length===0){
            var sql = "INSERT INTO users (name,userId,email,password) VALUES(?,?,?,?)";
            connection.query(sql,[name,userTd,email,password], function(error, result){
              if(error) throw error;

                 connection.query("SELECT * FROM movie", function (error, result, fields) {
          if (error) throw error;
          else
          console.log(result);
          res.render("basic", {result:result});
       
      });
            });
          } else {
            res.render("signupFailure");
          }
      }
    })
  
})

app.post("/login", function(req, res){
  var email = req.body.Email;
  var password = req.body.Password;
  person = req.body.person;

  // console.log(email +" "+ password + " " + person);
  var sql = "Select * from users where email = ? AND "+"password = ?" ;
  connection.query(sql,[email,password],function(err, result){
        if(err) {
          console.log(err.message);
        } else {
          if(result.length===0) {
            // console.log(result);
            res.render("failure");

          } else {
            // console.log(result);
             connection.query("SELECT * FROM movie", function (error, result, fields) {
          if (error) throw error;
          else
          console.log(result);
          res.render("basic", {result:result});
       
      });
          }
        }
      });
})

app.get("/booknow",function(req,res){

 
    connection.query("SELECT * FROM theatre", function (error, result, fields) {
      if (error) throw error;
      else
      console.log(result);
      res.render("booknow", { result:result});
    });


  })
  app.get("/process",function(req,res){

    res.render("process", { });
  })
 
  app.get("/success",function(req,res){



    var last = Seats[Seats.length - 1]

    var prize = last*170;

    var tax = last*15;

    var total = prize + tax;

    let lastElement = Seats[Seats.length - 1] ;

   

    connection.query("SELECT * FROM seats", function (error, result, fields) {
      if (error) throw error;
      else
      console.log(result);
      res.render("success", { last:last,prize:prize,tax:tax,total:total,seatnames:seatnames,lastElement:lastElement,result:result });
    });


   
  })
  app.post("/process",function(req,res){

    var numofseats = req.body.Seats;

    Seats.push(numofseats);


    
    res.redirect("/success")
  })

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  
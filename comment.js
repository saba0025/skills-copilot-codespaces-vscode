//create a web server 
//create a web server
//import http module
var http = require('http');
//import url module
var url = require('url');
//import mysql module
var mysql = require('mysql');
//create a connection object
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "comment"
});
//connect to the database
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
//create a server object:
http.createServer(function (req, res) {
  //parse the url of the request
  var q = url.parse(req.url, true);
  //get the path of the request
  var path = q.pathname;
  //get the query part of the url
  var qdata = q.query;
  //check the path of the request
  if(path == "/comment"){
    //get the name and comment from the query part
    var name = qdata.name;
    var comment = qdata.comment;
    //insert the name and comment into the database
    var sql = "INSERT INTO comments (name, comment) VALUES ('"+name+"', '"+comment+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
    //send a response
    res.write("Comment added");
    res.end();
  }else if(path == "/getcomments"){
    //select all the comments from the database
    con.query("SELECT * FROM comments", function (err, result, fields) {
      if (err) throw err;
      //send a response
      res.write(JSON.stringify(result));
      res.end();
    });
  }else{
    //send a response
    res.write("Invalid Request");
    res.end();
  }
}).listen(8080); //the server object listens on port 8080
console.log("Server is running on port 8080");

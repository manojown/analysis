var express = require('express');
var app = express();

var User = require('./model/database');
var bodyParser = require('body-parser');
var insertall = require('./model/insertall');
var graphmonth = require('./model/graphmonth');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());



// start point to load home page
app.get('',function(req,res){
	res.sendFile(__dirname+"/public/home.html");

});

app.post('/insertall',insertall.insertall);   //  insert entry controller 
app.post('/graphmonth',graphmonth.graphmonth);  //  graph genrator controller



app.listen(process.env.PORT || 3001,function(err)
    {
    	if(err)
    	{
    		console.log(err);
    		console.log("listen failed");
    	}
    	else{ console.log("listen on 3001 port");}
    });
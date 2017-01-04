var express = require('express');
var app = express();

var User = require('./model/database');
var bodyParser = require('body-parser');
var insertall = require('./model/insertall');
var graphmonth = require('./model/graphmonth');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());




app.get('',function(req,res){
	res.sendFile(__dirname+"/public/home.html");
//res.sendFile('./public/views/index.html',{root:__dirname});
});

app.post('/insertall',insertall.insertall);
app.post('/graphmonth',graphmonth.graphmonth);

/*User.find({}, function(err, users) {
  if (err) throw err;

  // object of all the users
  console.log(users+"entry");
});

/*
User.remove(function(err) {
    if (err) throw err;

    console.log('User successfully deleted!');
  });*/

app.listen(process.env.PORT || 3001,function(err)
    {
    	if(err)
    	{
    		console.log(err);
    		console.log("listen failed");
    	}
    	else{ console.log("listen on 3001 port");}
    });
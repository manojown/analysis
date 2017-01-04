
'use strict'

//var db = require('./database');
var request = require('request');
var User = require('./database');


module.exports.insertall = function(req,res)
{
	console.log("in insertall");
	
	
for(let k=0;k<req.body.data.c2.length;k++){
	console.log("in k");
	(function(k) {
			    setTimeout(function() {

				var base = req.body.data.c2[k];
				var startdate =req.body.data.c1.startdate;
				var enddate = req.body.data.c1.enddate;
				var array = [];

				  var start = new Date(startdate); //yyyy-mm-dd
			      var end = new Date(enddate); 
			      
			      //console.log($scope.contact);
			      while(start <= end){

			        var mm = ((start.getMonth()+1)>=10)?(start.getMonth()+1):'0'+(start.getMonth()+1);
			        var dd = ((start.getDate())>=10)? (start.getDate()) : '0' + (start.getDate());
			        var yyyy = start.getFullYear();
			        var date = yyyy+"-"+mm+"-"+dd; //yyyy-mm-dd

			        //console.log(date); 
			         var url = "http://api.fixer.io/"+date+"?base="+base;
			         array.push(url);

			      //  console.log(url);
			        start = new Date(start.setDate(start.getDate() + 1)); //date increase by 1
			        }

			        for (var i = 0, len = array.length; i < len; i++) {
						  (function(i) {
						    setTimeout(function() {

					        		request(array[i],function(err,res,data){
					        			
					        		//console.log(array[i]);
					        		if(data && data.substring(0, 1)!="<"){
					        		var json = JSON.parse(data);
					        		


					        		 var chris = new User({base:json["base"],date:new Date(json["date"]),rates:json["rates"]});

								        chris.save(function(err) {
										  if (err) console.log(err);
										  else console.log('Inserted entry for'+date);
										});
								        	}
					        		});
						      
						    }, (i * 1000)/10);
						  })(i);
				}
			
			 }, (k * 1000)/10);
						  })(k);	
	
  }     			
 
res.send("loaded");

}



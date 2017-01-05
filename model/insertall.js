
'use strict'


var request = require('request');
var User = require('./database');


module.exports.insertall = function(req,res)
{
			
	for(let k=0;k<req.body.data.c2.length;k++){   //  this loop is to handle  multiple currency  insertion  ex - ["USD","INR"] etc
		// create  settimeout  function to manage asynch beahaviour of javascript
		(function(k) {
				    setTimeout(function() {

					var base = req.body.data.c2[k];
					var startdate =req.body.data.c1.startdate;
					var enddate = req.body.data.c1.enddate;
					var array = [];

					  var start = new Date(startdate); //yyyy-mm-dd
				      var end = new Date(enddate); 
				      
				   		//  this  loop is to  create date range array which is enter by user like start  to end date 
				      while(start <= end)
				      {
				        var mm = ((start.getMonth()+1)>=10)?(start.getMonth()+1):'0'+(start.getMonth()+1);
				        var dd = ((start.getDate())>=10)? (start.getDate()) : '0' + (start.getDate());
				        var yyyy = start.getFullYear();
				        var date = yyyy+"-"+mm+"-"+dd; 
				        var url = "http://api.fixer.io/"+date+"?base="+base;
				        array.push(url);
				        start = new Date(start.setDate(start.getDate() + 1)); //date increase by 1
				     }

				        // this  loop  is handle  database insertion 
				        for (var i = 0, len = array.length; i < len; i++) {
				        	//create  settimeout  function to manage asynch beahaviour of javascript
							  (function(i) {
							    setTimeout(function() {

						        		request(array[i],function(err,res,data){
							        		if(data && data.substring(0, 1)!="<")
							        		{
									        		var json = JSON.parse(data);
									        		var chris = new User({base:json["base"],date:new Date(json["date"]),rates:json["rates"]});  //  make documetn to insert in collection
												     chris.save(function(err) {
														 if (err) console.log(err);
														 else console.log('Inserted entry for'+json["date"]);
													});
										     }
						        		});
							      
							    }, (i * 1000)/10);// set time out to manage asynch beahaviour of  for  loop  for i
							  })(i);
						}
				
				 }, (k * 1000)/10); // set time out to manage asynch beahaviour of  for  loop  for k
							  })(k);	
	 }     			
	 
	res.send("loaded");

}



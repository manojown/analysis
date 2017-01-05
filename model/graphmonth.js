var User = require('./database');  //  import database to done operation


module.exports.graphmonth = function(req,res)
{
		var base  = req.body.base;
		var start = new Date(req.body.start);
		var end = new Date(req.body.end);
		var smm = start.getMonth()+1;
		var emm = end.getMonth()+1;
		var sdd = start.getDate();
		var edd = end.getDate();
		var syyyy = start.getFullYear();
		var eyyyy = end.getFullYear()
		var sdate = syyyy+"-"+smm+"-"+sdd;
		var edate = eyyyy+"-"+emm+"-"+edd;
		console.log(sdate + " " + edate);
		//  hold data  which we fetch from databse
		var data = {
			all : []
		}
		


		// search entry for  user entered details
		User.find({"base":base,"date": {'$gte': new Date(sdate),'$lt':new Date(edate)}}, function(err, users) {
			  if (err) throw err;
			  data.all.push({users});
			  res.send(data.all[0].users);
		});	
		
}
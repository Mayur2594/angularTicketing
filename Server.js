var express = require('express');
var path = require('path');
var bodypareser = require('body-parser')
var mongoose = require('mongoose');
var fs = require('fs');
var morgan = require('morgan');
const multer = require('multer');
var routes = require('./lib/routes');
var departmentschema = require('./lib/models/departmentDetails');
var departmentdetails = mongoose.model('departmentDetails');

var app = express();

const dir = 'app/uploads';

app.use(bodypareser.urlencoded({limit:'5mb',extended:true}));
app.use(bodypareser.json({limit:'5mb'}));
	
app.use(express.static(path.join(__dirname,'app')));

const options = {
  useNewUrlParser: true,
  autoIndex: true, // Don't build indexes
  //reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};


routes.configure(app);

let storage = multer.diskStorage({
			destination: (req, file, cb) => {
			  cb(null, dir);
			},
			filename: (req, file, cb) => {
			  cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
			}
		});
		let upload = multer({storage: storage});
		
			app.post('/api/SaveDetaptment', upload.single('file'), function (req, res, next) {
	
			
			req.body.departmentdata[0].icon = req.file.filename;
				var deptdetails = req.body.departmentdata[0];
					mongoose.connect(process.env.MONGOLAB_URI, options).then(
					  () => { 
					
			 var dprtdetails = new departmentdetails(deptdetails);
			 
			if(deptdetails._id)
			{
				departmentdetails.update({ _id: deptdetails._id }, deptdetails,{ multi: true }, function(err) {
				if(err)
				{
					res.send({status:1,message:'Somthing went wrong, Please try again!'});
					mongoose.disconnect();
				}
				else
				{
					res.send({status:0,message:'Record updated successfully!'});
					mongoose.disconnect();
				}
			});
			}
			else
			{
				dprtdetails.save(function(err,result) {
					if(err)
					{
						res.send({status:1,message:'Somthing went wrong, Please try again!'});
						mongoose.disconnect();
					}
					else
					{
						res.send({status:0,message:'Record inserted successfully!'});
						mongoose.disconnect();
					}
				});
			}
					  },
				 	  err => { 
						console.log("Datebase error: "+err);
					  }
					); 

				
				})
						


var server = app.listen(parseInt(process.env.SERVING_PORT),function(){
	console.log('server start on '+ server.address().port+ ' port');
})
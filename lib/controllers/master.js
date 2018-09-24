var mongoose = require('mongoose');
var userdetails = require('../models/userDetails');
var querrydetails = require('../models/querryDetails');
var departmentsdetails = require('../models/departmentDetails');

var users = mongoose.model('userDetails');
var querries = mongoose.model('querryDetails');
var departments = mongoose.model('departmentDetails');

var dblink ='mongodb://localhost:27017/ticketing';

var opts = {
	useNewUrlParser: true,
    //useMongoClient: true,
    autoReconnect: true,
	autoIndex: false, // Don't build indexes
    //reconnectTries: 100, // Never stop trying to reconnect /* Not used for replica set */
    //reconnectInterval: 500, // Reconnect every 500ms  /* Not used for replica set */
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    /*bufferMaxEntries: 0*/
	connectTimeoutMS: 30000,
	socketTimeoutMS: 30000 
  };
  
  exports.ListDepts= function(req, res) {
		mongoose.connect(process.env.MONGOLAB_URI,opts).then(
		()=>{
			departments.find({},{'name':1,'id':0}).exec(function (err, result) {
				if(err)
				{
					res.send({status:1,message:'Somthing went wrong, Please try again!'});
					mongoose.disconnect();
				}
				else
				{
					res.send(result);
					mongoose.disconnect();
				}
			});
		});
	};   
	
	exports.ListDepartments= function(req, res) {
		mongoose.connect(process.env.MONGOLAB_URI,opts).then(
		()=>{
			departments.find({}).exec(function (err, result) {
				if(err)
				{
					res.send({status:1,message:'Somthing went wrong, Please try again!'});
					mongoose.disconnect();
				}
				else
				{
					res.send(result);
					mongoose.disconnect();
				}
			});
		});
	};   
	
	exports.getDepartmentDetails= function(dptid, res) {
		mongoose.connect(process.env.MONGOLAB_URI,opts).then(
		()=>{
			departments.find({_id:dptid}).exec(function (err, result) {
				if(err)
				{
					res.send({status:1,message:'Somthing went wrong, Please try again!'});
					mongoose.disconnect();
				}
				else
				{
					res.send(result);
					mongoose.disconnect();
				}
			});
		});
	};   
	
	exports.deleteDepartmentDetails= function(dptid, res) {
		mongoose.connect(process.env.MONGOLAB_URI,opts).then(
		()=>{
			departments.deleteOne({_id:dptid}).exec(function (err, result) {
				if(err)
				{
					res.send({status:1,message:'Somthing went wrong, Please try again!'});
					mongoose.disconnect();
				}
				else
				{
					res.send({status:0,message:'Record deleted successfully!'});
					mongoose.disconnect();
				}
			});
		});
	};   
	
	/* ----------------users details */
	
	exports.ListUsers= function(req, res) {
		mongoose.connect(process.env.MONGOLAB_URI,opts).then(
		()=>{
			users.find({},{'fullname':1,email:1,username:1,password:1,userlevel:1,'department':1}).exec(function (err, result) {
				if(err)
				{
					res.send({status:1,message:'Somthing went wrong, Please try again!'});
					mongoose.disconnect();
				}
				else
				{
					res.send(result);
					mongoose.disconnect();
				}
			});
		});
	};   
	
	
	exports.getUsersDetails= function(userid, res) {
		mongoose.connect(process.env.MONGOLAB_URI,opts).then(
		()=>{
			users.find({_id:userid}).exec(function (err, result) {
				if(err)
				{
					res.send({status:1,message:'Somthing went wrong, Please try again!'});
					mongoose.disconnect();
				}
				else
				{
					res.send(result);
					mongoose.disconnect();
				}
			});
		});
	};   
	
	
	exports.deleteUsersDetails= function(dptid, res) {
		mongoose.connect(process.env.MONGOLAB_URI,opts).then(
		()=>{
			users.deleteOne({_id:dptid}).exec(function (err, result) {
				if(err)
				{
					res.send({status:1,message:'Somthing went wrong, Please try again!'});
					mongoose.disconnect();
				}
				else
				{
					res.send({status:0,message:'Record deleted successfully!'});
					mongoose.disconnect();
				}
			});
		});
	};   
	
	exports.SaveUsersDetails= function(usersDetails, res) {
		mongoose.connect(process.env.MONGOLAB_URI,opts).then(
		()=>{
			
			var usersdet = new users(usersDetails);
			
			if(usersDetails._id)
			{
				users.update({ _id: usersDetails._id }, usersDetails,{ multi: true }, function(err) {
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
				usersdet.save(function(err,result) {
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
		});
	};   
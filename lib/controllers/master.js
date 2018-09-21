var mongoose = require('mongoose');
var userdetails = require('../models/userDetails');
var querrydetails = require('../models/querryDetails');
var departmentsdetails = require('../models/departmentDetails');

var users = mongoose.model('userDetails');
var querries = mongoose.model('querryDetails');
var departments = mongoose.model('departmentDetails');

var dblink ='mongodb://localhost:27017/ticketing';

var opts = {
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
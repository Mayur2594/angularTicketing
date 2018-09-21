var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var ENCRYPTED_KEY = "@@YYaxdPPsjn__tgst$ggs=-ahsbhjs="

function encrypt(text) {
	try
	{
		if (text === null || typeof text === 'undefined') { return text; }
		
		var cipher = crypto.createCipher('aes-256-cbc', ENCRYPTED_KEY);
		var crypted = cipher.update(text,'utf8','hex');
		crypted += cipher.final('hex');
		
	}
	catch(err)
	{}
	return crypted;
} 

function decrypt(text) {
	if (text === null || typeof text === 'undefined') {return text;}
	else
	{
	try
	{
		var decipher = crypto.createDecipher('aes-256-cbc', ENCRYPTED_KEY);
		var dec = decipher.update(text,'hex','utf8');
		dec += decipher.final('utf8');
	}	
	catch(err)
	{}	
	
	return dec;
	}
}

var querryDetails = new Schema(
{
	querry:{ type: String, get: decrypt, set: encrypt},
	department:{ _id:{type:String},name:{ type: String, get: decrypt, set: encrypt}},
	issue:{ type: String, get: decrypt, set: encrypt},
	postdate:{ type: Date,default:new Date()},
	estimateddate:{ type: Date},
	estimatedtime:{ type: Date},
	empasigned:{_id:{type:String},username:{ type: String, get: decrypt, set: encrypt}},
	status:{ type: String, get: decrypt, set: encrypt},
	ipaddress:{ type: String, get: decrypt, set: encrypt},
	createdby:{ type: String, get: decrypt, set: encrypt},
	createddate:{ type: Date,default:new Date()},
});


querryDetails.set('toObject', { getters: true, setters: true,virtuals: true });
querryDetails.set('toJSON', { getters: true, setters: true ,virtuals: true});

mongoose.model('querryDetails', querryDetails);
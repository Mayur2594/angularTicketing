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

var departmentDetails = new Schema(
{
	name:{ type: String, get: decrypt, set: encrypt},
	icon:{ type: String, get: decrypt, set: encrypt},
	colorcodes:{ color1:{type: String, get: decrypt, set: encrypt},color2:{type: String, get: decrypt, set: encrypt}},
	createdby:{ type: String, get: decrypt, set: encrypt},
	createddate:{ type: Date,default:new Date()},
});


departmentDetails.set('toObject', { getters: true, setters: true,virtuals: true });
departmentDetails.set('toJSON', { getters: true, setters: true ,virtuals: true});

mongoose.model('departmentDetails', departmentDetails);
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

var userDetails = new Schema(
{
	fullname:{name:{ type: String, get: decrypt, set: encrypt}},
	email:{ name:{type: String, get: decrypt, set: encrypt}},
	username:{ name:{type: String, get: decrypt, set: encrypt}},
	password:{ name:{type: String, get: decrypt, set: encrypt}},
	userlevel:{ name:{type: String, get: decrypt, set: encrypt}},
	department:{name:{ type: String, get: decrypt, set: encrypt},_id:{type:String}},
});


userDetails.set('toObject', { getters: true, setters: true,virtuals: true });
userDetails.set('toJSON', { getters: true, setters: true ,virtuals: true});

mongoose.model('userDetails', userDetails);
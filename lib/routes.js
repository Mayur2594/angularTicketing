
var  master = require('./controllers/master');

module.exports = {

    configure: function (app) {
		app.get('/api/ListDepartments',function(req,res){
			master.ListDepartments(req, res);
		});
		
		app.get('/api/ListDepts',function(req,res){
			master.ListDepts(req, res);
		});
		
		app.get('/api/getDepartmentDetails/:dptid',function(req,res){
			master.getDepartmentDetails(req.params.dptid, res);
		});
		
		app.delete('/api/deleteDepartmentDetails/:dptid',function(req,res){
			master.deleteDepartmentDetails(req.params.dptid, res);
		});
		
		app.post('/api/SaveUsersDetails',function(req,res){
			master.SaveUsersDetails(req.body, res);
		});
		
		app.get('/api/ListUsers',function(req,res){
			master.ListUsers(req, res);
		});
		
		app.get('/api/getUsersDetails/:userid',function(req,res){
			master.getUsersDetails(req.params.userid, res);
		});
		
		app.post('/api/UserAuth/',function(req,res){
			master.UserAuth(req.body, res);
		});
		
		app.delete('/api/deleteUsersDetails/:userid',function(req,res){
			master.deleteUsersDetails(req.params.userid, res);
		});
	}
};
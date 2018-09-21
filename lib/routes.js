
var  master = require('./controllers/master');

module.exports = {

    configure: function (app) {
		app.get('/api/ListDepartments',function(req,res){
			master.ListDepartments(req, res);
		});
		
		app.get('/api/getDepartmentDetails/:dptid',function(req,res){
			master.getDepartmentDetails(req.params.dptid, res);
		});
		
		app.delete('/api/deleteDepartmentDetails/:dptid',function(req,res){
			master.deleteDepartmentDetails(req.params.dptid, res);
		});
	}
};
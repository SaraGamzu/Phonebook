(function (homeController) {
	
	var data = require("../data");
	
	homeController.init = function (app) {

		app.get('/contacts', function (req, res) {
			data.get(req, res);
		});
		
		app.post('/contacts', function (req, res) {
			if (isNaN(req.body.newContact.phone)) {
				response.send("not a number");
				return;
			}
			data.post(req, res);
		});
		
		app.put('/contacts', function (req, res) {
			if (isNaN(req.body.contact.phone)) {
				response.send("not a number");
				return;
			}
			data.put(req, res);
		});
		
		app.delete('/contacts/:id', function (req, res) {
			data.delete(req, res);
		});
		
	};

})(module.exports);
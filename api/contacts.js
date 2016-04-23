var fs = require('fs');
var path = require('path');


module.exports = {
	get: function (request, response) {
		fs.readFile(path.join(__dirname, '../data/data.json'), 'utf8', function (error, data) {
			if (error) {
				throw error;
			}
			response.send(data);
		});
	},
	post: function (request, response) {
		var obj = require('../data/data.json');
	    obj.employees.push({"name": request.body.newContact.name, "address": request.body.newContact.address, "phone": request.body.newContact.phone});// request.body.newContact
		var ans = writeToJsonFile(obj);
		response.send(ans);	
	},
	delete: function (request, response) {
		var obj = require('../data/data.json');
		obj.employees.splice(request.params.id, 1);
		var ans = writeToJsonFile(obj);
		response.send(ans);
	},
	put: function (request, response) {
		var obj = require('../data/data.json');
		obj.employees[request.body.index]=({ "name": request.body.contact.name, "address": request.body.contact.address, "phone": request.body.contact.phone });// request.body.newContact
	    var ans = writeToJsonFile(obj);
		response.send(ans);
	}
}


function writeToJsonFile(obj) {
	fs.writeFile(path.join(__dirname, '../data/data.json'), JSON.stringify(obj), function (err) {
		return "error";
	});
    return "success";
}


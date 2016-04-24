(function (data) {
	
	var fs = require('fs');
	var path = require('path');
	var obj = require('./data.json');
	
	function writeToJsonFile(obj) {
		fs.writeFile(path.join(__dirname, '../data/data.json'), JSON.stringify(obj), function (err) {
			return "error";
		});
		return "success";
	}

    data.get = function(request, response) {
        fs.readFile(path.join(__dirname, './data.json'), 'utf8', function(error, data) {
            if (error) {
                throw error;
            }
            response.send(data);
        });
	};

    data.post = function(request, response) {   
        obj.employees.push({ "name": request.body.newContact.name, "address": request.body.newContact.address, "phone": request.body.newContact.phone }); // request.body.newContact
        var ans = writeToJsonFile(obj);
        response.send(ans);
	};

    data.delete = function(request, response) {
        obj.employees.splice(request.params.id, 1);
        var ans = writeToJsonFile(obj);
        response.send(ans);
    };
    data.put = function(request, response) {
        obj.employees[request.body.index] = ({ "name": request.body.contact.name, "address": request.body.contact.address, "phone": request.body.contact.phone }); // request.body.newContact
        var ans = writeToJsonFile(obj);
        response.send(ans);
    };

})(module.exports);



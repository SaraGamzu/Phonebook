var express = require('express');
var contacts = require('../api/contacts.js');
var router = express.Router();

router.get('/contacts', function (req, res) {
	contacts.get(req, res);
});

router.post('/contacts', function (req, res) {
	if (isNaN(req.body.newContact.phone)) {
		response.send("not a number");
		return;
	}
	contacts.post(req, res);
});

router.put('/contacts', function (req, res) {
	if (isNaN(req.body.contact.phone)) {
		response.send("not a number");
		return;
	}
	contacts.put(req, res);
});

router.delete('/contacts/:id', function (req, res) {
	contacts.delete(req, res);
});

module.exports = router;



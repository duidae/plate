var keystone = require('keystone');
var lipsum = require('lorem-ipsum');
var randomkey = require('randomkey');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var Autocreate = new keystone.List('Autocreate', {
	autokey: { from: 'text', path: 'key', unique: true },
	autocreate: true,
	noedit: true
});

function randomNumber () {
	return Math.round(Math.random() * 100000);
}

function randomBoolean () {
	return Math.random() > 0.5;
}

Autocreate.add({
	text: { type: String, index: true, default: randomkey.bind(null, [10,20]) },
	number: { type: Number, index: true, default: randomNumber },
	boolean: { type: Boolean, index: true, default: randomBoolean },
	datetime: { type: Date, index: true, default: Date.now },
	html: { type: String, index: true, default: lipsum },
	markdown: { type: String, index: true, default: lipsum }
});

transform.toJSON(Autocreate);

Autocreate.defaultColumns = 'text, number, boolean, datetime';
Autocreate.register();

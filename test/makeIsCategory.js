'use strict';

var test = require('tape');
var forEach = require('for-each');
var v = require('es-value-fixtures');
var inspect = require('object-inspect');

var makeIsCategory = require('../makeIsCategory');

var fixtures = require('./fixtures');

test('makeIsCategory', function (t) {
	var isCategory = makeIsCategory(fixtures.ranges);

	t.equal(typeof isCategory, 'function', 'returns a function');

	forEach(['a', 'b', 'c', 'd', 'e'], function (category) {
		t.equal(isCategory(category), true, inspect(category) + ' is a category');
	});

	t.equal(isCategory('not a category'), false, 'an unknown string is not a category');

	forEach(v.nonStrings, function (nonString) {
		t.equal(isCategory(nonString), false, inspect(nonString) + ' is not a category');
	});

	t.end();
});

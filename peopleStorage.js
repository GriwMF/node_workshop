var fs = require('fs');
var uuid = require('node-uuid');
var people = {};
var path = null;
var _ = require('lodash');

var _saveState = function(cb) {
    fs.writeFile(path, JSON.stringify(people), cb);
    },
    _list = function (cb) {
        var peopleArray = _.values(people);
        cb(null, peopleArray);
    },
    _get = function (cb) {
        cb(null, people[id]);
    },

    _create = function(person, cb) {
        if (!person.id)
            person.id = uuid.v1();
        people[person.id] = person;
        _saveState(function(err, data){
            cb(null, person);
        });
    },

    _update = function(id, person, cb) {
        people[id] = person;

        _saveState(function(err, data){
            cb(null, person);
        });
    },

    _delete = function(id, cb){
        var person = people[id];

        delete people[id];

        _saveState(function(err, data){
            cb(null, person);
        });
    },
    config = function(selected_path){
        path = './' + selected_path;
        fs.exists(path, function(exists) {
            if (exists) {
                people = require(path);
        }});

        return {
            get: _get,
            create: _create,
            update: _update,
            delete: _delete,
            list: _list
        }
    };

module.exports = config;

var mongoose = require('mongoose');

var db;

//Establish connection
module.exports.connect = function connect(url, callbackvalue) {
    db = mongoose.createConnection(url, { server: { auto_reconnect: true } });
    return db;
};

module.exports.getConnection = function getConnection() {
    return db;
};

module.exports.get = function fetchOne(schema, query, callbackvalue) {
    // console.log("Schema!!!!", schema)
    console.log("Query!!!!", query)

    var objmodel = db.model(schema.options.collection, schema);
    console.log("OBJECT Model", objmodel)
    objmodel.findOne(query).lean().exec(function(err, result) {
        console.log("Errors!!!", err, "----Results!!!", result)
        callbackvalue(err, result);
        return;
    });
};
module.exports.set = function insert(schema, json, callbackvalue) {
    console.log("INSERT QUERY =>", json);
    var objmodel = db.model(schema.options.collection, schema);
    objmodel.create(json, function(err, result) {
            var args = Array.prototype.slice.call(arguments);
            args.shift();
            if (args.length > 1) 
                    callbackvalue(err, args);
                    
             else 
                    callbackvalue(err, args[0]);
                    
             
    });
};

module.exports.put = function updateQuery(schema, query, json, callbackvalue) {
    console.log('Inside dbWrapper, printing query', query);
    console.log('Inside dbWrapper, printing json', json);
    var objmodel = db.model(schema.options.collection, schema);
    objmodel.update(query, json, { upsert: false }, function(err, result) {
            callbackvalue(err, result);
    });
};

module.exports.aggregateQueryGroup = function aggregateQueryGroup(schema, matchQuery, unwindObj, groupQuery, callbackvalue) {
    var objmodel = db.model(schema.options.collection, schema);
    objmodel.aggregate([{ $match: matchQuery }, { $unwind: unwindObj }, { $group: groupQuery }], function(err, result) {
        callbackvalue(err, result);
    });
};

module.exports.delete = function removeQuery(schema, query, callbackvalue) {
    var objmodel = db.model(schema.options.collection, schema);
  	objmodel.remove(query, function(err, result) {
        callbackvalue(err, result);
    });
};

//Create model from schema and return error/result to controller
module.exports.getAll = function fetchAll(schema, query, fields, options, callbackvalue) {
    var objmodel = db.model(schema.options.collection, schema);
    objmodel.find(query, fields, options).lean().exec(function(err, result) {
      callbackvalue(err, result);
      return;
    });
};

module.exports.countDocs = function count(schema, query, callbackvalue) {
    //console.log('QUERY!!!!! ', query);
      var objmodel = db.model(schema.options.collection, schema);
      objmodel.count(query).lean().exec(function(err, result) {
          callbackvalue(err, result);
          return;
      });
  };
  
  module.exports.findUpdate = function findOneAndUpdate(schema, query, json, options, callbackvalue) {
      var objmodel = db.model(schema.options.collection, schema);
      objmodel.findOneAndUpdate(query, json, options).lean().exec(function(err, result) {
          callbackvalue(err, result);
          return;
      });
  };
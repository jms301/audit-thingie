Meteor.publish( "contract_changelog", function (_id) {
  return ChangeLog.find({contractId: _id}, {});
});

getCollection = function (name) {
  for (var globalObject in this) {
    if (this[globalObject] instanceof Meteor.Collection) {
      if (globalObject === name) {
        return (window[globalObject]);
        break;
      };
    }
  }
  return undefined; // if none of the collections match
};

// exported variable with function to write a change log on a change.
ChangeLogFuncs = {
  log_changes: function (collection) {
    collection.after.insert(function (userId, doc) {
      ChangeLog.insert({ collection: collection._name,
                        contractId: doc.contractId,
                        factId: doc._id,
                        data: doc}); // whole doc since it's all new
    });

    collection.after.update( function (userId, doc, fieldNames,
                                       modifier, options) {
      changedData = {};

      for(i = 0 ;i < fieldNames.length; i++) {
        changedData[fieldNames[i]] = doc[fieldNames[i]];
      }

      console.log(changedData);

      ChangeLog.insert({collection: collection._name,
                        contractId: doc.contractId,
                        factId: doc._id,
                        data: changedData});


    }, {fetchPrevious: true});

  },
}


/*
var default_allow = {
  insert: function (userId, doc) {
    // must be logged in & then the userId will be set to yours
    if (userId)
      doc.userId = userId;
    return (userId);
  },
  update: function (userId, doc, fields, modifier) {
    // must be logged in & then the userId will be set to yours
    if (userId)
      doc.userId = userId;
    return (userId);
  },
  remove: function (userId, doc) {
    // must be logged in
    return (userId)
  }, fetch: ['userId']
};

var default_deny = {
  update: function (userId, docs, fields, modifier) {
    // can't change userId
    return _.contains(fields, 'userId');
  },
  //remove: function (userId, doc) {
    // can't remove locked documents
    //return doc.locked;
  //},
  fetch: [] // no need to fetch 'userId'
};
*/

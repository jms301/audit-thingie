Meteor.publish( "key_ff_types", function () {
  return KeyFFTypes.find({}, {});
});

Meteor.publish( "contracts", function () {
  return Contracts.find({}, {});
});

Meteor.publish( "contract_details", function (_id) {
  return [KeyFacFigs.find({contractId: _id}, {}),
          //ChartableData.find({contractId: _id}, {})
          ];
});
/*
Meteor.publish("contracts-map", function (loc, limit) {
  return Contracts.find(
}); */

var default_allow = {
  insert: function (userId, doc) {
    // must be logged in & then the userId will be set to yours
      doc.userId = userId;
    return (userId && doc.userId === userId);
  },
  update: function (userId, doc, fields, modifier) {

    //must be loged in, must be setting values & must set user Id to yours
    return (userId && modifier.$set && modifier.$set.userId === userId);
  },
  remove: function (userId, doc) {
    // must be logged in
    return (userId)
  }, fetch: ['userId']
};

var default_deny = {
  update: function (userId, docs, fields, modifier) {
    // can change userId!
    //return _.contains(fields, 'userId');
  },
  //remove: function (userId, doc) {
    // can't remove locked documents
    //return doc.locked;
  //},
  fetch: [] // no need to fetch 'userId'
};

Contracts.allow(default_allow);
//Contracts.deny(default_deny); // No deny rules!
KeyFacFigs.allow(default_allow);
//KeyFacFigs.allow(default_deny); // No deny rules!

ChangeLogFuncs.log_changes(KeyFacFigs);
ChangeLogFuncs.log_changes(Contracts);


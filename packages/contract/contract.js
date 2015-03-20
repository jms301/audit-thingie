// Write your package code here!

Template.contractList.helpers({
  contractCollection: function () {
    return Contracts.find({});
  },
  settings: function () {
    return {
      collection: 'contracts',
      rowsPerPage: 10,
      showFilter: true,
      fields: [ {key:'name', label: "Name",
                 tmpl: Template.nameTmpl},
                {key: 'sector',
                 label: "Business Sector"},
                {key: 'est_cost',
                 label: "Estimated Cost"}]
    };
  }
});


Template.contractDisplay.helpers({

// This could all be done on the server with agregates and would run faster.
// I want to see how slow it is on the client.
  keyFacFigs: function () {
    keyffs = KeyFacFigs.find({contractId: this._id},
      {sort: {typeId: 1}}).fetch();
    types = _.groupBy(keyffs, 'typeId');
    return (_.values(types));
  },

  est_cost: function () {
    if (this.est_cost && this.est_cost.toFixed)
      return this.est_cost.toFixed(2);
    return this.est_cost;
  },
});

Template.contractEdit.helpers({
  keyFacFigs: function () {
    return this;
  },

  kffData: function () {

    keyffs = KeyFacFigs.find({contractId: this._id,
                              data: {$exists: true, $ne: null}},
                             {sort: {typeId: 1}}).fetch();

    types = _.unique(_.pluck(keyffs, 'typeId'));

    types = KeyFFTypes.find({_id : {$in: types}}).fetch();
    types = _.indexBy(types, '_id');
    data = _.map(_.groupBy(keyffs, 'typeId'), function (value, key) {
      return {type: types[key], keyffs: value};
    });
    return data;
  },
  oneKff: function () {
    if (this.keyffs.length == 1)
      return this.keyffs[0];
    return false;
  }
});

Template.contractEdit.events({
  'click button#addKff' : function () {
    Session.set("modal-template", 'newKeyFacFig');
    Session.set("modal-data", this);

    $("#site-modal").modal('toggle');
  }
});

Template.keyFacFigEdit.events({
  'click a' : function () {
    Session.set("modal-template", 'editKeyFacFig');
    Session.set("modal-data", this);

    $("#site-modal").modal('toggle');
  }
});

Template.editKeyFacFig.helpers({
  'untyped' : function ( ) {
     if (!this.typeId) {
       return "Untyped"
     }
  }
});

Template.editKeyFacFig.helpers({
  name: function () {
    if(this.typeId)
      return KeyFFTypes.findOne(this.typeId).field_name;
    else
      return this.name;
  }
});

Template.editKeyFacFig.events({
  'click button#save' : function (evt, template) {
    toSet = {userId: Meteor.userId()};
    if (template.$('input#data').val() != this.data)
      toSet.data = template.$('input#data').val();
    if (template.$('input#date').val() != this.date)
      toSet.date = template.$('input#date').val();
    if (template.$('input#date_end').val() != this.date_end)
      toSet.date_end = template.$('input#date_end').val();
    if (template.$('textarea#description').val() != this.description)
      toSet.description = template.$('textarea#description').val();

    KeyFacFigs.update(this._id, {$set: toSet});

    $("#site-modal").modal('toggle');
    Session.set("modal-template", 'blank');
    Session.set("modal-data", {});
  },
  'click button#cancel' : function (evt, template) {
    Session.set("modal-template", 'blank');
    Session.set("modal-data", {});
  }
});

Template.newKeyFacFig.helpers({

  typeList: function () {
    return KeyFFTypes.find();
    return [{field_name: "test1", _id: "testtest"}];
  }


});

Template.newKeyFacFig.events({
    'click button#save' : function (evt, template) {
    toAdd = {userId: Meteor.userId(),
             contractId: this._id};

    if (template.$('select#typeId').val())
      toAdd.typeId = template.$('select#typeId').val();
    if (template.$('input#name').val())
      toAdd.name = template.$('input#name').val();
    if (template.$('input#data').val())
      toAdd.data = template.$('input#data').val();
    if (template.$('input#date').val())
      toAdd.date = template.$('input#date').val();
    if (template.$('input#date_end').val())
      toAdd.date_end = template.$('input#date_end').val();
    if (template.$('textarea#description').val())
      toAdd.description = template.$('textarea#description').val();

    console.log(toAdd);
    KeyFacFigs.insert(toAdd);

    $("#site-modal").modal('toggle');
    Session.set("modal-template", 'blank');
    Session.set("modal-data", {});
  },
  'click button#cancel' : function (evt, template) {
    Session.set("modal-template", 'blank');
    Session.set("modal-data", {});
  }
})


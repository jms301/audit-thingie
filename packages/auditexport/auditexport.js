Session.setDefault("exportFields", []);

Template.exportAudit.helpers({
	getTypes: function () {
		return KeyFFTypes.find({_id: {$nin: Session.get("exportFields")}});
	},
	getContracts: function () {
		return Contracts.find({}, {fields: {'name':1}, sort: {'name': 1}}).fetch();
	},
  exportFields: function () {
    return KeyFFTypes.find({_id: {$in: Session.get("exportFields")}});
  }
});


Template.exportAudit.rendered = function () {
  Meteor.subscribe('key_fac_figs');
};

Template.exportAudit.events({
  "click button#add-field" : function (evt, temp) {

    var field_array = Session.get("exportFields");
    field_array.push(temp.$("select#types").val());
    field_array = _.uniq(field_array);
    Session.set("exportFields", field_array);

  },
  "click button.remove" : function (evt, temp) {
    var field_array = Session.get("exportFields");
    field_array = _.without(field_array, this._id);
    Session.set("exportFields", field_array);
  },
  "click #downloadcsv": function(evt, templ) {

    Meteor.subscribe('key_fac_figs', function () {
      types =  KeyFFTypes.find(
                {_id: {$in: Session.get("exportFields")}},
                {fields: {field_name: 1}, sort: { _id: 1}}).fetch();
			keyFFs = KeyFacFigs.find({
        typeId: {$in: Session.get("exportFields")}},
                {fields: {typeId: 1, date: 1, data: 1,contractId:1},
                 sort: {contractId: 1, typeId: 1, date: 1}}).fetch();
      keyFFs = _.groupBy(keyFFs, 'contractId');

      // add the the csv header & store a type array
      csvData = '"Contract","' + _.pluck(types, 'field_name').join('","') + '"\r\n';
      lineTemplate = _.pluck(types, '_id');
      line = [];

		  Contracts.find({}, {fields: {'name':1}}).
        forEach( function (cont) {
          csvData += '"' + cont.name + '",';
          facts = _.groupBy(keyFFs[cont._id], 'typeId');
          _.each(lineTemplate, function(type, i) {

            line[i] = _.pluck(facts[type], 'data').join(',');

          });
          csvData +=  '"' + line.join('","') + '"\r\n';
        }
      );

			var blob = new Blob([csvData],{type: "text/csv;charset=utf-8"});
      console.log(blob);
			saveAs(blob, templ.$('#filename').val() + ".csv");
    });
	},
});

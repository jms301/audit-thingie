// Write your package code here!

Template.exportAudit.helpers({
	getTypes: function () {
		return KeyFFTypes.find({});
	},
	getContracts: function () {
		return Contracts.find({}, {fields: {'name':1}, sort: {'name': 1}}).fetch();
	}
});

var csvdata = "Col1, Col2";


function JSON2CSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

    console.log("I happened!!");
    console.log(array);

    var str = '';
    var line = '';
    var head = array[0];
    for (var index in array[0]) {
      line += index + ',';
    }

    for (var i = 0; i < array.length; i++) {
        var line = '';

            for (var index in array[i]) {
                line += array[i][index] + ',';
            }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    return str;

}

Template.exportAudit.events({
	"click #downloadcsv": function(event) {
			csvdata = JSON2CSV(KeyFacFigs.find().fetch());
			var blob = new Blob([csvdata],{type: "text/csv;charset=utf-8"});
			saveAs(blob, "test.csv");
	},
	"click #downloadjson": function(event) {
		Meteor.subscribe('key_fac_figs', function() {
			jsondata = Contracts.find().fetch();
			var blob = new Blob([jsondata],{type: "text/json;charset=utf-8"});
			saveAs(blob, "test.json");
		});
	}
});

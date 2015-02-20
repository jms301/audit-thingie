// Write your package code here!

Template.contractList.helpers({
  contractCollection: function () {
    return Contracts.find({});
  } ,

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
  keyFacFigs: function () {
    return KeyFacFigs.find({contractId: this._id});
  },
  est_cost: function () {
    if (this.est_cost && this.est_cost.toFixed)
      return this.est_cost.toFixed(2);
    return this.est_cost;
  }
});

Template.contractEdit.helpers({
  keyFacFigs: function () {
    return KeyFacFigs.find({contractId: this._id});
  },
});

Template.keyFacFig.events({
  'click a' : function () {
    Session.set("modal-template", 'editKeyFacFig');
    Session.set("modal-data", this);

    $("#site-modal").modal('toggle');
  }
});

Template.editKeyFacFig.events({
  'click button#save' : function (evt, template) {
    oldKFF = Session.get("modal-data");
    console.log(template.$('input#data').val());

    $("#site-modal").modal('toggle');
    Session.set("modal-template", 'blank');
    Session.set("modal-data", {});
  }
});

Contracts = new Mongo.Collection("contracts");
KeyFacFigs = new Mongo.Collection("key_fac_figs");

Router.route('/contractlist', {
  template: 'contractList',
  loadingTemplate: 'loading',
  waitOn: function () {
    return Meteor.subscribe('contracts');
  }
});

Router.route('/contract/edit/:_id',
  {
    template: 'contractEdit',
    loadingTemplate: 'loading',
    waitOn : function () {
      return [Meteor.subscribe('contracts'),
              Meteor.subscribe('contract_details', this.params._id)];
    },
    data: function () {
      return Contracts.findOne({_id: this.params._id});
    },
    name: "contract.edit"
  }
);

Router.route('/contract/changes/:_id',
  {
    template: 'contractChangelog',
    loadingTemplate: 'loading',
    waitOn : function () {
      return [Meteor.subscribe('contracts'),
              Meteor.subscribe('contract_details', this.params._id),
              Meteor.subscribe('contract_changelog', this.params._id)];
    },
    data: function () {
      return Contracts.findOne({_id: this.params._id});
    },
    name: "contract.changelog"
  }
);




Router.route('/contract/:_id',
  {
    template: 'contractDisplay',
    loadingTemplate: 'loading',
    waitOn : function () {
      return [Meteor.subscribe('contracts'),
              Meteor.subscribe('contract_details', this.params._id)];
    },
    data: function () {
      return Contracts.findOne({_id: this.params._id});
    },
    name: "contract"
  }
);


Router.route('/contractmap', {
  template: 'contractMap',
  loadingTemplate: 'loading',
  waitOn: function () {
    return Meteor.subscribe('contracts');
  }
});

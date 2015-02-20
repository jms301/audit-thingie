Contracts = new Meteor.Collection("contracts"); 
KeyFacFigs = new Meteor.Collection("key_fac_figs"); 

Router.route('/contractlist', { 
  template: 'contract_list', 
  loadingTemplate: 'loading',
  waitOn: function () { 
    return Meteor.subscribe('contracts');
  }
});

Router.route('/contract/research/:_id',
  {
    template: 'contract_research',
    loadingTemplate: 'loading',
    waitOn : function () {
      return [Meteor.subscribe('contracts'), 
              Meteor.subscribe('contract_details', this.params._id)];
    },
    data: function () {
      return Contracts.findOne({_id: this.params._id});
    },
    name: "contract.research"
  }
);




Router.route('/contract/:_id',
  {
    template: 'contract_display',
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
  template: 'contract_map', 
  loadingTemplate: 'loading',
  waitOn: function () { 
    return Meteor.subscribe('contracts');
  }
});

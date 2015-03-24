Router.route('/export', {
  template: 'exportAudit',
  loadingTemplate: 'loading',
  waitOn: function () {
    return [ Meteor.subscribe('contracts'),
		Meteor.subscribe('key_ff_types')] ;
  }
});

Router.route('/export/csv/:_id', {
  template: 'exportAuditCSV',
  loadingTemplate: 'loading',
  waitOn: function () {
    return [ Meteor.subscribe('contracts'),
		Meteor.subscribe('key_fac_figs', this.params._id),
		Meteor.subscribe('key_ff_types')] ;
  }
});


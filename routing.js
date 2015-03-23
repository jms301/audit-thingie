Router.route('/', {
    template: 'home',
    loadingTemplate: 'loading',
    waitOn : function () {
      return Meteor.subscribe('contracts');
    },
    data: function () {
    },
  });

Router.route('/about');
Router.route('/stats', {template: "nationalStats"});

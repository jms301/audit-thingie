Router.route('/', function () {
  this.render('home', {
    data: function () {
//return Items.findOne({_id: this.params._id});
    }
  });
});

Router.route('/about');
Router.route('/stats', {template: "nationalStats"});

// Write your package code here!

Session.setDefault("modal-template", 'blank');
Session.setDefault("modal-data", {});

Template.modal.helpers({
  modalTemplate: function () {
    return Session.get('modal-template');
  },
  modalData: function () {
    return Session.get('modal-data');
  }
});

Template.modal.rendered = function () {
  $('#site-modal').on('hidden.bs.modal', function (e) {
    Session.set("modal_template", 'blank');
    Session.set("modal_data", {});

  });
};

Template.home.helpers({
  contract_count: function () {
     return Contracts.find().count();
  },
  user_count: function () {
    return "";
  }
});

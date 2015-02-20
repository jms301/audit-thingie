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

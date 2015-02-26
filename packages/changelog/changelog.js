// Write your package code here!

Template.contractChangelogList.helpers({
  changes : function () {
    return ChangeLog.find({contractId: this._id});
  }

});

Template.change.helpers({
  data : function () {
    var item = this.data;

    if(item.userId)
      delete item.userId
    if(item.contractId)
      delete item.contractId

    return JSON.stringify(item);

  },

});

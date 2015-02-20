#contract data
jq -c '{_id, name, sector: .sector.name, est_cost: [.payments[].estimated] |add}' projects_load2.json > contracts.json

# spit out Date of Final Close
jq -c '{contractId: .hmt_id, name: "Date of Final Close", figure: .date_fin_close, type: ""}' projects_load2.json > key_figs.json

jq -c '{contractId: .hmt_id, name: "Capital Value", figure: .capital_value, type: ""}' projects_load2.json >> key_figs.json

jq '{contractId: .hmt_id , fact: .off_balance_IFRS, name: "Off Balance IFRS", type: null}' projects_load2.json > key_facts.json

#fix the objectID problem
db.key_figures.find({}).forEach(function(el) {
  var oldid = el._id; 
  if(el._id.str) {
    el._id = el._id.str; 
    db.key_figures.insert(el)
    db.key_figures.remove({_id: oldid});
  }
});


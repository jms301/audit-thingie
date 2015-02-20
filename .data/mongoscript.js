
var tables = ['key_figures', 'key_facts', 'charable_data']

for( i=0; i<tables.length; i++) {
  print(tables[i]);
  db[tables[i]].find({}).forEach(function(el) {
    var oldid = el._id; 
    if(el._id.str) {
      el._id = el._id.str; 
      db[tables[i]].insert(el)
      db[tables[i]].remove({_id: oldid});
    }
  });
}


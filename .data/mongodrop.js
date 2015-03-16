
print("dropping tables...");
tables = ['contracts','key_ff_types','key_fac_figs'];

for (i = 0; i< tables.length; i++) {
  print('... ' + tables[i]);
  db[tables[i]].drop();
}

echo $1



if [ 0 -eq $# ]
then
  echo "running local data load"
  host='127.0.0.1:3001'
  db='meteor'
else
  echo "running data load for $1"

  url=`echo $1 | sed -e s,"mongodb://",,g`
  userpass="`echo $url | grep @ | cut -d@ -f1`"
  user=`echo $userpass | grep : | cut -d: -f1`
  pass=`echo $userpass | grep : | cut -d: -f2`
  host=`echo $url | sed -e s,$userpass@,,g | cut -d/ -f1`
  db="`echo $url | grep / | cut -d/ -f2-`"

fi


#rm old files
rm contracts.json
rm key_figures.json
rm key_facts.json
rm payments.json


#contract data
jq -c '{_id, name, department: .department.name, authority: .authority.name,  sector: .sector.name, est_cost: (if .payments | length == 0 then 0 else ([.payments[].estimated * 100] | add / 100) end)}' rawdata.json.keep > contracts.json


jq -c '{contractId: ._id,  data: .date_fin_close, description: "", date: "", date_end: "", typeId: "5506e6b88ba7bdd7c56353c1"}' rawdata.json.keep > key_figures.json

jq -c '{contractId: ._id, data: .capital_value, description: "", date: "", date_end: "", typeId: "5506e6b88ba7bdd7c56353ca"}' rawdata.json.keep >> key_figures.json

jq -c '{contractId: ._id, data: .contract_years, description: "", date: "", date_end: "", typeId: "5506e6b88ba7bdd7c56353c6"}' rawdata.json.keep >> key_figures.json

jq -c '{contractId: ._id, data: .date_ops, description: "", date: "", date_end: "", typeId: "5506e6b88ba7bdd7c56353c5"}' rawdata.json.keep >> key_figures.json

jq -c '{contractId: ._id, data: .date_cons_complete, description: "", date: "", date_end: "", typeId: "5506e6b88ba7bdd7c56353c3"}' rawdata.json.keep >> key_figures.json

jq -c '{contractId: ._id, data: .date_ojeu, description: "", date: "", date_end: "", typeId: "5506e6b88ba7bdd7c56353bf"}' rawdata.json.keep >> key_figures.json

jq -c '{contractId: ._id, data: .off_balance_IFRS, description: "", date: "", date_end: "", typeId: "5506e6b88ba7bdd7c56353c7"}' rawdata.json.keep > key_facts.json

jq -c '{contractId: ._id, data: .off_balance_GAAP, description: "", date: "", date_end: "", typeId: "5506e6b88ba7bdd7c56353c9"}' rawdata.json.keep >> key_facts.json

jq -c '{contractId: ._id, data: .off_balance_ESA95, date: "", description: "", date_end: "", typeId: "5506e6b88ba7bdd7c56353c8"}' rawdata.json.keep >> key_facts.json

jq -c '{contractId: ._id, data: .hmt_id, description: "", date: "", date_end: "", typeId: "5506e6b88ba7bdd7c56353b4"}' rawdata.json.keep >> key_facts.json

jq -c '{contractId: ._id, data: .address, description: "", date: "", date_end: "", typeId: "5506e6b88ba7bdd7c56353dc"}' rawdata.json.keep >> key_facts.json

jq -c '{contractId: ._id, data: .status, description: "", date: "", date_end: "", typeId: "5506e6b88ba7bdd7c56353be"}' rawdata.json.keep >> key_facts.json

jq -c '{contractId: ._id, data: .date_pref_bid, description: "", date: "", date_end: "", typeId: "5506e6b88ba7bdd7c56353c0"}' rawdata.json.keep >> key_facts.json

jq -c  '{contractId: ._id, data: .payments[]} | select(.data.estimated != 0) | {contractId, data: .data.estimated, date: .data.year, description: "", typeId: "5506e6b88ba7bdd7c56353d1"}'  rawdata.json.keep > payments.json


if [ 0 -ne $# ]
then
  #drop contracts, key_figures & key_facts tables
  mongo -p $pass -u $user $host/$db mongodrop.js
  mongoimport -h $host -db $db -p $pass -u $user -c contracts --file ./contracts.json
  mongoimport -h $host -db $db -p $pass -u $user -c key_ff_types --file ./key_ff_types.json
  mongoimport -h $host -db $db -p $pass -u $user -c key_fac_figs --file ./key_figures.json
  mongoimport -h $host -db $db -p $pass -u $user -c key_fac_figs --file ./key_facts.json
  mongoimport -h $host -db $db -p $pass -u $user -c key_fac_figs --file ./payments.json
  #script to switch ids into string format (from mongo object format)
  mongo -p $pass -u $user $host/$db mongoscript.js
else
  #drop contracts, key_figures & key_facts tables
  mongo $host/$db mongodrop.js
  mongoimport -h $host -db $db -c contracts --file ./contracts.json
  mongoimport -h $host -db $db -c key_ff_types --file ./key_ff_types.json
  mongoimport -h $host -db $db -c key_fac_figs --file ./key_figures.json
  mongoimport -h $host -db $db -c key_fac_figs --file ./key_facts.json
  mongoimport -h $host -db $db -c key_fac_figs --file ./payments.json
  #script to switch ids into string format (from mongo object format)
  mongo $host/$db mongoscript.js
fi





# Stuff we're not using atm

#mongoexport -h 127.0.0.1:3001 -db meteor -c contracts -o ./rawdata.json.keep

#___Contract fields___
#Name
#Department
#Constituency
#Region
#Sector
#Estimated Total Cost
#Authority

#___Key Fact / Figs___
# Date of OJEU
# Capital Value
# Contract Years
# Date of Construction Complete
# First Date of Operation
# Date of Financial Close
#Off Balance Sheet IFRS Rules
#Off Balance Sheet ESA95 Rules
#Off Balance Sheet GAAP Rules
#HMT_ID
#Address
#Status

#Date Pref Bid

#Stuff we can't add because it requires more than a tuple
#SPV Name
#SPV Address
#SPV_id
#Equity



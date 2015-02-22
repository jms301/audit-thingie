#rm old files
rm contracts.json
rm key_figures.json
rm key_facts.json
rm payments.json

#drop contracts, key_figures & key_facts tables
mongo localhost:3001/meteor mongodrop.js

#contract data
jq -c '{_id, name, department: .department.name, authority: .authority.name,  sector: .sector.name, est_cost: [.payments[].estimated] |add}' rawdata.json.keep > contracts.json

jq -c '{contractId: ._id, name: "Date of Financial Close", data: .date_fin_close, typeId: ""}' rawdata.json.keep > key_figures.json

jq -c '{contractId: ._id, name: "Capital Value", data: .capital_value, typeId: ""}' rawdata.json.keep >> key_figures.json

jq -c '{contractId: ._id, name: "Contract Years", data: .contract_years, typeId: ""}' rawdata.json.keep >> key_figures.json

jq -c '{contractId: ._id, name: "First Date of Operation", data: .date_ops, typeId: ""}' rawdata.json.keep >> key_figures.json

jq -c '{contractId: ._id, name: "Date Construction Complete", data: .date_cons_complete, typeId: ""}' rawdata.json.keep >> key_figures.json


jq -c '{contractId: ._id, name: "Date of OJEU", data: .date_ojeu, typeId: ""}' rawdata.json.keep >> key_figures.json

jq -c '{contractId: ._id, data: .off_balance_IFRS, name: "Off Balance IFRS", typeId: ""}' rawdata.json.keep > key_facts.json

jq -c '{contractId: ._id, data: .off_balance_GAAP, name: "Off Balance GAAP", typeId: ""}' rawdata.json.keep >> key_facts.json

jq -c '{contractId: ._id, data: .off_balance_ESA95, name: "Off Balance ESA95", typeId: ""}' rawdata.json.keep >> key_facts.json

jq -c '{contractId: ._id, data: .hmt_id, name: "HMT ID", typeId: ""}' rawdata.json.keep >> key_facts.json

jq -c '{contractId: ._id, data: .address, name: "Address", typeId: ""}' rawdata.json.keep >> key_facts.json

jq -c '{contractId: ._id, data: .status, name: "Status", typeId: ""}' rawdata.json.keep >> key_facts.json

jq -c '{contractId: ._id, data: .date_pref_bid, name: "Date Pref Bid", typeId: ""}' rawdata.json.keep >> key_facts.json

jq -c  '{contractId: ._id, data: .payments[]} | select(.data.estimated != 0) | {contractId, data: .data.estimated, date: .data.year, name: "Est Payment"}'  rawdata.json.keep > payments.json

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


#Import the contract table INCLUDING IDS (must not have clashing IDS already in database)
mongoimport -h 127.0.0.1:3001 -db meteor -c contracts --file ./contracts.json


mongoimport -h 127.0.0.1:3001 -db meteor -c key_fac_figs --file ./key_figures.json

mongoimport -h 127.0.0.1:3001 -db meteor -c key_fac_figs --file ./key_facts.json

mongoimport -h 127.0.0.1:3001 -db meteor -c key_fac_figs --file ./payments.json


#script to switch ids into string format (from mongo object format)
mongo localhost:3001/meteor mongoscript.js




# Stuff we're not using atm
#mongoexport -h 127.0.0.1:3001 -db meteor -c contracts -o ./rawdata.json.keep

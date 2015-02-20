#rm old files
rm contracts.json
rm key_figures.json
rm key_facts.json

#drop contracts, key_figures & key_facts tables
mongo localhost:3001/meteor mongodrop.js

#contract data
jq -c '{_id, name, department: .department.name, authority: .authority.name,  sector: .sector.name, est_cost: [.payments[].estimated] |add}' rawdata.json.keep > contracts.json

# spit out Date of Final Close
jq -c '{contractId: ._id, name: "Date of Final Close", data: .date_fin_close, typeId: ""}' rawdata.json.keep > key_figures.json

jq -c '{contractId: ._id, name: "Capital Value", data: .capital_value, typeId: ""}' rawdata.json.keep >> key_figures.json

jq -c '{contractId: ._id, name: "Contract Years", data: .contract_years, typeId: ""}' rawdata.json.keep >> key_figures.json
#
#jq -c '{contractId: ._id, name: "First Date of Operation", data: .date_ops, typeId: ""}' rawdata.json.keep >> key_figures.json

#jq -c '{contractId: ._id, name: "Date of Financial Close", data: .date_fin_close, typeId: ""}' rawdata.json.keep >> key_figures.json

jq -c '{contractId: ._id, name: "Date Construction Complete", data: .date_cons_complete, typeId: ""}' rawdata.json.keep >> key_figures.json


#jq -c '{contractId: ._id, name: "Date of OJEU", data: .date_ojeu, typeId: ""}' rawdata.json.keep >> key_figures.json

#Off Balance Sheet ESA95 Rules
#Off Balance Sheet GAAP Rules
#Off Balance Sheet IFRS Rules
#Authority
#Department
#Constituency
#Region
#SPV
#SPV Address
#Status
#Address



jq -c '{contractId: ._id, data: .off_balance_IFRS, name: "Off Balance IFRS", typeId: null}' rawdata.json.keep > key_facts.json


#Import the contract table INCLUDING IDS (must not have clashing IDS already in database) 
mongoimport -h 127.0.0.1:3001 -db meteor -c contracts --file ./contracts.json 


mongoimport -h 127.0.0.1:3001 -db meteor -c key_fac_figs --file ./key_figures.json 

mongoimport -h 127.0.0.1:3001 -db meteor -c key_fac_figs --file ./key_facts.json 


#script to switch ids into string format (from mongo object format)
mongo localhost:3001/meteor mongoscript.js




# Stuff we're not using atm
#mongoexport -h 127.0.0.1:3001 -db meteor -c contracts -o ./rawdata.json.keep 

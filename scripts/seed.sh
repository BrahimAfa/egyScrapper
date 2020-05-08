#!/bin/bash
# this script generates fake services to data.json
CT="Content-Type:application/json"
REQ="curl -H$CT -X GET http://localhost:3030/api/v1/seed/apps?n=$1" 
echo "🚀 EXECUTION :: $REQ"
RESPONSE=`$REQ`

#json is an NPM package
echo $RESPONSE | json -i -o json > ./data_app.json

echo '✅ data has been Exported to data_app.json File 🌟'
#!/bin/bash

# -d / --data ?
# -ct / --content-type default to json
# -x / --request method default to get
# -p / --port default to 3030
# -m / --model default services
# -a / --action  default search
# -q / --query ?

# if [[ $# -eq 0 ]];then
#     echo '[ERROR] :: Spicify the Request Method (GET,POST...)'
#     echo '[EX] :: index.sh -x GET'
#     usage 
#     exit 1
# fi

CT="Content-Type:application/json"
declare -u String method="GET"
port="3030"
action="search"
model="services"
query=""
count=false
data=""

usage(){
    echo "Usage:"
    echo '❗ to run this script you need:
        - ✔ JSON : npm i -g json
        - ✔ curl : installed by default in linux'
    echo " -p | --port : default to 3030"
    echo " -m | --model : default services"
    echo " -a | --action : default search"
    echo " -q | --query "
    echo " -d | --data : a json file contains your request data 
                to send it with post request"
    echo " -ct | --content-type : default to json"
    echo " -c | --count :  count the record that's been returned"
    echo " *               this param always should be at the end*"
    echo " -x |-X|--method : method default to GET (GET,POST,DELETE,PUT)"
    echo " --help | -h show this menu"
}

search(){
    if [[ ! -z $query ]]
    then
        query="?${query}"
        echo "====> $query"
    fi
    REQ="curl -d$data -H$CT -X $method http://localhost:$port/api/v1/$model/$action$query"
    echo "🚀 EXECUTION :: $REQ"
    RESPONSE=`$REQ`
    if  $count;then
        # the -c arg in Json tool for getting the number only in screen 
        echo $RESPONSE | json -e "console.log(this.length)" -A -c "this.name==='!__*_*__!'"
        exit 0;
    fi
    echo $RESPONSE | json -i
}

while [[ $# > 0 ]];do
    case "$1" in
        -a|--action) action="$2"; shift ;;
        -p|--port) port="$2"; shift ;;
        -m|--model) model="$2"; shift ;;
        -q|--query) query="$2"; shift ;;
        -d|--data) data="$2"; shift ;;
        -ct|--content-type) CT="$2"; shift ;;
        -x|-X|--method) method="$2"; shift ;;
        -c|--count) count=true; shift ;;
        -h|--help|*) usage ;exit 1 ;;
    esac
    shift
done
#turns method var to upsercase
search




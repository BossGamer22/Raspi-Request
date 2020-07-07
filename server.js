console.log('Initializing.')
//Variables
const Request = require('request');
const Express = require('express');
const J2url = require('j2url');
const PORTS = process.env.PORT || 8080 || 7470 || 7070;
const Api = Express();

//Tables
var ErrorTable = {
    "error": null
}

var ApiGetTable = {
    "method": null,
    "body": null
}

var GetTable = {
    "method": null,
    "body": null   
}

var PostTable = {
    "method": null,
    "body": null
}

//Main
Api.get('/', function(req, res){
    var selftable = J2url.getParam(req.originalUrl, 'selftable')
    if (selftable == ""){ //Checker 1
        ErrorTable.error = "Invalid Param!"
        res.json(ErrorTable)
    }else{
        if(selftable.Method == "" || selftable.Url == ""){ //Checker 2
            ErrorTable.error = "Something went wrong in the Table!"
            res.json(ErrorTable)
        }else{
            if(selftable.Method == "Get" || selftable.Method == "Post" || selftable.Method == "ApiGet"){
                if(selftable.Method == "Get"){
                    GetTable.method = "Get"
                    GetTable.body = Request.get(selftable.Url)
                    res.json(GetTable)
                }else if(selftable.Method == "Post"){
                    PostTable.method = "Post"
                    PostTable.body = Request.post(selftable.Url)
                    res.json(PostTable)
                }else if(selftable.Method == "ApiGet"){
                    Request(selftable.Url, function(err, response, body){
                        ApiGetTable.method = "ApiGet"
                        ApiGetTable.body = body
                        res.json(ApiGetTable)
                    })
                }
            }else{
                ErrorTable.error = "Undefined Method!"
                res.json(ErrorTable)  
            }
        }
    }
})

Api.listen(PORTS, () =>{
    console.log('Initialized.')
    console.log('Server & API Is Running.')
    console.log('Running on Port:'+PORTS)
})
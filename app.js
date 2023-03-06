const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))


app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
})

app.post("/",function(req,res){
    const fname = req.body.firstName;
    const lname = req.body.firstName;
    const email = req.body.email;
    

    const data = {
        members: [
            {
                email_address :email,
                status : "subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname
                }
            }
        ]
    }



    const jsonData = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/eac39c4b9d"

    const options = {
        method: "POST",
        auth: "sandeep:f8e8eba297fdbdc8a47f5f4c58904d65-us8"
    }

    const request = https.request(url, options, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname+'/success.html')
        }
        else{
            res.sendFile(__dirname+'/failure.html')
        }
        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData);
    request.end();
})

app.post('/failure',function(req,res){
    res.redirect('/');
})















app.listen(process.env.PORT,function(){
    console.log('server is running at port 3000')
})

// api KeyboardEvent
// f8e8eba297fdbdc8a47f5f4c58904d65-us8

// audiece Id
// eac39c4b9d
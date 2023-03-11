const express = require("express");
const cors = require("cors");
const Axios = require("axios");
const qs=require('qs');
const app = express();
const PORT = process.env.PORT ||5000;
 const path=require('path');
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname+"/public")))
 
app.post("/compile", (req, res) => {
    //getting the required data from the request
    let code = req.body.code;
    let language = req.body.language;
    let input = req.body.input;
 
    if (language === "python") {
        language="py"
    }
 
    let data = qs.stringify({
        "code": code,
        "language": language,
        "input": input
    });
    let config = {
        method: 'post',
        url: 'https://api.codex.jaagrav.in',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };
    //calling the code compilation API
    Axios(config)
        .then((response)=>{
            res.send(response.data)
            console.log(response.data)
        }).catch((error)=>{
            console.log(error);
        });
})
 
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
 
 

 
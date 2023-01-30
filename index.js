const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/",(req,res)=>{
    const GIF = req.body.gif;
    const API = "INHXeHpc0orSZWLK9H44ZmUdBTjSncvT";
    const domain = "api.giphy.com/v1/gifs/translate"
    const URL = "https://"+domain+"?api_key="+API+"&s="+GIF;
    console.log(URL);
    console.log(GIF);
    const buffer = [];
    axios.get(URL)
        .then(response=>{
            const responseBody = response.data;
            const src = responseBody.data.embed_url;
            console.log(responseBody.data.embed_url);
            res.send(`<iframe src=${src} width="700" height="700" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`)
        })
        .catch((err)=>{
            console.log("Error occured!");
        })
})

app.listen(3000,"127.0.0.1",()=>{
    console.log("Success!");
})
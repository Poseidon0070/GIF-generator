const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const cheerio = require("cheerio");
const axios = require("axios");
require('dotenv').config();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/",(req,res)=>{
    const GIF = req.body.gif;
    const API = process.env.API_KEY;
    console.log(API);
    const domain = "api.giphy.com/v1/gifs/translate"
    const URL = "https://"+domain+"?api_key="+API+"&s="+GIF;
    console.log(URL);
    console.log(GIF);
    async function fetchData(){
        try{
            const response = await axios.get(URL);
            responseBody = response.data;
            const src = responseBody.data.embed_url;
            console.log(responseBody.data.embed_url);
            fs.readFile("response.html","utf-8",(err,HTMLdata)=>{
                if(err){
                    console.log(err);
                    return ;
                }
                const $ = cheerio.load(HTMLdata);
                $("#img").attr("src",src);
                fs.writeFile("response.html",$.html(),"utf-8",(err)=>{
                        if(err){
                            console.log(err);
                        return;
                    }
                    console.log("Success!");
                    res.sendFile(__dirname+"/response.html");
                })
            })
        }catch{
                console.log("Cannot fetch data")
            }
    }
    fetchData();
})

// app.post("/",(req,res)=>{
//     const GIF = req.body.gif;
//     const API = process.env.API_KEY;
//     const domain = "api.giphy.com/v1/gifs/translate"
//     const URL = "https://"+domain+"?api_key="+API+"&s="+GIF;
//     console.log(URL);
//     console.log(GIF);
//     axios.get(URL)
//         .then((response)=>{
//             const responseBody = response.data;
//             const src = responseBody.data.embed_url;
//             console.log(responseBody.data.embed_url);
//             fs.readFile("response.html","utf-8",(err,HTMLdata)=>{
//                 if(err){
//                     console.log(err);
//                     return ;
//                 }
//                 const $ = cheerio.load(HTMLdata);
//                 $("#img").attr("src",src);
//                 fs.writeFile("response.html",$.html(),"utf-8",(err)=>{
//                         if(err){
//                             console.log(err);
//                         return;
//                     }
//                     console.log("Success!");
//                     res.sendFile(__dirname+"/response.html");
//                 })
//             })
//         })
//         .catch((err)=>{
//             console.log("Error occured!");
//         })
// })

app.listen(3000,"127.0.0.1",()=>{
    console.log("Success!");
})
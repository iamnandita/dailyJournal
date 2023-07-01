const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");

const homeStartingContent = "Dear Dairy, my name is Nandita Singh and I've created you.\'Created\'? No I think Made is a more appropriate word. What can I tell you about me... I love \'Creating\' things and I love reading novels which I've been doing for atmost a year now and I haven't read a page for weeks now because I'm doing the thing that I love more than reading and that is coding .And off course now I'm going to love you. ";
const aboutContent = "Just me, my dairy and my life.";
const contactContent = "I'm not going to share my number but you can contact me at iamnanditasingh@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/dailyJournalDB");

const journalSchema=new mongoose.Schema({
  title:String,
  body:String
})

const Entry=mongoose.model("Entry",journalSchema);



app.get("/",function(req,res){

  Entry.find().then(function(posts){
    res.render("home",{
      home:homeStartingContent,
      posts:posts,
    })
  })
})

app.get("/compose",function(req,res){
  res.render("compose")
})

app.post("/compose",function(req,res){
    const post= new Entry({
    title:req.body.postTitle,
    body:req.body.postBody
  })
  post.save();
  res.redirect("/");
})

app.get("/posts/:topic",function(req,res){
 const heading=req.params.topic;
 Entry.findOne({title:heading}).then(function(post){
  res.render("post",{
    title:heading,
    body:post.body
  })
 })
})

app.get("/about",function(req,res){
  res.render("about",{
    about:aboutContent,
  })
})

app.get("/contact",function(req,res){
  res.render("contact",{
    contact:contactContent,
  })
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

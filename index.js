const express=require('express');
const hbs=require("hbs");
var cors=require('cors');
const mysql=require("mysql");
const connection=require('./connection');
const userRoute=require('./routes/user');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');

require(`dotenv`).config();

const app=express();
const path=require("path");

app.use(session({ 
    secret: '123458cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

const static_path=path.join(__dirname,"./public");
const template_path=path.join(__dirname,"./views");
const partials_path=path.join(__dirname,"./views/partials");
//app.use(express.static());
const port=process.env.PORT || 4000;



app.use(cors());
app.use('/user',userRoute);
//parsing middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//templating engine
app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.use(flash());

//router
app.get('',(req,res)=>{
    res.render('main');
});
app.use('',require("./routes/user"));

app.listen(port,()=>console.log(`Listening on port ${port}`));

module.exports=app;

const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');

require("./db/conn");
const Register = require("./models/register");

const port = process.env.PORT || 4000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("login")
});

app.get("/register",(req,res)=>{
    res.render("register")
});

app.get("/login",(req,res)=>{
 res.render("login")
})

app.post("/register",async (req,res)=>{
 try {
    const password=req.body.password;
    const cpassword=req.body.confirmpassword;
    if (password===cpassword) {      
        const registerEmployee= new Register({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            phone : req.body.phone,
            password : req.body.password,
            confirmpassword : req.body.confirmpassword
        })
const registered= await registerEmployee.save();
res.status(201).render("index");

    }
    else{
        res.status().send("password are not matching")
    }
 } catch (err) {
    res.status(500).send({msg: "Error", error: err.message});
 }
})


app.post("/login",async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail =await Register.findOne({email:email});
        if (useremail.password===password) {
            res.status(201).render("index");
        } else {
            res.send("password are not matching")
        }
    } catch (err) {
        res.status(500).send({msg: "Error", error: err.message});
    }
})


app.listen(port, () => {
    console.log(`server is running at port no ${port}`);   
})





 
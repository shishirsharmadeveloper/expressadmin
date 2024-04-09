const Mongoose = require('mongoose');
const User = require("../models/user");
const session = require('express-session');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.Login=(req,res)=>{
    res.render('index',{layout:false,message:req.flash('message')});
}

exports.Userlogout=(req,res)=>{
    req.session.destroy((err)=>{
        if(err)
        throw err;
        else
        res.redirect('/');

    });
}

exports.Userlogin=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.render('index',{layout:false,message:errors.mapped()});  
    }
    else
    {
        const singleUser = await User.findOne({
            email:req.body.email
        })
    
        if(singleUser){
            bcrypt.compare(req.body.password,singleUser.password,(err,record)=>{
              if(record){
                req.session.userid=singleUser._id;
                req.session.name=singleUser.name;
                req.session.password=singleUser.password;
                res.redirect('dashboard');
              }
              else
              {
                req.flash('message','Wrong password');
                res.redirect('/');
              }
            })
        }
        else{
            req.flash('message','User not found');
            res.redirect('/');
        }
    
    }

    
}

exports.Register=(req,res)=>{
    req.session.username='shishir sharma';
    res.render('register',{layout:false,message:req.flash('message')});
}

exports.About=(req,res)=>{
    console.log(req.session.username);
    res.render('index',{username:req.session.username});
}

exports.Dashboard=(req,res)=>{
    if(req.session.userid)
    res.render('dashboard');
    else
    res.redirect('/');
}

exports.Contact=(req,res)=>{
    res.render('contact');
}

exports.test=(req,res)=>{
    console.log(req.params.id,req.params.name);
    res.render('test');
}

exports.SaveForm=(req,res)=>{
    let name=req.body.name;
    let email=req.body.email;
    let rounds = 10;
    let hashpassword = bcrypt.hashSync(req.body.password,rounds);
    let phone = req.body.phone;
    const user = new User({
        _id : new Mongoose.Types.ObjectId,
        name : name,
        email : email,
        password : hashpassword,
        phone : phone
    });

    user.save().then(data=>{
        req.flash('message','Record Saved');
        res.redirect("/register");
    })
    .catch(err=>{
        console.log('Record Saved');
        res.redirect("/register");
    });
    
}
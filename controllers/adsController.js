const Mongoose = require('mongoose');
const Ad = require("../models/ad");
const session = require('express-session');
const fs = require('fs');


exports.AdPost=(req,res)=>{
    res.render('adpost',{message:req.flash('message')});
}

exports.AdView=async(req,res)=>{
    if(req.session.userid){
        try{
            const ads = await Ad.findOne({_id:req.params.id})
            res.render('adview',{ads})
        }catch(error){
            console.log('error')
        }
    }
    else
    res.redirect('/');
}

exports.AdDelete=async(req,res)=>{
    if(req.session.userid){
        try{
            await Ad.deleteOne({_id:req.params.id})
            res.redirect('/adlist');
        }catch(error){
            console.log('error')
        }
    }
    else
    res.redirect('/');
}
exports.AdEdit=async(req,res)=>{
    if(req.session.userid){
        try{
            const ads = await Ad.findOne({_id:req.params.id})
            res.render('adedit',{ads})
        }catch(error){
            console.log('error')
        }
    }
    else
    res.redirect('/');
}

exports.AdUpdate=async(req,res)=>{  

    if(req.file.filename){  
        const singleRecord=await Ad.findById({_id:req.body.id});  
        filepath="public/uploads/"+singleRecord.photo;
        fs.unlinkSync(filepath);
               
    }


    if(req.session.userid){
        try{
            await Ad.findByIdAndUpdate(req.body.id,{
               title:req.body.title,
               photo:req.file.filename,
               description:req.body.description,
               price:req.body.price,
               city:req.body.city,
               country:req.body.country 
            });
            await res.redirect('/adlist');
        }catch(error){
            console.log('error')
        }
    }
    else
    res.redirect('/');
}
exports.AdList= async(req,res)=>{
    let perPage = 4;
    let page = req.query.page || 1;
    let countRecord = await Ad.countDocuments({});
    if(req.session.userid){
        await Ad.find().skip(perPage*page-perPage).limit(perPage).then(result=>{
            res.render('adlist',
            {postdata:result,currentPage:page,pages:Math.ceil(countRecord/perPage)});
        })
        
    }
    
    else
    res.redirect('/');
    
}

exports.SaveAd=(req,res)=>{
    let title=req.body.title;
    let photo=req.file.filename;
    let description=req.body.description;
    let price = req.body.price;
    let city = req.body.city;
    let country = req.body.country;

    const ad = new Ad({
        _id : new Mongoose.Types.ObjectId,
        title : title,
        photo : photo,
        description : description,
        price : price,
        city : city,
        country : country
    });

    ad.save().then(data=>{
        req.flash('message','Ad successfully Post');
        res.redirect("/adpost");
    })
    .catch(err=>{
        console.log('Error');
        res.redirect("/adpost");
    });
    
}
const express = require('express');
const route = express.Router();
const controller = require('../controllers/userController');
const adscontroller = require('../controllers/adsController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        return cb(null,'./public/uploads')
    },
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({storage:storage});

// User routes
route.get('/',controller.Login);
route.post('/userlogin',controller.Userlogin);
route.get('/userlogout',controller.Userlogout);
route.get('/about',controller.About)
route.get('/register',controller.Register);
route.get('/dashboard',controller.Dashboard)
route.get('/contact',controller.Contact)
route.get('/test/:id/:name',controller.test)
route.post('/saveform',controller.SaveForm)

// Ads routes
route.get('/adpost',adscontroller.AdPost)
route.post('/savead',upload.single('photo'),adscontroller.SaveAd)
route.get('/adlist',adscontroller.AdList)
route.get('/adview/:id',adscontroller.AdView)
route.get('/adedit/:id',adscontroller.AdEdit)
route.post('/adupdate',upload.single('photo'),adscontroller.AdUpdate)
route.get('/addelete/:id',adscontroller.AdDelete)


module.exports = route;
const express = require('express');
const connection = require('../connection');
const { home } = require('nodemon/lib/utils');
const router = express.Router();
var bcrypt = require('bcrypt');

router.post('/login', function (req, res) {
    let name = req.body.name;
    let password = req.body.password;
    connection.query("select * FROM user WHERE name=? AND password=?", [name, password], function (error, results, fields) {


        if (results.length <= 0 || results[0].password != password) {
            res.render('main', { desc: "<p>hey</p>" });
        }
        else if (results[0].status == 'false') {
            return res.status(401).json({ message: "Wait for admin approval" });
        }
        else if (results[0].password = password) {
            res.render("home");
        }
        else {
            return res.status(400).json({ message: "Something went wrong,please try again later" });
        }


    })
})

router.get("/logout", (req, res) => {
    res.redirect("/");
});
//router.get("/change",(req,res)=>{
 //   res.render('changepassword');
//});

router.post('/changePassword', async(req, res) =>{
    let password=req.body.password;
   let name = req.body.name;
   let newPassword=req.body.oldPassword;


  //  const user = await User.findById(req.params.userId);
  //  const isValidPassword = await bcrypt.compare(oldPassword, user.password);
  //  if (!isValidPassword) {
 //      res.render('home', { des: "<p>hey</p>" });
 //   }
 
    connection.query("select *FROM user WHERE name=? AND password=?", [name,password], function(err, results,fields) {
        if (results.length <= 0) {
              connection.query("UPDATE user SET password=? where name=?", [newPassword,name], function(err, results,fields) {
if (!err) {
   // return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
                 res.render('home', { deb: "<p>hey</p>" });
               }
                 else {
                      return res.status(500).json(err);
                    }
                });
           }
    else {
        return res.status(500).json(err);
              }

            });
})



module.exports = router;
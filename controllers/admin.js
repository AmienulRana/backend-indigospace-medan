const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
  login : async (req,res) =>{
    try{
      const foundAdmin = await Admin.findOne({
        username:req.body.username
      }).exec();
      if(foundAdmin){
        const storedPass = foundAdmin.password;
        const payload = {
          username:req.body.username,
          password:req.body.password
        }
        const jwt_result = generateAccessToken(payload);
        const passwordMatch = await bcrypt.compare(req.body.password, storedPass);
        if(passwordMatch){
          res.status(200).json({
            message:'Login sukses',
            token:jwt_result,
            error:false
          })
        }else{
          res.status(201).json({
            message:'username atau password anda salah',
            error:true
          })
        }
      }else{
        res.status(201).json({
          message:'username anda salah',
          error:true
        })
      }
    }catch(err){
      console.log(err);
    }
  }
}

function generateAccessToken(data){
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "72h"})
}

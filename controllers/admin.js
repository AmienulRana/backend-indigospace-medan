const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { error } = require('../response');
module.exports = {
  login : async (req,res) =>{
    try{
      const foundAdmin = await Admin.findOne({
        username:req.body.username
      });
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
          return error(res,'username atau password anda salah');
        }
      }else{
        return error(res,'username atau password anda salah');
      }
    }catch(err){
      console.log(err);
    }
  }
}

function generateAccessToken(data){
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "72h"})
}

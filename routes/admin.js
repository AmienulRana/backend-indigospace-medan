const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const middleware = require('../middleware')
const admin = (app) => {
  const cAdmin = require('../controllers/admin');
  app.route('/login').post(cAdmin.login)
}
module.exports = admin;


// / app.route('/register').get((req,res) => {
//   res.render('registrasi')
// })
// app.route('/registrasi').post(async(req,res) => {
//   let data = req.body
//   try{
//     data.password = await bcrypt.hash(req.body.password, 10);
//     const admin = new Admin(req.body);
//     await admin.save()
//   }catch(err){
//     console.log(err);
//   }
//   res.redirect('/')
//
// })

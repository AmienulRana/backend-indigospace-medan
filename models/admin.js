const mongoose = require('mongoose');

const SchemaAdmin = new mongoose.Schema({
  username:{
    required:true,
    type:String
  },
  password:{
    type:String,
    required:true
  }
})

const Admin = mongoose.model('admin', SchemaAdmin)

module.exports = Admin;

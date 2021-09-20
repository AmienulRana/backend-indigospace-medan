const mongoose = require('mongoose');
const moment = require('moment');
const SchemaEvent = mongoose.Schema({
  nama_event:{
    type:String,
    required:true,
  },
  jadwal_event:{
    type:String,
    required:true,
    default:'-'
  },
  lokasi_event:{
    type:String,
    required:true
  }
})

module.exports = mongoose.model('event', SchemaEvent);

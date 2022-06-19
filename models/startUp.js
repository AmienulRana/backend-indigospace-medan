const mongoose = require("mongoose");

const StartUpSchema = mongoose.Schema({
  _id_event: {
    type: String,
    required: true,
  },
  nama_startup: {
    required: true,
    type: String,
  },
  founder: {
    required: true,
    type: String,
    default: "-",
  },
  bidang: {
    required: true,
    type: String,
  },
  lokasi: {
    type: String,
  },
  keterangan: {
    required: true,
    type: String,
    default: "Absen",
  },
  imgQrCode: {
    type: String,
    default: "-",
  },
  waktu_hadir: {
    type:String,
    default: '-'
  }
});

module.exports = mongoose.model("startup", StartUpSchema);

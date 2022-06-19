const mongoose = require("mongoose");
const SchemaInvestor = mongoose.Schema({
  _id_event: {
    type: String,
    required: true,
  },
  nama_investor: {
    type: String,
    required: true,
  },
  daerah: {
    type: String,
  },
  sector_usaha: {
    type: String,
  },
  perusahaan: {
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

module.exports = mongoose.model("investor", SchemaInvestor);

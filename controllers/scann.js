const StartUp = require("../models/startUp");
const Investor = require("../models/investor");
const Event = require('../models/event');
const { error, success } = require('../response');

const updateKeterangan = (data, model, res) => {
  const sayName = data.nama_investor || data.nama_startup;
  const date = new Date();
  const time = `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
  if(data.keterangan === 'Absen'){
    model.updateOne({ _id: data._id }, { $set: { keterangan: "Hadir", waktu_hadir: time } }
    ).then(() =>  success(res, `Selamat Datang ${sayName}`));
  }else return error(res, 'Anda telah Hadir dalam event ini');
}
module.exports = {
  scann: async (req, res) => {
    const { _id } = req.body;
    const date = new Date();
    const month = ['01', '02','03','04','05','06','07','08','09','10','11','12'];
    const timeEvent = `${date.getFullYear()}-${month[date.getMonth()]}-${date.getDate()}`;
    try {
      const startup = await StartUp.findOne({ _id });
      const investor = await Investor.findOne({ _id });
      if(startup){
        const eventStartup = await Event.findOne({_id :startup._id_event});
        if(eventStartup.jadwal_event === timeEvent){
          return updateKeterangan(startup, StartUp, ResizeObserverEntry)
        }
        else if(eventStartup.jadwal_event < timeEvent || eventInvestor.jadwal_event < timeEvent){
          return error(res, 'Event ini belum dimulai');
        }else{
          return error(res, 'Event ini Sudah berakhir');
        }
      }else if(investor){
        const eventInvestor = await Event.findOne({_id :investor._id_event});
        if(eventInvestor.jadwal_event === timeEvent){
            return updateKeterangan(investor, Investor, res)
        }
        else if(eventStartup.jadwal_event < timeEvent || eventInvestor.jadwal_event < timeEvent){
          return error(res, 'Event ini belum dimulai');
        }else{
          return error(res, 'Event ini Sudah berakhir');
        }
      }else{
        return error(res, 'Anda tidak terdaftar dalam event manapun!')
      }
    } catch (err) {
      console.log(err);
    }
  },
};

const Event = require("../models/event");
const StartUp = require("../models/startUp");
const Investor = require("../models/investor");
module.exports = {
  getEvent: async (req, res) => {
    try {
      const dataEvent = await Event.find();
      res.status(200).json({
        events: dataEvent,
        error: false,
      });
    } catch (err) {
      console.log(err);
      res.status(201).json({
        message: "Gagal Mengambil Data",
        error: true,
      });
    }
  },
  addEvent: async (req, res) => {
    const newEvent = new Event(req.body);
    try {
      await newEvent.save();
      res.status(200).json({
        message: "Event berhasil ditambahkan",
        error: false,
      });
    } catch (err) {
      res.status(201).json({
        message: "Event gagal ditambahkan",
        error: true,
      });
    }
  },
  DetailEvent: async (req, res) => {
    try {
      const event = await Event.findOne({ _id: req.params.id });
      const startUps = await StartUp.find({ id_event: req.params.id });
      res.status(200).json({
        event: event,
        startUps: startUps,
        error: false,
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteEvent: async (req, res) => {
    const { id } = req.params;
    try {
      await Event.deleteOne({ _id: id }).then(async () => {
        await StartUp.deleteMany({ _id_event: id }).then();
        await Investor.deleteMany({ _id_event: id }).then();
        const events = await Event.find().exec().then();
        res.status(200).json({
          message: "Event berhasil Dihapus",
          events: events,
          error: false,
        });
      });
    } catch (err) {
      console.log(err);
    }
  },
};

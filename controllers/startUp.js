const Startup = require("../models/startUp");
const QRCode = require("qrcode");
module.exports = {
  getPost: async (req, res) => {
    const _id_event = req.params.eventId;
    try {
      const startUps = await Startup.find({ _id_event: _id_event });
      res.status(200).json({
        startup: startUps,
        error: false,
      });
    } catch {
      res.status(201).json({
        message: "Gagal Mengambil data",
        error: true,
      });
    }
  },
  getDetailPost: async (req, res) => {
    const { id } = req.params;
    try {
      QRCode.toDataURL(id, async (err, src) => {
        if (err) {
          res.status(201).json({
            message: "Gagal Mengenerate Qr Code",
            error: true,
          });
        }
        const qrStartup = await Startup.updateOne(
          { _id: id },
          { $set: { imgQrCode: src } }
        ).then(async () => {
          const startup = await Startup.findOne({ _id: id });
          res.status(200).json({
            startup: startup,
            error: false,
          });
        });
      });
    } catch (err) {
      res.status(201).json({
        message: "Gagal Mengambil Data",
        error: true,
      });
    }
  },
  addPost: async (req, res) => {
    const _id_event = req.params.eventId;
    const startUp = new Startup({ ...req.body, _id_event });
    try {
      await startUp.save();
      res.status(200).json({
        message: "Berhasil Menambahkan Start Up",
        error: false,
      });
    } catch {
      res.status(201).json({
        message: "Gagal Menambahkan Start Up",
        error: true,
      });
    }
  },
  deletePost: async (req, res) => {
    const { id } = req.params;
    try {
      await Startup.deleteOne({ _id: id }).then(() => {
        // const events = await Event.find().exec().then();
        res.status(200).json({
          message: "Event berhasil Dihapus",
          error: false,
        });
      });
    } catch (err) {
      console.log(err);
    }
  },
};

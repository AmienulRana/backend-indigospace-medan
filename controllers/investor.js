const Investor = require("../models/investor");
const QRCode = require("qrcode");
module.exports = {
  getPost: async (req, res) => {
    const _id_event = req.params.eventId;
    try {
      const investors = await Investor.find({ _id_event: _id_event });
      res.status(200).json({
        investor: investors,
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
        const qrInvestor = await Investor.updateOne(
          { _id: id },
          { $set: { imgQrCode: src } }
        ).then(async () => {
          const investor = await Investor.findOne({ _id: id });
          res.status(200).json({
            investor: investor,
            error: false,
          });
        });
      });
    } catch (err) {
      // console.log(err);
      res.status(201).json({
        message: "Gagal Mengambil Data",
        error: true,
      });
    }
  },
  addPost: async (req, res) => {
    const _id_event = req.params.eventId;
    const startUp = new Investor({ ...req.body, _id_event });
    try {
      await startUp.save();
      res.status(200).json({
        message: "Berhasil Menambahkan Investor",
        error: false,
      });
    } catch {
      res.status(201).json({
        message: "Gagal Menambahkan Investor",
        error: true,
      });
    }
  },
  deletePost: async (req, res) => {
    const { id } = req.params;
    try {
      await Investor.deleteOne({ _id: id }).then(() => {
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

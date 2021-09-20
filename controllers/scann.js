const StartUp = require("../models/startUp");
const Investor = require("../models/investor");

module.exports = {
  getDetail: async (req, res) => {
    const { eventId } = req.params;
    const { _id } = req.body;
    try {
      const startups = await StartUp.find({ _id_event: eventId }).then(
        async (result) => {
          const startup = result.filter((res) => res._id == _id);
          if (startup.length > 0) {
            if (startup[0].keterangan === "Absen") {
              const updt = StartUp.updateOne(
                { _id: _id },
                { $set: { keterangan: "Hadir" } }
              ).then(() => {
                res.status(200).json({
                  message: "Selamat Datang " + startup[0].nama_startup,
                  error: false,
                });
              });
            } else if (startup[0].keterangan === "Hadir") {
              res.status(201).json({
                message: "Anda telah Hadir dalam event ini",
                error: false,
              });
            }
          } else if (startup.length < 1) {
            const investors = await Investor.find({
              _id_event: eventId,
            }).then(async (result) => {
              const investor = result.filter((res) => res._id == _id);
              if (investor.length > 0) {
                if (investor[0].keterangan === "Absen") {
                  const updt = Investor.updateOne(
                    { _id: _id },
                    { $set: { keterangan: "Hadir" } }
                  ).then(() => {
                    res.status(200).json({
                      message: "Selamat Datang " + investor[0].nama_investor,
                      error: false,
                    });
                  });
                } else if (investor[0].keterangan === "Hadir") {
                  res.status(201).json({
                    message: "Anda telah Hadir dalam event ini",
                    error: true,
                  });
                }
              } else {
                res.status(201).json({
                  message: "Anda tidak terdaftar dalam Event ini",
                  error: true,
                });
              }
            });
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
};

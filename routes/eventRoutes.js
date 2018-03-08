// const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Event = mongoose.model("events");

module.exports = app => {
  app.get("/api/events/", requireLogin, async (req, res) => {
    const events = await Event.find({ _user: req.user.id });

    res.send(events);
  });

  app.post("/api/event/", requireLogin, async (req, res) => {
    const event = await Event.find({ _id: req.body.id });
    res.send(event);
  });

  app.post("/api/event/update/", requireLogin, async (req, res) => {
    const { id, title, fromTime, tillTime, start, duration } = req.body;

    const event = await Event.updateOne(
      { _id: id },
      { title, fromTime, tillTime, start, duration }
    );
    res.send(event);
  });

  app.post("/api/event/add", requireLogin, async (req, res) => {
    const { id, title, fromTime, tillTime, start, duration } = req.body;

    const event = new Event({
      title,
      fromTime,
      tillTime,
      start,
      duration,
      _user: req.user.id
    });

    try {
      const savedEvent = await event.save();
      res.send(savedEvent);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post("/api/event/delete/", requireLogin, async (req, res) => {
    const event = await Event.deleteOne({ _id: req.body.id });
    res.send(event);
  });
};

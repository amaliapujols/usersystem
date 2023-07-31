const express = require("express");
const router = express.Router();
const Model = require("../models/model");
const bodyParser = require("body-parser");

router.get("/users", async (req, res) => {
  try {
    const _data = await Model.find();
    res.status(200).json(_data);
  } catch(error) {
    res.status(500).json({messsage: error.message})
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const _data = await Model.findById(req.params.id);
    res.status(200).json(_data);
  } catch(error) {
    res.status(500).json({messsage: error.message})
  }
});

router.post("/users", bodyParser.json(), async (req, res) => {
  const data = new Model({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    telephone: req.body.telephone
  });
  try {
    const _data = await data.save();
    res.status(200).json(_data);
  } catch(error) {
    res.status(400).json({messsage: error.message})
  }
});

router.patch("/users/:id", bodyParser.json(), async (req, res) => {
  try {
    const updatedData = req.body;
    const _data = await Model.findByIdAndUpdate(req.params.id, updatedData);
    res.status(200).json(_data);
  } catch(error) {
    res.status(500).json({messsage: error.message})
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const _data = await Model.findByIdAndDelete(req.params.id);
    res.status(200).json(_data);
  } catch(error) {
    res.status(500).json({messsage: error.message})
  }
});

module.exports = router;

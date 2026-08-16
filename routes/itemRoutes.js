
import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Backend is running!" });
});

router.get("/items", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/items", async (req, res) => {
  try {
    const newItem = new Item({ title: req.body.title });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
import express from "express";
import {
  listAllItems,
  createItem,
  updateItem,
  deleteItem,
} from "../dynamodb/dynamodb.js";

const router = express.Router();

// GET /items
router.get("/", async (req, res) => {
  const items = await listAllItems("ShoppingList");
  res.json(items);
});

// POST /items
router.post("/", async (req, res) => {
  const newItem = req.body;
  const item = await createItem("ShoppingList",newItem);
  res.json(item);
});

// PUT /items/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const updated = await updateItem("ShoppingList",id, updates);
  res.json(updated);
});

// DELETE /items/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await deleteItem("ShoppingList",id);
  res.json(result);
});

export default router;

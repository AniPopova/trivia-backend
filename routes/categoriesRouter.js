const express = require("express");
const categoryService = require("../services/categoriesService");

const categoryRouter = express.Router();

categoryRouter.get("/all-categories-sorted", async (req, res) => {
  try {
    const allCategories = await categoryService.getAllCategories();
    res.json(allCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = categoryRouter;

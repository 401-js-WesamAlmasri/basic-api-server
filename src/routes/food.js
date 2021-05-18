'use strict';

const experss = require('express');
const router = experss.Router();
const validator = require('../middleware/validator');

const Food = require('../models/food');
const food = new Food();

// routes
router.post('/', validator,createFood);
router.get('/', getFoods);
router.get('/:id', getSingleFood);
router.put('/:id',validator, updateFood);
router.delete('/:id', deleteFood);

// routes handlers

function getFoods(req, res, next) {
  const foodsArr = food.get();
  res.status(200).json(foodsArr);
}

function getSingleFood(req, res, next) {
  const id = req.params.id;
  const foodObj = food.get(id);
  res.status(200).json(foodObj);
}

function createFood(req, res, next) {
  const data = req.body;
  const foodObj = food.create(data);
  res.status(201).json(foodObj);
}

function updateFood(req, res, next) {
  const id = req.params.id;
  const data = req.body;
  const foodObj = food.update(id, data);
  res.status(200).json(foodObj);
}

function deleteFood(req, res, next) {
  const id = req.params.id;
  const foodObj = food.delete(id);
  res.status(200).json(foodObj);
}

module.exports = router;
'use strict';

const experss = require('express');
const router = experss.Router();
const validator = require('../middleware/validator');

const Cloth = require('../models/clothes');
const cloth = new Cloth();

router.use(validator);
// routes
router.get('/', getClothes);
router.get('/:id', getSingleClothe);
router.post('/', createClothe);
router.put('/:id', updateClothe);
router.delete('/:id', deleteClothe);

// routes handlers

function getClothes(req, res, next) {
  const clothArr = cloth.get();
  res.status(200).json(clothArr);
}

function getSingleClothe(req, res, next) {
  const id = req.params.id;
  const clothObj = cloth.get(id);
  res.status(200).json(clothObj);
}

function createClothe(req, res, next) {
  const data = req.body;
  const clothObj = cloth.create(data);
  res.status(201).json(clothObj);
}

function updateClothe(req, res, next) {
  const id = req.params.id;
  const data = req.body;
  const clothObj = cloth.update(id, data);
  res.status(200).json(clothObj);
}

function deleteClothe(req, res, next) {
  const id = req.params.id;
  const clothObj = cloth.delete(id);
  res.status(200).json(clothObj);
}

module.exports = router;
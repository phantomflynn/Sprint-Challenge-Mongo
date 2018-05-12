const express = require('express');
const Expense = require('./expenseModel');
const Budget = require('../budget/budgetModel');
const Category = require('../category/categoryModel');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    Expense
      .find() // returns array of expenses
      .then(expense => res.status(200).json(expense))
      .catch(err => res.status(500).json(err))
  })

  .post((req, res) => {
    const { amount, description, budget, category } = req.body;
    const expense = new Expense(req.body);
    expense
      .save()
      .then(expense => res.status(201).json(expense))
      .catch(err => res.status(500).json("Error."))
  })

router.route('/:id').get((req, res) => {
  Expense
    .findById(req.params.id)
    .populate('budget')
    .populate('category')
    .then(expense => res.status(200).json(expense))
    .catch(err => res.status(500).json(err))
})

module.exports = router;
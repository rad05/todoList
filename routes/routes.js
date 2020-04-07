const express = require('express');
const todoListController = require('../controllers/todo.controller');
module.exports = (function () {
  var router = express.Router();

  router.post('/add', todoListController.addList);
  router.patch('/update', todoListController.updateList);
  router.get('/get', todoListController.getAllTasks);
  router.get('/getRecord',todoListController.getRecord)
  router.delete('/delete', todoListController.delete)


  return router;

})();




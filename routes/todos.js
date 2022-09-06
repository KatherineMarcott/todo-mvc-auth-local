const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, todosController.getTodos)

router.post('/createTodo', todosController.createTodo)

router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.put('/upTodo', todosController.upTodo)

router.put('/downTodo', todosController.downTodo)

router.put('/editTodo', todosController.editTodo)

router.delete('/deleteTodo', todosController.deleteTodo)



module.exports = router
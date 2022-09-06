const Todo = require('../models/Todo')
const User = require('../models/User')

module.exports = {
  getTodos: async (req, res) => {
    //console.log(req.user)
    try {
      const todoItems = await Todo.find({ userId: req.user.id })//.sort({priority: 1})
      const itemsLeft = await Todo.countDocuments({ userId: req.user.id, completed: false })
      // temporary to fix broken users
      if (req.user.todoOrderList == undefined || todoItems.length != req.user.todoOrderList.length) {
        await User.updateOne({ _id: req.user.id }, { todoOrderList: todoItems.map(e => e._id) })
      }

      // Instead of using the DB to sort we are doing a custom sort based on an array
      // stored in the User model
      todoItems.sort((a, b) => req.user.todoOrderList.indexOf(a._id) - req.user.todoOrderList.indexOf(b._id))

      res.render('todos.ejs', { todos: todoItems, left: itemsLeft, user: req.user })
    } catch (err) {
      console.log(err)
    }
  },
  createTodo: async (req, res) => {
    try {
      const createData = await Todo.create({
        todo: req.body.todoItem,
        completed: false,
        userId: req.user.id,
        priority: parseInt(req.body.priority),
        todoNote: req.body.todoNote
      })

      // technically we can ignore priority now, default would be to the end of the list
      if (isNaN(req.body.priority)) {
        await User.updateOne({ _id: req.user.id }, { $push: { todoOrderList: createData._id } })
      } else {
        // split open our ordered list and put the new id in the middle somewhere
        // or at the end, beginning, wherever, its cool
        const reorderedTodos = req.user.todoOrderList.slice(0, parseInt(req.body.priority) - 1)
          .concat(createData._id)
          .concat(req.user.todoOrderList.slice(parseInt(req.body.priority) - 1))

        // then overwrite the existing list
        await User.updateOne({ _id: req.user.id }, { todoOrderList: reorderedTodos })
      }
      console.log('Todo has been added!')
      res.redirect('/todos')
    } catch (err) {
      console.log(err)
    }
  },
  markComplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, {
        completed: true
      })
      console.log('Marked Complete')
      res.json('Marked Complete')
    } catch (err) {
      console.log(err)
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, {
        completed: false
      })
      console.log('Marked Incomplete')
      res.json('Marked Incomplete')
    } catch (err) {
      console.log(err)
    }
  },
  editTodo: async(req, res) => {
    try{
      await Todo.replaceOne({ _id: req.body.todoIdFromJSFile }, {
        todo: req.body.
      })
    }catch(err){
      console.log(err)
    }
  },
  deleteTodo: async (req, res) => {
    console.log(req.body.todoIdFromJSFile)
    try {
      await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile })

      // a little mongodb magic to remove an element from the array
      await User.updateOne({ _id: req.user.id }, { $pull: { todoOrderList: req.body.todoIdFromJSFile } })

      console.log('Deleted Todo')
      res.json('Deleted It')
    } catch (err) {
      console.log(err)
    }
  },
  upTodo: async (req, res) => {
    try {
      // these simply swap the elements in the ordered list up or down
      // if its possible to do so
      let currentIndex = req.user.todoOrderList.indexOf(req.body.todoIdFromJSFile)
      if (currentIndex > 0) {
        const tmp = req.user.todoOrderList[currentIndex]
        req.user.todoOrderList[currentIndex] = req.user.todoOrderList[currentIndex - 1]
        req.user.todoOrderList[currentIndex - 1] = tmp
      }
      await User.updateOne({ _id: req.user.id }, { todoOrderList: req.user.todoOrderList })
      res.json('upTodoed')
    } catch (err) {
      console.log(err)
    }
  },
  downTodo: async (req, res) => {
    try {
      let currentIndex = req.user.todoOrderList.indexOf(req.body.todoIdFromJSFile)
      if (currentIndex < req.user.todoOrderList.length - 1) {
        const tmp = req.user.todoOrderList[currentIndex]
        req.user.todoOrderList[currentIndex] = req.user.todoOrderList[currentIndex + 1]
        req.user.todoOrderList[currentIndex + 1] = tmp
      }
      await User.updateOne({ _id: req.user.id }, { todoOrderList: req.user.todoOrderList })
      res.json('downTodoed')
    } catch (err) {
      console.log(err)
    }
  }
}
# Introduction

A Simple ToDo App is built using the MVC Architecture, we have also implemented "authorization" so folx can sign up, customize & personalize the app 

---

> Be sure to add that lovely star 😀 and fork it for your own copy

---

# Objectives

- It's a beginner level app created to understand how MVC concept and logins are added

---

# Who is this for? 

- It's for beginners & intermediates with little more experience, to help understand the various aspects of building a node app with some complex features

---

# Packages/Dependencies used 

bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator

---

# Install all the dependencies or node packages used for development via Terminal

`npm install` 

---

# Things to add

- Create a `.env` file and add the following as `key: value` 
  - PORT: 2121 (can be any port example: 3000) 
  - DB_STRING: `your database URI` 
 ---
 
 Have fun testing and improving it! 😎


# Features to Implement

## Pomodoro
- [X] Timer, start/stop -2 people

## Extra functionality for todos
- [X] Inital priority
- [X] Notes to the todos
- [x] Arrows on todo

## Longer term goals
- [ ] finished pomos being tracked per task/per user - maybe a box where pomodoro icons appear for every pomo you complete. Then a click and drag to add a pomo to the task. Could be rewarding. 
- [ ] ability to edit tasks
- [ ] user stats!

Testing@gmail.com
TesterNoTesting


# Work Log
## Sept 2 
- Assigned CSS pages to people: Karan - Todos page, Jonathan - HomePage, Kat - Sign-up & Login page. 
- Completed CSS for Sign-Up & Login page. 
- Completed CSS for HomePage.
- Assigned features to people. If you want to jump on a feature, message that person on discord.

## Sept 3
- Todo list css continued.
- Pomodoro Creation started --> CSS completed. No JS functionality as of yet.
  
## Sept 5
- Finished functionality of pomodoro timer. 
- Added "add note" field to task input
  - need to update CSS to accommodate newly added space inside input fields & note appearance in task list after submit
    - CSS --> increased .box max-width from 400px to 500px to accommodate added "notes" input
    - CSS --> added 20px padding-left to notes when added to task list (.todoNotes in todos.css)
- Reordering Implemented - Neal
- Added favicon - Neal
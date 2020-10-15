const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');//setup the config
const Todo = require('./models/todolist');

//use express router
// app.use('/', require('./routes'));


app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/', function(req,res){
    Todo.find({}, function(err, todos){
        if(err)
        {
            console.log('Error in fetching task from db');
            return;
        }
         return res.render('home',{
            title: 'Todolist',
            todo_list: todos
        });
    })
   
});


app.post('/create-task', function(req, res){
    Todo.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date,
    }, function(err,newTask){
        if(err)
        {
            console.log('error in creating a task!');
            return;
        }
        console.log('******', newTask);
        return res.redirect('back');
    });
});

app.post('/delete-task', function(req, res){

    let id = req.body;
    console.log(id);
    let length = Object.keys(id).length;

    for(let i = 0; i < length; i++){
        let taskID = Object.keys(id)[i];
        Todo.findByIdAndDelete(taskID, function(err){
            if(err){
                console.log(err);
                return;
            }

            console.log('Sucessfully Deleted');
        })
    }

    return res.redirect('back');
});

app.listen(port, function(err){
    if(err)
    {
        console.log('error in running the server');
    }
    console.log('Yup!My Server is running on Port', port);
});

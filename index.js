const express = require('express');
const app = express();
const config = require('./config');
const Employee = require('./models/employee');

app.use(express.urlencoded({extended: false}));

config.authenticate().then(function(){
    console.log('Database connected');
}).catch(function(err){
    console.log(err);
});

//Get all employees
app.get('/',function(req,res){
    Employee.findAll().then(function(result){
        res.send(result);
    }).catch(function(err){
       res.status(400).send(err);
    });
});

//Get employee based on id
app.get('/id/:id',function(req,res){
    let id = req.params.id;

    Employee.findByPk(id).then(function(result){
        res.send(result);
    }).catch(function(err){
        res.status(400).send(err);
    });
})

//Filter
app.get('/filter',function(req,res){
    let data = {
        where: {},
    attributes: ['name','gender','department_id']
    }

    if(req.query.gender){data.where.gender = req.query.gender};
    if(req.query.department_id){data.where.department_id = req.query.department_id};

    Employee.findAll(data).then(function(result){
        res.send(result);
    }).catch(function(err){
        res.status(400).send(err);
    });
});

//Add new employee
app.post('/add_employee', function(req,res){
    let data = {
        name: req.body.name,
        gender: req.body.gender,
        salary: req.body.salary,
        department_id: req.body.department_id,
    };

    Employee.create(data).then(function(result){
        res.redirect('/');
    }).catch(function(err){
        res.status(400).send(err);
    })
});

//Update
app.patch('/update/:id',function(req,res){
    let id = req.params.id;

    Employee.findByPk(id).then(function(result){
        console.log(result);

        result.name = req.body.name,
        result.gender = req.body.gender,
        result.salary = parseFloat(req.body.salary),
        result.department_id = parseInt(req.body.department_id);

        result.save().then(function(){
            res.redirect('/');
        }).catch(function(err){
            res.status(400).send(err);
        })
    }).catch(function(err){
        res.status(400).send(err);
    })
})

//Delete employee
app.delete('/delete/:id', function(req,res){
    let id = req.params.id;

    Employee.findByPk(id).then(function(result){

        result.destroy().then(function(){
            res.redirect('/');
        }).catch(function(err){
            res.status(400).send(err);
        });
    }).catch(function(err){
        res.status(400).send(err);
    });
});



app.listen(4000, () => {
    console.log('Server running on port 4000');
});
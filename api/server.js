// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model')

const server = express();

server.use(express.json());

//[GET] /api/users

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json(err, { message: "The users information could not be retrieved" })
        })
})

//[GET] /api/users/:id

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params

    User.findById(id)
        .then(user => {
            if(!user){
                res.status(404).json({ message: 'The user with the specified ID does not exist'})
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ message:  "The user information could not be retrieved."}, err)
        })
})

//[POST] /api/users

server.post('/api/users', (req,res) => {
    const { name, bio } = req.body
    User.insert({ name, bio })
        .then(user => {
            if(name === '' || bio === ''){
                res.status(400).json({ message: 'Please provide nae and bio for user'} )
            } else{
            res.status(201).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error while saving the user to the database" }, err)
        })
})

// [PUT] /api/users/:id

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body
    User.update(id, { name, bio })
        .then(updated => {
            if(!updated){
                res.status(404).json({ message: 'The user with the specified ID does not exist.'})
            } else if(name === '' || bio === '') {
                res.status(400).json({ message: 'Please provide nae and bio for user'} )
            } 
            else {
                res.status(200).json(updated)
            }
        })
        .catch(err => {
            res.status(500).json(err, { message: "The user information could not be modified." })
        })
})

//[DELETE] /api/users/:id

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    
    User.remove(id)
        .then(deleted => {
            if(!deleted) {
                res.status(404).json({ message: 'The user with the specified ID does not exist' })
            } else {
                res.json(deleted)
            }
        })
        .catch(err => {
            res.status(500).json(err, { message: "The user could not be removed" })
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}

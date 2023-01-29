const express = require('express');
const router = express.Router();
const Student = require('../model/student');
const mongoose = require('mongoose');

// Get Request
router.get('/', (req, res, next) => {
    Student.find()
    .then(result=>{
        res.status(200).json({
            studentData: result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

// Get Request (get a perticular data by id)
router.get('/:id', (req, res, next) => {
    console.log(req.params.id);
    Student.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            studentData: result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

//Post Request
router.post('/',(req, res, next) => {
   const student = new Student({
    _id: new mongoose.Types.ObjectId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender
   })

   student.save()
   .then(result =>{
    console.log(result);
    res.status(200).json({
        newStudent: result
    })
   })
   .catch(err =>{
    console.log(err);
    res.status(500).json({
        error: err
    })
   })
})

router.delete('/:id', (req, res, next) =>{
    Student.deleteOne({_id:req.params.id})
    .then(result => {
        res.status(200).json({
            message:"product deleted",
            result: result
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router;
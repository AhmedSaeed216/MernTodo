const express = require("express");
const Todo = require("../models/todomodel.js");
const router = express.Router();

// post or create
router.post("/", async (req, res) => {
    const { Todoname, Description, Completed } = req.body

    try {
        const addTodo = await Todo.create({
            Todoname: Todoname,
            Description: Description,
            Completed: Completed
        })
        res.status(201).json(addTodo);
    } catch (error) {
        console.log("eror in creating a todo ", error);
        res.send(400).json({ error: error.message })
    }
})


// get all todo
router.get("/", async (req, res) => {
    try {
        const showAll = await Todo.find()
        res.status(200).json(showAll);
    } catch (error) {
        console.log("error while fetching the data");
        res.send(400).json({ error: error.message });
    }
})


// get single todo
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
            const singleTodo=await Todo.findById({_id:id});
            res.status(200).json(singleTodo);
    } catch (error) {
        console.log("error while fetchinga single todo data");
        res.send(400).json({ error: error.message });
    }
})


// delete todo
router.delete("/:id",async(req,res)=>{
    const {id}=req.params;

    try {
        const delTodo = await Todo.findByIdAndDelete({_id:id});
        res.status(200).json(delTodo);
    } catch (error) {
        console.log("error while deleting the data");
        res.send(400).json({ error: error.message });
    }
});


// update
router.patch("/:id",async(req,res)=>{
    const {id}=req.params;
    try {
        const updateTodo=await Todo.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(updateTodo);
    } catch (error) {
        console.log("error occur while updating");
        res.send(400).json({error:error.message});
    }
})
module.exports = router;
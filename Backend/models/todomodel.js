const mongoose = require("mongoose");

const todoschema = new mongoose.Schema(
    {
        Todoname: { type: String, require: true, },
        Description: { type: String, default: "" },
        Completed: { type: Boolean, default: false },
    },{timestamps:true}
);

const Todo=mongoose.model("Todo",todoschema);
module.exports = Todo;



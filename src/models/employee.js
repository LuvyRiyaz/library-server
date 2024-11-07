const mongoose = require ('mongoose')

const employeeSchema = new mongoose.Schema({
    employeeName:{type:String,required:true},
    employeeId:{type:Number,required:true},
    email:{type:String}
})
module.exports = mongoose.model('Employee',employeeSchema)
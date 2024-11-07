const Employee = require ('../models/employee.js')

const getEmployeeDetails = async(req,res) =>{
    try {
        const emp = await Employee.find();
            res.json(emp);
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
};

const addEmployeeDetails = async (req,res)=>{
    const add = new Employee({
        employeeName:req.body.employeeName,
        employeeId:req.body.employeeId,
        email:req.body.email
    });

    try {
        const addEmployee = await add.save();
        res.status(201).json(addEmployee);
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
}
module.exports={
    getEmployeeDetails,
    addEmployeeDetails,
}
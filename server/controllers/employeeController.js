const Employee = require("../models/Employee");


// GET ALL EMPLOYEES WITH SEARCH + PAGINATION
exports.getEmployees = async (req, res) => {

    try {

        const {
            search = "",
            page = 1,
            limit = 10
        } = req.query;


        const query = {

            $or: [

                {
                    name:{
                        $regex:search,
                        $options:"i"
                    }
                },

                {
                    email:{
                        $regex:search,
                        $options:"i"
                    }
                },

                {
                    employeeId:{
                        $regex:search,
                        $options:"i"
                    }
                },

                {
                    department:{
                        $regex:search,
                        $options:"i"
                    }
                }

            ]

        };



        const employees = await Employee.find(query)
        .sort({
            createdAt:-1
        })
        .skip((page-1)*limit)
        .limit(Number(limit));



        const total = await Employee.countDocuments(query);



        res.json({

            employees,

            total,

            page:Number(page),

            pages:Math.ceil(
                total / limit
            )

        });


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};





// GET SINGLE EMPLOYEE

exports.getEmployee = async(req,res)=>{

    try{

        const employee =
        await Employee.findById(
            req.params.id
        );


        if(!employee){

            return res.status(404).json({
                message:"Employee not found"
            });

        }


        res.json(employee);


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};






// CREATE EMPLOYEE

exports.createEmployee = async(req,res)=>{

    try{


        const {
            employeeId,
            email
        } = req.body;



        const existingEmployee =
        await Employee.findOne({

            $or:[

                {
                    employeeId
                },

                {
                    email
                }

            ]

        });



        if(existingEmployee){

            return res.status(400).json({

                message:
                "Employee ID or Email already exists"

            });

        }



        const employee =
        await Employee.create(
            req.body
        );



        res.status(201).json(employee);


    }
    catch(error){

        res.status(400).json({

            message:error.message

        });

    }

};








// UPDATE EMPLOYEE

exports.updateEmployee = async(req,res)=>{

    try{


        const employee =
        await Employee.findById(
            req.params.id
        );


        if(!employee){

            return res.status(404).json({

                message:"Employee not found"

            });

        }



        const updatedEmployee =
        await Employee.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true,
                runValidators:true
            }

        );



        res.json(updatedEmployee);


    }
    catch(error){

        res.status(400).json({

            message:error.message

        });

    }

};








// DELETE EMPLOYEE

exports.deleteEmployee = async(req,res)=>{

    try{


        const employee =
        await Employee.findById(
            req.params.id
        );


        if(!employee){

            return res.status(404).json({

                message:"Employee not found"

            });

        }



        await employee.deleteOne();



        res.json({

            message:
            "Employee deleted successfully"

        });


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};
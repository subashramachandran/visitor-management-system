const User = require("../models/User");


// GET ALL USERS
exports.getUsers = async(req,res)=>{

    try{

        const search = req.query.search || "";


        const users = await User.find({

            $or:[

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
                }

            ]

        })

        .select("-password")

        .populate("employeeId")

        .sort({
            createdAt:-1
        });



        res.json(users);


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};







// CREATE USER
exports.createUser = async(req,res)=>{


    try{


        const {
            name,
            email,
            password,
            role
        } = req.body;



        const existingUser =
        await User.findOne({
            email
        });



        if(existingUser){

            return res.status(400).json({

                message:"Email already exists"

            });

        }





        const user =
        await User.create({

            name,

            email,

            password,

            role

        });





        res.status(201).json({

            message:"User created successfully",

            user

        });



    }
    catch(error){

        res.status(400).json({

            message:error.message

        });

    }


};









// UPDATE USER
exports.updateUser = async(req,res)=>{


    try{


        const user =
        await User.findById(
            req.params.id
        );



        if(!user){

            return res.status(404).json({

                message:"User not found"

            });

        }




        user.name =
        req.body.name || user.name;


        user.email =
        req.body.email || user.email;


        user.role =
        req.body.role || user.role;




        if(req.body.password){

            user.password =
            req.body.password;

        }




        const updatedUser =
        await user.save();



        res.json({

            message:"User updated",

            user:updatedUser

        });



    }
    catch(error){

        res.status(400).json({

            message:error.message

        });

    }


};








// DELETE USER
exports.deleteUser = async(req,res)=>{


    try{


        await User.findByIdAndDelete(

            req.params.id

        );



        res.json({

            message:"User deleted"

        });



    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }


};
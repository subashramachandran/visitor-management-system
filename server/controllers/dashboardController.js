const Employee = require("../models/Employee");
const Visitor = require("../models/Visitor");



exports.getDashboard = async (req, res) => {

    try {


        const role = req.user.role;


        let data = {};



        const start = new Date();

        start.setHours(0,0,0,0);



        const end = new Date();

        end.setHours(23,59,59,999);





        // =========================
        // ADMIN DASHBOARD
        // =========================

        if(role === "Administrator"){


            data.totalEmployees =
                await Employee.countDocuments();



            data.totalVisitors =
                await Visitor.countDocuments();



            data.pendingRequests =
                await Visitor.countDocuments({
                    status:"PENDING"
                });



            data.todayVisitors =
                await Visitor.countDocuments({

                    visitDate:{
                        $gte:start,
                        $lte:end
                    }

                });



            data.visitorsInside =
                await Visitor.countDocuments({

                    status:"CHECKED_IN"

                });


        }







        // =========================
        // RECEPTIONIST DASHBOARD
        // =========================

        else if(role === "Receptionist"){


            data.todayVisitors =
                await Visitor.countDocuments({

                    visitDate:{
                        $gte:start,
                        $lte:end
                    }

                });



            data.pendingCheckIns =
                await Visitor.countDocuments({

                    status:"APPROVED"

                });



            data.checkedInVisitors =
                await Visitor.countDocuments({

                    status:"CHECKED_IN"

                });


        }








        // =========================
        // EMPLOYEE DASHBOARD
        // =========================

        else if(role === "Employee"){


            data.pendingApprovals =
                await Visitor.countDocuments({

                    status:"PENDING"

                });



            data.approvedToday =
                await Visitor.countDocuments({

                    status:"APPROVED",

                    updatedAt:{
                        $gte:start,
                        $lte:end
                    }

                });



            data.rejectedToday =
                await Visitor.countDocuments({

                    status:"REJECTED",

                    updatedAt:{
                        $gte:start,
                        $lte:end
                    }

                });


        }





        res.status(200).json(data);



    } catch(error){


        console.error(error);


        res.status(500).json({

            message:"Dashboard error",
            error:error.message

        });


    }

};
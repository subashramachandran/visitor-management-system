const Visitor = require('../models/Visitor');
const Employee = require('../models/Employee');



exports.getStats = async (req, res) => {


  try {


    const startOfDay = new Date();

    startOfDay.setHours(
      0,
      0,
      0,
      0
    );


    const endOfDay = new Date();

    endOfDay.setHours(
      23,
      59,
      59,
      999
    );





    const totalEmployees =
      await Employee.countDocuments();



    const totalVisitors =
      await Visitor.countDocuments();




    const pendingRequests =
      await Visitor.countDocuments({

        status: "PENDING"

      });





    const visitorsInside =
      await Visitor.countDocuments({

        status: "CHECKED_IN"

      });







    const todayVisitors =
      await Visitor.countDocuments({

        visitDate: {

          $gte: startOfDay,

          $lte: endOfDay

        }

      });








    const approvedToday =
      await Visitor.countDocuments({

        status:"APPROVED",

        updatedAt:{

          $gte:startOfDay,

          $lte:endOfDay

        }

      });








    const rejectedToday =
      await Visitor.countDocuments({

        status:"REJECTED",

        updatedAt:{

          $gte:startOfDay,

          $lte:endOfDay

        }

      });








    const pendingCheckIns =
      await Visitor.countDocuments({

        status:"APPROVED"

      });







    const checkedInVisitors =
      await Visitor.countDocuments({

        status:"CHECKED_IN"

      });







    res.json({


      // Admin

      totalEmployees,

      totalVisitors,

      pendingRequests,

      todayVisitors,

      visitorsInside,



      // Receptionist

      pendingCheckIns,

      checkedInVisitors,



      // Employee

      pendingApprovals:
      pendingRequests,

      approvedToday,

      rejectedToday


    });




  }

  catch(error){


    res.status(500).json({

      message:error.message

    });


  }


};
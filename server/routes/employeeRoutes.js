const express = require("express");

const router = express.Router();


const {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
}
=
require("../controllers/employeeController");


// GET ALL
router.get("/",getEmployees);


// GET ONE
router.get("/:id",getEmployee);


// CREATE
router.post("/",createEmployee);


// UPDATE
router.put("/:id",updateEmployee);


// DELETE
router.delete("/:id",deleteEmployee);


module.exports = router;
require('dotenv').config();

const mongoose = require('mongoose');

const User = require('./models/User');
const Employee = require('./models/Employee');


const seedDatabase = async () => {

  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");


    // Remove old data
    await User.deleteMany();
    await Employee.deleteMany();


    // Create Admin
    const admin = await User.create({
      name: "System Administrator",
      email: "admin@vpass.com",
      password: "password123",
      role: "Administrator"
    });


    // Create Receptionist
    const receptionist = await User.create({
      name: "Reception Desk",
      email: "reception@vpass.com",
      password: "password123",
      role: "Receptionist"
    });


    // Create Employee

    const employee = await Employee.create({
  employeeId: "EMP001",
  name: "John Developer",
  email: "john@company.com",
  mobile: "9876543210",
  department: "IT",
  designation: "Software Engineer",
  pendingRequests: 0
});


    // Create Employee Login Account

    await User.create({
      name: "John Developer",
      email: "john@company.com",
      password: "password123",
      role: "Employee",
      employeeId: employee._id
    });


    console.log("================================");
    console.log("Database Seed Completed");
    console.log("================================");

    console.log(`
Admin Login:
Email: admin@vpass.com
Password: password123


Receptionist Login:
Email: reception@vpass.com
Password: password123


Employee Login:
Email: john@company.com
Password: password123
    `);


    process.exit();


  } catch(error){

    console.log(error);
    process.exit(1);

  }

};


seedDatabase();
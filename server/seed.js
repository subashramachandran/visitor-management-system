const dns = require("dns");

// Fix MongoDB Atlas SRV DNS resolution
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const mongoose = require("mongoose");

const User = require("./models/User");
const Employee = require("./models/Employee");

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    // Remove old data
    await User.deleteMany();
    await Employee.deleteMany();

    // Create Admin
    await User.create({
      name: "System Administrator",
      email: "admin@vpass.com",
      password: "password123",
      role: "Administrator"
    });

    // Create Receptionist
    await User.create({
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

    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error("Database Seed Error:");
    console.error(error);

    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
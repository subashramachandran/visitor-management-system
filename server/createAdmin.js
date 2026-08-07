require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./models/User");


const createAdmin = async () => {

  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");


    const existingUser = await User.findOne({
      email: "rsubashramachandran@gmail.com"
    });


    if(existingUser){

      console.log("User already exists");
      process.exit();

    }


    const user = new User({

      name: "Subash",

      email: "rsubashramachandran@gmail.com",

      password: "123456",

      role: "Administrator"

    });


    await user.save();


    console.log("Admin user created successfully");

    console.log({
      email: "rsubashramachandran@gmail.com",
      password: "123456"
    });


    process.exit();


  }
  catch(error){

    console.log(error.message);

    process.exit(1);

  }

};


createAdmin();

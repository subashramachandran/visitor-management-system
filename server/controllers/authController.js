const User = require('../models/User');
const jwt = require('jsonwebtoken');


const generateToken = (id) => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d'
    }
  );

};



exports.login = async (req, res) => {

  const { email, password } = req.body;


  try {

    const user = await User.findOne({ email })
      .populate('employeeId');


    if (
      user &&
      await user.comparePassword(password)
    ) {


      return res.json({

        _id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,

        employeeData: user.employeeId,

        token: generateToken(user._id)

      });

    }


    res.status(401).json({

      message: 'Invalid email or password'

    });


  } catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};




exports.getProfile = async(req,res)=>{

  const user = await User.findById(req.user._id)
    .select('-password')
    .populate('employeeId');


  res.json(user);

};
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ['Administrator', 'Receptionist', 'Employee'],
      default: 'Employee'
    },

    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);


// Password encryption before saving
userSchema.pre('save', async function() {

  if (!this.isModified('password')) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);

});


// Compare password during login
userSchema.methods.comparePassword = async function(password) {

  return await bcrypt.compare(password, this.password);

};


module.exports = mongoose.model('User', userSchema);
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required.']
    },

    username: {
      type: String,
      unique: true,
      required: [true, 'Username is required.']
    },

    password: {
      type: String
    },

    role: {
      type: String,
      enum: ['INITIATE', 'CHAMAN', 'HIEROPHANT'],
      default: 'INITIATE'
    },

    interests: {
      type: String
    },

    dateOfBirth: {
      type: Date
    },

    avatar: {
      type: String
    },

    plantsOfInterest: [{
      type: Schema.Types.ObjectId,
      ref: 'Plant'
    }],

    purpose: {
      type: String
    }

  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

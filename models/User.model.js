const { Schema, model } = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')

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
      type: [String]
    },

    plantsOfInterest: [{
      type: Schema.Types.ObjectId,
      ref: 'Plant'
    }],

    purpose: {
      type: String
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }]

  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator, { message: '{PATH} already exists!' })

const User = model("User", userSchema)

module.exports = User

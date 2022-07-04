const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },

    username: {
      type: String,
      unique: true,
      required: true
    },

    password: {
      type: String
    },

    role: {
      type: String,
      enum: ['Iniciado', 'Chaman', 'Gran Hechicero'],
      default: 'Iniciado'
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

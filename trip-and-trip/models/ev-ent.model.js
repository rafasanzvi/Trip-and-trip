const { Schema, model } = require('mongoose')

const eventSchema = new Schema({

    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    date: {
        type: Date
    },

    location: {
        type: {
            type: String,
        },
        coordinates: [Number]
    },

    plants: [{
        type: Schema.Types.ObjectId,
        ref: 'Plant'
    }],

    description: {
        type: String
    },

    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    imageUrl: {
        type: String
    },

})



const Event = model("Event", eventSchema)
module.exports = Event 
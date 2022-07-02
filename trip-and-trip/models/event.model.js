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
    description: String,
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]

})



const Event = model("Event", eventSchema)
module.exports = Event 
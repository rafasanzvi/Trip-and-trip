const { Schema, model } = require('mongoose')

const eventSchema = new Schema({

    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    date: {
        type: Date,
        required: [true, 'You must fill the date']
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
        type: String,
        required: [true, 'You must fill the description of the event.']
    },

    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    imageURL: {
        type: [String]
    },

    location: {
        type: {
            type: String
        },
        coordinates: [Number]
    },

    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]

},

    {
        timestamps: true,
    }
)

eventSchema.index({ location: '2dsphere' })

const Event = model("Event", eventSchema)
module.exports = Event 
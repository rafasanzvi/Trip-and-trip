const { Schema, model } = require("mongoose")

const plantSchema = new Schema(
    {
        sName: {
            type: String,
            required: [true, 'You must fill the Scientific name of the plant.']
        },

        cName: {
            type: String,
            required: [true, 'You must fill the Common name of the plant.']
        },

        region: {
            type: [String],
            enum: ["Africa", "America", "Europe", "Asia", "Oceania"],
            required: [true, 'You must fill the autoctonous region of the plant.']
        },

        culture: {
            type: [String],
            required: [true, 'You must fill the cultures that used the plant.']
        },

        files: {
            type: [String]
        },

        imageURL: {
            type: [String]
        },

        properties: {
            type: [String],
            enum: ["Psychedelic", "Medicinal", "Toxic"],
            required: [true, 'You must fill the properties of the plant.']
        },

        description: {
            type: String,
            required: [true, 'You must fill the description of the plant.']
        },

    },
    {
        timestamps: true,
    }
)

const Plant = model("Plant", plantSchema)
module.exports = Plant 
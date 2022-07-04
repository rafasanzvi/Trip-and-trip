const { Schema, model } = require("mongoose");

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

        cultures: {
            type: [String]
        },

        //area:

        files: {
            type: [String]
        },

        properties: {
            type: [String],
            enum: ["Psychedelic", "Medicinal", "Toxic"],
            required: [true, 'You must fill the properties of the plant.']
        },

        description: {
            type: String
        },

    }
)

const Plant = model("Plant", plantSchema)
module.exports = Plant 